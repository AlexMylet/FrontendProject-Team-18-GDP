import { BellDot, Signal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TopBanner = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simulate battery level (in a real app, you'd use the Battery API)
    setBatteryLevel(Math.floor(Math.random() * 30) + 70);

    return () => clearInterval(interval);
  }, []);

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Your business performance';
      case '/ask-anything':
        return 'Scenario Analysis';
      case '/scorecard':
        return 'Track Progress';
      case '/forecast':
        return 'Forecast';
      case '/notifications':
        return 'Customize Trajex';
      default:
        return 'Your business performance';
    }
  };

  const handleProfileClick = () => {
    navigate('/auth');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white p-2 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Signal className="w-4 h-4" />
            <span className="text-xs">5G</span>
          </div>
          <span className="text-sm font-medium">{currentTime}</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-3 border border-white rounded-sm relative">
              <div 
                className="absolute top-0 left-0 bottom-0 bg-white"
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
            <span className="text-xs">{batteryLevel}%</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <User 
            className="w-6 h-6 text-[#F97316] cursor-pointer hover:text-[#F97316]/80 transition-colors" 
            onClick={handleProfileClick}
          />
          <h1 className="text-[#F97316] text-lg font-medium">{getTitle()}</h1>
          <BellDot className="w-6 h-6 text-[#F97316]" />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;

