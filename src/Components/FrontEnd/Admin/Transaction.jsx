import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const initialStats = {
  total: 0,
  pending: 0,
  paid: 0,
  failed: 0,
  cancelled: 0,
  expired: 0,
  overdue: 0,
  refunded: 0,
  voided: 0,
  draft: 0,
};

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "expired", label: "Expired" },
  { value: "overdue", label: "Overdue" },
  { value: "refunded", label: "Refunded" },
  { value: "voided", label: "Voided" },
  { value: "draft", label: "Draft" },
];

const timeWindowOptions = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

const statusBadgeStyles = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-200 text-gray-600",
  expired: "bg-orange-100 text-orange-700",
  overdue: "bg-orange-200 text-orange-800",
  refunded: "bg-purple-100 text-purple-700",
  voided: "bg-gray-200 text-gray-600",
  draft: "bg-blue-100 text-blue-700",
};

const statusLabels = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  cancelled: "Cancelled",
  expired: "Expired",
  overdue: "Overdue",
  refunded: "Refunded",
  voided: "Voided",
  draft: "Draft",
};

const formatCurrency = (value) => {
  if (value == null) return "—";
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return "—";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numeric);
};

const formatDateTime = (value, options = {}) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(date);
};

const formatDate = (value) =>
  formatDateTime(value, { hour: undefined, minute: undefined });

const buildDateRange = (windowValue) => {
  if (windowValue === "all") return {};

  const now = new Date();
  const end = new Date(now);
  let start;

  switch (windowValue) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week": {
      const day = now.getDay();
      const diff = now.getDate() - day;
      start = new Date(now.getFullYear(), now.getMonth(), diff);
      break;
    }
    case "month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "year":
      start = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      return {};
  }

  return {
    dateFrom: start.toISOString(),
    dateTo: end.toISOString(),
  };
};

const getServicesSummary = (transaction) => {
  if (
    Array.isArray(transaction?.bookedServices) &&
    transaction.bookedServices.length > 0
  ) {
    const names = transaction.bookedServices
      .map((service) => service.name)
      .filter(Boolean);
    return names.length ? names.join(", ") : "Booking Services";
  }

  if (Array.isArray(transaction?.items) && transaction.items.length > 0) {
    const names = transaction.items
      .map((item) => item.name || item.description)
      .filter(Boolean);
    return names.length ? names.join(", ") : "Invoice Items";
  }

  return "—";
};

const getCustomerSummary = (transaction) => {
  if (transaction.customer) {
    const { name, email, phone } = transaction.customer;
    return {
      name: name || "Unknown Customer",
      contact: email || phone || "—",
    };
  }

  if (transaction.user) {
    const { fullName, email, phone } = transaction.user;
    return {
      name: fullName || "Unknown User",
      contact: email || phone || "—",
    };
  }

  return {
    name: "Unknown Customer",
    contact: "—",
  };
};

