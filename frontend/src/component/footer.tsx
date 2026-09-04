import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white bg-black/90 py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white font-heading tracking-wider">
            RENT<span className="text-emerald-500">GO</span>
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Your trusted partner for vehicle rentals. Safe, reliable, and
            affordable.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-semibold mb-2 text-emerald-400">Services</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link to="/vehicles" className="hover:text-emerald-400 transition-colors">
                Car Rental
              </Link>
            </li>
            <li>
              <Link to="/vehicles" className="hover:text-emerald-400 transition-colors">
                Bike Rental
              </Link>
            </li>
            <li>
              <Link to="/vehicles" className="hover:text-emerald-400 transition-colors">
                Truck Rental
              </Link>
            </li>
            <li>
              <Link to="/vehicles" className="hover:text-emerald-400 transition-colors">
                E-Vehicle
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold mb-2 text-emerald-400">Company</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link to="/about" className="hover:text-emerald-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-emerald-400 transition-colors">
                Support
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-emerald-400 transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-2 text-emerald-400">Contact</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>24/7 Support</li>
            <li>+977 9806800003</li>
            <li>
              <a href="mailto:info@rentgo.com" className="hover:text-emerald-400 transition-colors">
                info@rentgo.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-sm">
        © 2024 RentGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
