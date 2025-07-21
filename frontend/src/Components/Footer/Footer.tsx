import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          {/* Copyright */}
          <div className="text-gray-300 text-sm md:text-base order-2 md:order-1">
            © 2025 Talview Inc | All Rights Reserved
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            <a
              href="https://www.facebook.com/talview/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-gray-700"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/talview/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-gray-700"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/talview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-gray-700"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/channel/UChTIe4WIJR6IFDyY6NqGA0g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-gray-700"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
