const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Hair Care Tips for Beautiful Hair",
      excerpt:
        "Discover the essential tips and tricks to maintain healthy, shiny, and beautiful hair all year round.",
      image: "/placeholder-blog-1.jpg",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      category: "Hair Care",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Latest Hair Color Trends 2025",
      excerpt:
        "Explore the hottest hair color trends that are taking the beauty world by storm this season.",
      image: "/placeholder-blog-2.jpg",
      author: "Emily Chen",
      date: "March 10, 2025",
      category: "Trends",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Benefits of Regular Hair Spa Treatment",
      excerpt:
        "Learn why regular hair spa treatments are essential for maintaining healthy and vibrant hair.",
      image: "/placeholder-blog-3.jpg",
      author: "Maria Rodriguez",
      date: "March 5, 2025",
      category: "Treatment",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "How to Choose the Right Haircut for Your Face Shape",
      excerpt:
        "A comprehensive guide to finding the perfect haircut that complements your unique face shape.",
      image: "/placeholder-blog-4.jpg",
      author: "Jessica Lee",
      date: "February 28, 2025",
      category: "Style Guide",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "Natural Ingredients for Healthy Hair",
      excerpt:
        "Discover the power of natural ingredients and how they can transform your hair care routine.",
      image: "/placeholder-blog-5.jpg",
      author: "Amanda White",
      date: "February 20, 2025",
      category: "Natural Care",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Bridal Hair Styling Ideas",
      excerpt:
        "Get inspired by these stunning bridal hair styles perfect for your special day.",
      image: "/placeholder-blog-6.jpg",
      author: "Sophie Turner",
      date: "February 15, 2025",
      category: "Bridal",
      readTime: "10 min read",
    },
  ];

  const categories = [
    "All",
    "Hair Care",
    "Trends",
    "Treatment",
    "Style Guide",
    "Natural Care",
    "Bridal",
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-400 to-pink-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Beauty Blog</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Expert tips, trends, and inspiration for all your beauty needs
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  index === 0
                    ? "bg-red-400 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Blog Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    <span className="mr-4">{post.date}</span>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-red-400 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-semibold text-sm">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {post.author}
                      </span>
                    </div>
                    <button className="text-red-400 hover:text-red-500 font-medium text-sm flex items-center">
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gradient-to-r from-red-400 to-pink-400 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest beauty tips, trends, and exclusive offers delivered
            to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full outline-none ring-2 ring-white focus:ring-4 transition-all duration-300"
            />
            <button className="bg-white text-red-400 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
