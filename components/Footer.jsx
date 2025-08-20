export default function Footer() {
  return (
    <footer className="bg-[#29688A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo / About */}
        <div>
          <img src="/sme-logo.svg" />
          <p className="text-sm text-gray-200 my-4">
            Empowering SMEs for global success through growth, export promotion, 
            and technology-driven opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Services</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300 transition">Events</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Webinars</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Initiatives</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Partners</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-200 mb-4">Subscribe to our newsletter</p>
          <form className="flex items-center">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full px-3 py-2 rounded-l-lg text-black focus:outline-none bg-white border-r-2"
            />
            <button 
              type="submit" 
              className="bg-white text-[#29688A] px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <p>© {new Date().getFullYear()} Your Brand. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
