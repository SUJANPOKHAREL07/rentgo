import { FaCar } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdKeyboardArrowRight, MdOutlineCalendarToday } from "react-icons/md";
import { TbUsers } from "react-icons/tb";

interface SidebarProps {
  isOpen: boolean;
  onSelectPage: (page: string) => void;
  onClose: () => void;
  activePage: string;
}

export const Sidebar = ({
  isOpen,
  onSelectPage,
  onClose,
  activePage,
}: SidebarProps) => {
  const handleSelect = (page: string) => {
    onSelectPage(page);

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const getClass = (page: string) =>
    `p-3 rounded-xl flex items-center gap-2 cursor-pointer transition duration-200 ${
      activePage === page
        ? "bg-emerald-50 border-l-[4px] border-emerald-600 text-emerald-700 font-semibold shadow-sm"
        : "text-gray-700 hover:bg-emerald-600 hover:text-white"
    }`;

  return (
    <div
      className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white shadow flex flex-col transform transition-transform duration-300 z-40 border-r border-slate-100
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex justify-start h-[4.8rem] items-center border-b border-gray-200 px-6">
        <div className="text-xl font-black font-heading tracking-wider">
          <span className="text-emerald-600">RENT</span>
          <span className="text-slate-900">GO</span>
          <p className="text-xs font-normal text-gray-500 tracking-normal font-sans">Admin Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 p-3">
        <ul className="space-y-2">
          <li
            onClick={() => handleSelect("Overview")}
            className={getClass("Overview")}
          >
            <LuLayoutDashboard /> Overview
            {activePage === "Overview" && (
              <MdKeyboardArrowRight className="text-xl ml-auto" />
            )}
          </li>
          <li
            onClick={() => handleSelect("Vehicles")}
            className={getClass("Vehicles")}
          >
            <FaCar /> Vehicles
            {activePage === "Vehicles" && (
              <MdKeyboardArrowRight className="text-xl ml-auto" />
            )}
          </li>
          <li
            onClick={() => handleSelect("Bookings")}
            className={getClass("Bookings")}
          >
            <MdOutlineCalendarToday />
            Bookings
            {activePage === "Bookings" && (
              <MdKeyboardArrowRight className="text-xl ml-auto" />
            )}
          </li>
          <li
            onClick={() => handleSelect("Users")}
            className={getClass("Users")}
          >
            <TbUsers /> Users
            {activePage === "Users" && (
              <MdKeyboardArrowRight className="text-xl ml-auto" />
            )}
          </li>
          <li
            onClick={() => handleSelect("Settings")}
            className={getClass("Settings")}
          >
            <FiSettings /> Settings
            {activePage === "Settings" && (
              <MdKeyboardArrowRight className="text-xl ml-auto" />
            )}
          </li>
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200 flex justify-center items-center gap-3">
        <div className="h-10 w-10 bg-emerald-600 flex text-white font-bold rounded-full justify-center items-center shadow-md shadow-emerald-600/20">
          AD
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Admin User</p>
          <p className="text-xs text-gray-500">admin@rentgo.com</p>
        </div>
      </div>
    </div>
  );
};