const Transaction = () => {
  const { token } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeWindow, setTimeWindow] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchTransactions = useCallback(async () => {
    if (!token) {
      setError("Authentication required");
      setTransactions([]);
      setStats(initialStats);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const range = buildDateRange(timeWindow);
      if (range.dateFrom) params.append("dateFrom", range.dateFrom);
      if (range.dateTo) params.append("dateTo", range.dateTo);

      const url = `${API_BASE_URL}/api/transactions${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch transactions");
      }

      setTransactions(
        Array.isArray(result?.transactions) ? result.transactions : []
      );
      setStats({ ...initialStats, ...(result?.stats || {}) });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to fetch transactions");
      setTransactions([]);
      setStats(initialStats);
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, timeWindow]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) return transactions;

    return transactions.filter((transaction) => {
      const invoiceNumber = transaction.invoice?.number || "";
      const orderId = transaction.orderId || "";
      const reference = transaction.reference || "";
      const customerName =
        transaction.customer?.name || transaction.user?.fullName || "";
      const customerEmail =
        transaction.customer?.email || transaction.user?.email || "";

      return [invoiceNumber, orderId, reference, customerName, customerEmail]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalized));
    });
  }, [transactions, searchTerm]);

  const paidRevenue = useMemo(
    () =>
      filteredTransactions
        .filter((transaction) => transaction.status === "paid")
        .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0),
    [filteredTransactions]
  );

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

  const handlePrintInvoice = () => {
    if (selectedTransaction?.invoice?.pdfUrl) {
      window.open(
        selectedTransaction.invoice.pdfUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const identifierFor = (transaction) =>
    transaction.invoice?.number || transaction.orderId || transaction.id;

  const amountFor = (transaction) =>
    transaction.amount ?? transaction.grossAmount ?? 0;

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(paidRevenue),
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      iconPath:
        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Total Transactions",
      value: stats.total,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      iconPath:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      title: "Pending",
      value: stats.pending,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Failed / Cancelled",
      value: (stats.failed || 0) + (stats.cancelled || 0),
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      iconPath: "M6 18L18 6M6 6l12 12",
    },
  ];

  const renderStatusBadge = (status) => {
    const normalized = status?.toLowerCase?.() || "pending";
    const classes =
      statusBadgeStyles[normalized] || "bg-gray-200 text-gray-600";

    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}
      >
        {statusLabels[normalized] || status || "Pending"}
      </span>
    );
  };

  return (
    <AdminLayout title="Transaction Management">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {error && (
            <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <div
                key={card.title}
                className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 ${card.iconBg} rounded-md p-3`}
                    >
                      <svg
                        className={`h-6 w-6 ${card.iconColor}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={card.iconPath}
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.title}
                        </dt>
                        <dd className="text-2xl font-bold text-gray-900">
                          {card.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by invoice number, customer name, or email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={timeWindow}
                onChange={(event) => setTimeWindow(event.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              >
                {timeWindowOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={fetchTransactions}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <p className="text-sm text-gray-500">
                Showing {filteredTransactions.length} of {stats.total}{" "}
                transactions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Services / Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-6 text-center text-sm text-gray-500"
                      >
                        Loading transactions...
                      </td>
                    </tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-6 text-center text-sm text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => {
                      const identifier = identifierFor(transaction);
                      const customer = getCustomerSummary(transaction);

                      return (
                        <tr
                          key={transaction.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {identifier}
                            </div>
                            <div className="text-sm text-gray-500">
                              Invoice #{transaction.invoice?.number || "—"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {customer.contact}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {getServicesSummary(transaction)}
                            </div>
                            {transaction.booking?.id && (
                              <div className="text-xs text-gray-500">
                                Booking #{transaction.booking.id}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {formatCurrency(amountFor(transaction))}
                            </div>
                            <div className="text-xs text-gray-500">
                              Gross: {formatCurrency(transaction.grossAmount)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              <svg
                                className="h-5 w-5 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                ></path>
                              </svg>
                              <span>
                                {transaction.paymentType ||
                                  transaction.method ||
                                  "—"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusBadge(transaction.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>{formatDateTime(transaction.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => handleViewDetail(transaction)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                            >
                              <svg
                                className="h-5 w-5 inline"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-gradient-to-r from-red-400 to-red-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white bg-opacity-20 rounded-lg p-2">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Transaction Details
                      </h3>
                      <p className="text-red-100 text-sm">
                        #{identifierFor(selectedTransaction)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-white hover:text-gray-200 transition-colors duration-150"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      Customer Information
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-medium text-gray-900">
                          {getCustomerSummary(selectedTransaction).name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="text-sm font-medium text-gray-900">
                          {getCustomerSummary(selectedTransaction).contact}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Status Information
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">
                          Transaction Status
                        </p>
                        {renderStatusBadge(selectedTransaction.status)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created At</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDateTime(selectedTransaction.createdAt)}
                        </p>
                      </div>
                      {selectedTransaction.invoice?.dueDate && (
                        <div>
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(selectedTransaction.invoice.dueDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                      Service Details
                    </h4>
                    <div className="space-y-2">
                      {Array.isArray(selectedTransaction.bookedServices) &&
                      selectedTransaction.bookedServices.length > 0 ? (
                        selectedTransaction.bookedServices.map(
                          (service, index) => (
                            <div
                              key={`${
                                service.serviceId || service.name
                              }-${index}`}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                {service.name || "Service"}
                              </span>
                              <span className="font-medium text-gray-900">
                                {formatCurrency(service.price)}
                              </span>
                            </div>
                          )
                        )
                      ) : Array.isArray(selectedTransaction.items) &&
                        selectedTransaction.items.length > 0 ? (
                        selectedTransaction.items.map((item, index) => (
                          <div
                            key={`${item.itemId || item.name}-${index}`}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">
                              {item.name || item.description || "Item"}
                              {item.quantity ? ` × ${item.quantity}` : ""}
                            </span>
                            <span className="font-medium text-gray-900">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No service or item details available.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                      Payment Information
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Payment Method</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedTransaction.paymentType ||
                            selectedTransaction.method ||
                            "—"}
                        </p>
                      </div>
                      {selectedTransaction.invoice?.paymentLinkUrl && (
                        <div>
                          <p className="text-xs text-gray-500">Payment Link</p>
                          <a
                            href={selectedTransaction.invoice.paymentLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-red-500 hover:text-red-600"
                          >
                            Open Midtrans Link
                          </a>
                        </div>
                      )}
                      {Array.isArray(selectedTransaction.virtualAccounts) &&
                        selectedTransaction.virtualAccounts.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500">
                              Virtual Accounts
                            </p>
                            <ul className="mt-1 space-y-1">
                              {selectedTransaction.virtualAccounts.map(
                                (va, index) => (
                                  <li
                                    key={`${va.bank}-${
                                      va.vaNumber || va.paymentCode
                                    }-${index}`}
                                    className="text-sm text-gray-900"
                                  >
                                    <span className="font-semibold">
                                      {va.bank?.toUpperCase?.() || "VA"}:
                                    </span>{" "}
                                    {va.vaNumber || va.paymentCode || "—"}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Invoice Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Invoice Number</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedTransaction.invoice?.number || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Invoice Title</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedTransaction.invoice?.title || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Invoice Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(selectedTransaction.invoice?.invoiceDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Published Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(selectedTransaction.invoice?.publishedAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedTransaction.orderId || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reference</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedTransaction.reference || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Price Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Amount</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(amountFor(selectedTransaction))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Amount</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(selectedTransaction.grossAmount)}
                      </span>
                    </div>
                    {selectedTransaction.fees?.map((fee, index) => (
                      <div
                        key={`${fee.name || "Fee"}-${index}`}
                        className="flex justify-between"
                      >
                        <span className="text-gray-600">
                          {fee.name || "Fee"}
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(fee.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  disabled={!selectedTransaction.invoice?.pdfUrl}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    ></path>
                  </svg>
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Transaction;
