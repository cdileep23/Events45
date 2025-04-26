import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CalendarCheck, Users, MapPin } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            Discover the easiest way to manage events
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 leading-tight">
            Host, Connect, <span className="text-blue-600">Celebrate</span>
            <br />
            <span className="relative">
              All in one place
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M300 3C118 -7.00001 84.6667 4.66666 0 3V0H300V3Z" fill="#FDBA74" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mt-6">
            Create and manage memorable events with ease. Connect with attendees, track bookings, and make every event a success.
          </p>
          
          
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium" asChild>
              <Link href="/events">
                Explore Events
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium" asChild>
              <Link href="/events/create">
                Host an Event
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
