import { FiCheckCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Lovable Gradient Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/image/hero_bg.png')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/70 opacity-90"></div>

      {/* Shapes */}
      <div className="absolute inset-0">
        {/* Top left floating square */}
        <div className="absolute top-5 left-5 w-16 h-16 border-2 border-emerald-500/40 animate-float"></div>

        {/* Right middle floating square */}
        <div className="absolute top-1/3 right-10 w-12 h-12 border-2 border-emerald-400/40 animate-float animate-delay-2s"></div>

        {/* Bottom right water drop circle */}
        <div className="absolute bottom-50 right-20 w-16 h-16 border-2 border-emerald-500/50 rounded-full animate-waterDrop"></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col justify-around items-center h-screen my-auto mx-auto p-5">
        <div className="flex justify-between w-full items-center">
          <div className="space-y-6">
            <p className="flex items-center gap-x-2 text-sm bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md px-4 py-1.5 rounded-full w-fit text-emerald-300 font-medium">
              <FiCheckCircle size={18} className="text-emerald-400" />
              Trusted by 10,000+ happy renters
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-7xl text-white font-black leading-tight tracking-tight">
              Find Your Perfect <br />
              <span className="text-emerald-400">Rental Vehicle</span>
            </h1>

            <p className="text-base text-gray-200 sm:text-xl max-w-xl">
              Choose from our wide selection of cars, bikes, SUVs, and more.
              Safe, reliable, and affordable rentals for every journey.
            </p>

            <div className="flex items-center gap-5">
              <NavLink
                to={"/vehicles"}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40"
              >
                Browse Vehicles
              </NavLink>
              <button
                onClick={() => (window.location.href = "/about")}
                className="border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 px-7 py-3.5 rounded-xl transition font-bold"
              >
                Learn More
              </button>
            </div>

            <div className="flex gap-5 flex-wrap mt-4 text-sm text-white sm:text-base">
              <p className="flex items-center gap-2">
                <FiCheckCircle />
                Free Cancellation
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle />
                24/7 Support
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle />
                Insurance Included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
