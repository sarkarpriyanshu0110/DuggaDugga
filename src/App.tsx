import { useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import SplashScreen from "./screens/SplashScreen";
import ZoneSelector from "./screens/ZoneSelector";
import Dashboard from "./screens/Dashboard";
import MetroScreen from "./screens/MetroScreen";
import TrainScreen from "./screens/TrainScreen";
import FoodScreen from "./screens/FoodScreen";
import AccountScreen from "./screens/AccountScreen";

type Screen = "splash" | "zone" | "dashboard" | "metro" | "train" | "food" | "account";

const tabs = [
  { id: "dashboard", icon: "🗺", label: "Route" },
  { id: "metro", icon: "🚇", label: "Metro" },
  { id: "train", icon: "🚂", label: "Train" },
  { id: "food", icon: "🍛", label: "Food" },
  { id: "account", icon: "👤", label: "Profile" },
] as const;

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);

  const navigate = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const showTabs = !["splash", "zone"].includes(screen);

  return (
    <PhoneFrame>
      {/* Screen layer */}
      <div className="absolute inset-0 overflow-hidden" style={{ paddingBottom: showTabs ? 72 : 0 }}>
        {screen === "splash" && <SplashScreen onNext={() => navigate("zone")} />}
        {screen === "zone" && <ZoneSelector onNext={() => navigate("dashboard")} />}
        {screen === "dashboard" && <Dashboard onNavigate={(s) => navigate(s as Screen)} />}
        {screen === "metro" && <MetroScreen />}
        {screen === "train" && <TrainScreen />}
        {screen === "food" && <FoodScreen />}
        {screen === "account" && <AccountScreen />}
      </div>

      {/* Tab bar */}
      {showTabs && (
        <div
          className="absolute bottom-0 left-0 right-0 tab-bar-shadow"
          style={{ height: 72, background: "#fff", borderTop: "1px solid #E0D5C5" }}
        >
          {/* Alpana accent line */}
          <div className="alpana-divider absolute top-0 left-0 right-0 opacity-40" style={{ height: 12, transform: "translateY(-50%)" }} />

          <div className="flex h-full">
            {tabs.map(tab => {
              const isActive = screen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.id as Screen)}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all relative"
                >
                  {isActive && (
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                      style={{ background: "#7B1C1C" }}
                    />
                  )}
                  <span
                    className="text-xl transition-all"
                    style={{ transform: isActive ? "scale(1.15)" : "scale(1)", filter: isActive ? "none" : "grayscale(0.3)" }}
                  >
                    {tab.icon}
                  </span>
                  <span
                    className="text-xs font-semibold transition-all"
                    style={{ color: isActive ? "#7B1C1C" : "#9A8A7A", fontFamily: "Poppins", fontSize: 10 }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
