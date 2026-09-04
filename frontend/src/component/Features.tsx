


import { NavLink } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import { useVehicles } from "../hooks/useVehicles";

const Features = () => {
  const { vehicles, loading, error } = useVehicles();

  if (loading) return <p className="text-center">Loading vehicles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Take first 3 AVAILABLE vehicles
  const featuredCard = vehicles
    .filter((v) => (v.status || "").toUpperCase() === "AVAILABLE")
    .slice(0, 3);

  return (
    <div className="max-w-7xl w-full flex flex-col h-fit px-5 py-20 justify-around mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl text-center mb-5 font-black">
          FEATURED <br />
          <span className="text-emerald-600">COLLECTION</span>
        </h1>
        <p className="text-lg mb-16 text-gray-600 text-center max-w-2xl mx-auto">
          Handcrafted selection of our top-performing rental vehicles. Each
          one delivers performance, reliability, and ultimate driving comfort.
        </p>

        {/* feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCard.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </div>

      <NavLink
        to={"/vehicles"}
        className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold text-lg w-fit mx-auto mt-12 py-3 px-8 rounded-xl transition duration-300 shadow-sm"
      >
        Discover All Vehicles
      </NavLink>
    </div>
  );
};

export default Features;
