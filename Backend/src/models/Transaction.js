import mongoose from "mongoose";

const InvoiceItemSchema = new mongoose.Schema(
  {
    itemId: { type: String },
    name: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    total: { type: Number },
  },
  { _id: false }
);

const InvoiceCustomerSchema = new mongoose.Schema(
  {
    customerId: { type: String },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { _id: false }
);

const VirtualAccountSchema = new mongoose.Schema(
  {
    bank: { type: String },
    vaNumber: { type: String },
    paymentCode: { type: String },
    billerCode: { type: String },
    channel: { type: String },
    grossAmount: { type: Number },
    expiresAt: { type: Date },
  },
  { _id: false }
);

const BookedServiceSnapshotSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    name: { type: String },
    price: { type: Number },
    durationMinutes: { type: Number },
  },
  { _id: false }
);

const TransactionSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: [
        "cash",
        "bank-transfer",
        "e-wallet",
        "credit-card",
        "payment-link",
        "virtual-account",
        "midtrans",
      ],
      default: "midtrans",
    },
    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "paid",
        "expired",
        "overdue",
        "failed",
        "voided",
        "cancelled",
        "refunded",
      ],
      default: "pending",
    },
    reference: { type: String },
    paymentType: { type: String },
    orderId: { type: String },
    invoice: {
      id: { type: String },
      number: { type: String },
      title: { type: String },
      paidTitle: { type: String },
      publishedAt: { type: Date },
      dueDate: { type: Date },
      invoiceDate: { type: Date },
      pdfUrl: { type: String },
      paymentLinkUrl: { type: String },
    },
    customer: InvoiceCustomerSchema,
    items: { type: [InvoiceItemSchema], default: () => [] },
    virtualAccounts: { type: [VirtualAccountSchema], default: () => [] },
    bookedServices: { type: [BookedServiceSnapshotSchema], default: () => [] },
    grossAmount: { type: Number },
    metadata: { type: mongoose.Schema.Types.Mixed },
    midtransResponse: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
