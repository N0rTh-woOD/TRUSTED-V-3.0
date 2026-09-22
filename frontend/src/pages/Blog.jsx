import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Calendar, User, Clock, BookOpen, 
  Cpu, Shield, Code, Zap
} from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "Building Secure Boot for RISC-V with Rust",
    excerpt: "A comprehensive guide to implementing hardware root of trust and secure boot chains for RISC-V embedded systems using Rust's memory safety guarantees.",
    author: "Dr. Sarah Chen",
    date: "Dec 15, 2025",
    readTime: "12 min read",
    category: "Security",
    image: null,
  };

  const posts = [
    {
      title: "Getting Started with Embassy on RISC-V",
      excerpt: "Learn how to use the Embassy async framework for building responsive embedded applications on RISC-V microcontrollers.",
      author: "Michael Roberts",
      date: "Dec 12, 2025",
      readTime: "8 min read",
      category: "Tutorial",
      icon: Code,
    },
    {
      title: "Comparing RISC-V RTOS Options for Real-Time Workloads",
      excerpt: "An in-depth comparison of real-time operating system choices for RISC-V development.",
      author: "Lisa Wang",
      date: "Dec 10, 2025",
      readTime: "10 min read",
      category: "Comparison",
      icon: Cpu,
    },
    {
      title: "Hardware Security Modules and RISC-V",
      excerpt: "Exploring HSM integration patterns for secure key storage and cryptographic operations in embedded systems.",
      author: "James Miller",
      date: "Dec 8, 2025",
      readTime: "15 min read",
      category: "Security",
      icon: Shield,
    },
    {
      title: "Optimizing Rust Code for RISC-V Performance",
      excerpt: "Tips and techniques for writing high-performance Rust code targeting RISC-V microcontrollers.",
      author: "Anna Schmidt",
      date: "Dec 5, 2025",
      readTime: "11 min read",
      category: "Performance",
      icon: Zap,
    },
    {
      title: "Debugging RISC-V with probe-rs",
      excerpt: "A practical guide to using probe-rs for debugging Rust embedded applications on RISC-V hardware.",
      author: "David Park",
      date: "Dec 3, 2025",
      readTime: "9 min read",
      category: "Tutorial",
      icon: Code,
    },
    {
      title: "The State of RISC-V in 2025",
      excerpt: "A comprehensive overview of the RISC-V ecosystem, market trends, and what to expect in the coming year.",
      author: "TRUSTED-V Team",
      date: "Dec 1, 2025",
      readTime: "14 min read",
      category: "Industry",
      icon: Cpu,
    },
  ];

  const categories = [
    { name: "All", count: posts.length + 1 },
    { name: "Tutorial", count: 2 },
    { name: "Security", count: 2 },
    { name: "Performance", count: 1 },
    { name: "Industry", count: 1 },
    { name: "Comparison", count: 1 },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Tutorial": "bg-blue-100 text-blue-800 border-blue-200",
      "Security": "bg-red-100 text-red-800 border-red-200",
      "Performance": "bg-green-100 text-green-800 border-green-200",
      "Industry": "bg-purple-100 text-purple-800 border-purple-200",
      "Comparison": "bg-orange-100 text-orange-800 border-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Technical Blog</span>
            <h1 className="text-4xl font-bold text-foreground mt-2 mb-4">
              Insights & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground">
              Deep dives into RISC-V development, embedded security, and Rust programming 
              from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <Badge className={getCategoryColor(featuredPost.category)}>Featured</Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className={`${getCategoryColor(featuredPost.category)} w-fit mb-4`}>
                  {featuredPost.category}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Button className="w-fit">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-white transition-colors"
                    >
                      <span className="text-muted-foreground">{cat.name}</span>
                      <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Subscribe</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get the latest articles delivered to your inbox.
                  </p>
                  <Button size="sm" className="w-full">Subscribe</Button>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="lg:col-span-3">
              <h3 className="font-semibold text-foreground mb-6">Latest Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, index) => {
                  const Icon = post.icon;
                  return (
                    <Card key={index} className="bg-white hover:shadow-md transition-shadow group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                        </div>
                        
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
