import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutUs = () => {
  const stats = [
    { number: "50K+", label: "Events Hosted" },
    { number: "1M+", label: "Tickets Sold" },
    { number: "500+", label: "Cities Covered" },
    { number: "99.9%", label: "Uptime" },
  ];

  const features = [
    {
      title: "Instant Booking",
      description:
        "Book tickets in seconds with our streamlined checkout process",
    },
    {
      title: "Smart Discovery",
      description:
        "AI-powered recommendations based on your interests and location",
    },
    {
      title: "Secure Payments",
      description: "Bank-grade security with multiple payment options",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs",
    },
  ];

  return (
    <div className="min-h-screen w-full py-20 px-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-cyan-700/30 text-cyan-200 border-cyan-600/40 font-medium"
          >
            About TicketX
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
              Revolutionizing
            </span>
            <br />
            <span className="text-white">Event Discovery</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            TicketX is the premier platform connecting event enthusiasts with
            unforgettable experiences. From intimate workshops to massive
            festivals, we make discovering and booking events effortless.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/70 border-slate-700 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-200 mb-6 leading-relaxed">
              We believe that life&apos;s most meaningful moments happen when people
              come together. TicketX exists to bridge the gap between event
              organizers and attendees, creating a seamless ecosystem where
              amazing experiences are just a click away.
            </p>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Whether you&apos;re looking for professional networking events,
              cultural festivals, educational workshops, or entertainment shows,
              we curate the best experiences tailored to your interests and
              location.
            </p>
            <Button className="bg-gradient-to-r from-cyan-700 to-cyan-500 hover:from-cyan-800 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Join Our Community
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
            <Card className="relative bg-slate-800/70 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-slate-200">
                    Average booking time under 30 seconds
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Why Choose TicketX?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/70 border-slate-700 backdrop-blur-sm hover:bg-slate-800/90 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-cyan-700/50 to-cyan-500/50 border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Discover Amazing Events?
              </h2>
              <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
                Join thousands of event enthusiasts who trust TicketX for their
                entertainment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={'/event'}>
                <Button className="bg-gradient-to-r from-cyan-700 to-cyan-500 hover:from-cyan-800 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Explore Events
                </Button>
                </Link>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
