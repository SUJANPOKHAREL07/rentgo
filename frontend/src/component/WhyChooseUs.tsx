import { FaRegClock } from "react-icons/fa";

import { LuAward, LuShieldCheck } from "react-icons/lu";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <LuShieldCheck size={40} />,
      title: "Premium Protection",
      description:
        "Drive confidently with our full insurance coverage and advanced safety standards.",
    },
    {
      icon: <FaRegClock size={40} />,
      title: "24/7 Concierge",
      description:
        "Our dedicated team is always available to assist you anytime, anywhere.",
    },
    {
      icon: <LuAward size={40} />,
      title: "Exclusive Fleet",
      description:
        "Choose from a curated selection of luxury and premium vehicles.",
    },
  ];

  return (
    <div className="bg-light-gray h-fit flex justify-between items-center">
      <div className="max-w-7xl w-full flex flex-col h-fit px-5 py-20 justify-around items-center  my-auto mx-auto">
        <h1 className="text-4xl md:text-5xl mb-16 font-black text-center tracking-tight">
          WHY CHOOSE <br />
          <span className="text-emerald-600">RENTGO</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {benefits.map((benefits, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-col gap-y-4 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 rounded-full inline-flex justify-center text-white items-center bg-emerald-600 shadow-lg shadow-emerald-600/30">{benefits.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{benefits.title}</p>
              <p className="text-gray-600">{benefits.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
