import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 flex items-center justify-center bg-blue-600 rounded-lg shadow-md">
                <span className="text-white font-bold">H</span>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 h-3 w-3 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-xl font-bold text-blue-600 font-mono tracking-wider">Host.in</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your all-in-one platform for hosting and managing events. Create, book, and organize with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-600 hover:text-blue-600 text-sm">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/events/create" className="text-gray-600 hover:text-blue-600 text-sm">
                  Create Event
                </Link>
              </li>
             
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">
                  About Us
                </Link>
              </li>
             
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">
                 Ram Nagar, Ananthapur<br />
                  Andhra Pradesh India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+91 8639288481</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">support@hostin.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Host.in. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-500 hover:text-blue-600 text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-blue-600 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer