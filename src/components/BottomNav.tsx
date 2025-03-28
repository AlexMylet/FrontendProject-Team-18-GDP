
import { Link, useLocation } from "react-router-dom";
import { Calendar, User, TrendingUp, ChartLine, Settings } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: Calendar, label: "Today", path: "/" },
    { icon: User, label: "Coach", path: "/ask-anything" },
    { icon: TrendingUp, label: "Progress", path: "/scorecard" },
    { icon: ChartLine, label: "Forecast", path: "/forecast" },
    { icon: Settings, label: "Customize", path: "/notifications" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#F97316]/20 px-4 py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center space-y-1 ${
                isActive(item.path) ? "text-[#F97316]" : "text-white"
              } hover:text-[#F97316] transition-colors`}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
