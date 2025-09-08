
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Event Planning in 2024",
    excerpt:
      "Discover the latest trends and best practices for organizing unforgettable events that your attendees will love.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Event Planning",
    image: "/event-planning-conference.jpg",
  },
  {
    id: 2,
    title: "How Digital Tickets Are Revolutionizing Event Access",
    excerpt:
      "Learn about the benefits of digital ticketing and how it's making events more accessible and secure for everyone.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "3 min read",
    category: "Technology",
    image: "/digital-tickets-smartphone.jpg",
  },
  {
    id: 3,
    title: "Top 10 Music Festivals to Attend This Summer",
    excerpt:
      "From indie rock to electronic dance music, here are the must-attend festivals that will make your summer unforgettable.",
    author: "Emma Rodriguez",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Music",
    image: "/music-festival-crowd-stage.jpg",
  },
  {
    id: 4,
    title: "Maximizing Your Event ROI: A Data-Driven Approach",
    excerpt:
      "Use analytics and smart strategies to ensure your events deliver maximum value and engagement for your investment.",
    author: "David Park",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Business",
    image: "/business-analytics-charts.jpg",
  },
  {
    id: 5,
    title: "Sustainable Events: Going Green Without Compromising Quality",
    excerpt:
      "Explore eco-friendly practices that can make your events more sustainable while maintaining an exceptional experience.",
    author: "Lisa Thompson",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Sustainability",
    image: "/green-sustainable-event.jpg",
  },
  {
    id: 6,
    title: "The Psychology of Event Marketing: What Really Works",
    excerpt:
      "Understand the psychological principles behind successful event marketing and how to apply them to boost attendance.",
    author: "Alex Kumar",
    date: "2024-01-03",
    readTime: "8 min read",
    category: "Marketing",
    image: "/marketing-psychology-event-promotion.jpg",
  },
]

const categories = ["All", "Event Planning", "Technology", "Music", "Business", "Sustainability", "Marketing"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">

        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-700 to-cyan-300 bg-clip-text text-transparent tracking-wide font-extrabold">
              TicketX Blog
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from the world of events and ticketing.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="overflow-hidden border-2 border-gradient-to-r from-cyan-700 to-slate-900">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4 bg-cyan-700 text-white border-0">Featured</Badge>
                <CardTitle className="text-2xl md:text-3xl mb-4 text-balance">{blogPosts[0].title}</CardTitle>
                <p className="text-muted-foreground mb-6 text-pretty">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button className="rounded-full">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-cyan-700 text-white border-0">{post.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-balance hover:text-cyan-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-cyan-700 to-slate-900 rounded-3xl p-8 md:p-12 text-center text-white mb-16 ">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest event insights and ticketing tips delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-black outline-none ring-2 ring-cyan-300"
            />
            <Button className="bg-white text-cyan-700 hover:bg-gray-100 rounded-full px-8">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
