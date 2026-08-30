import { useState } from "react";
import { metroStations, pandals } from "../data/appData";

export default function MetroScreen() {
  const [selectedStation, setSelectedStation] = useState<string | null>("kalighat");
  const [showExits, setShowExits] = useState(false);

  const station = metroStations.find(s => s.id === selectedStation);
  const nearbyPandals = station ? pandals.filter(p => station.pandals.includes(p.id)) : [];

  const crowdColors = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };
  const crowdBg = { low: "#F0FFF4", medium: "#FFFBEB", high: "#FFF1F1" };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8" }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#003594" }}>
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: "#7A6A5A" }}>Kolkata Metro</p>
            <h1 className="font-display text-xl font-bold" style={{ color: "#3A0A0A" }}>Metro Pujo Guide</h1>
          </div>
        </div>
      </div>

      {/* Map with metro lines */}
      <div className="mx-5 rounded-2xl overflow-hidden relative" style={{ height: 260, background: "#1e3a2a" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect width="100" height="100" fill="#1e4a30"/>
          {[15,30,45,60,75,90].map(y => <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="#2a5a3a" strokeWidth="0.8"/>)}
          {[15,28,42,55,68,80,92].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="#2a5a3a" strokeWidth="0.8"/>)}

          {/* Blue line (N-S) */}
          <path
            d="M 62 15 L 42 32 L 40 42 L 42 52 L 50 70 L 42 82"
            stroke="#003594" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
          />
          {/* Green line (E-W) */}
          <path
            d="M 20 52 L 42 52 L 55 52 L 70 50"
            stroke="#00913A" strokeWidth="3" fill="none" strokeLinecap="round"
          />
          {/* Interchange dot */}
          <circle cx="42" cy="52" r="3" fill="white" stroke="#888" strokeWidth="1"/>

          {/* Station dots */}
          {metroStations.map(s => {
            const isSelected = s.id === selectedStation;
            const cx = s.coords.x;
            const cy = s.coords.y;
            return (
              <g key={s.id}>
                <circle cx={cx} cy={cy} r={isSelected ? 4.5 : 3} fill={isSelected ? "#D4940A" : "#003594"} stroke="white" strokeWidth={isSelected ? 1.5 : 1}/>
                {isSelected && <circle cx={cx} cy={cy} r="7" fill="none" stroke="#D4940A" strokeWidth="1" opacity="0.5"/>}
                {/* Pandal markers near station */}
                {pandals.filter(p => s.pandals.includes(p.id)).map((p, i) => (
                  <circle key={p.id} cx={cx + (i % 2 === 0 ? 6 : -6)} cy={cy + (i < 2 ? -6 : 6)} r="2.5" fill="#C4622D" stroke="white" strokeWidth="0.8"/>
                ))}
              </g>
            );
          })}

          {/* Line legend */}
          <rect x="2" y="2" width="35" height="12" fill="rgba(0,0,0,0.5)" rx="2"/>
          <line x1="4" y1="6" x2="12" y2="6" stroke="#003594" strokeWidth="2"/>
          <text x="14" y="8" fill="white" fontSize="3" fontFamily="Poppins">Blue Line</text>
          <line x1="4" y1="11" x2="12" y2="11" stroke="#00913A" strokeWidth="2"/>
          <text x="14" y="13" fill="white" fontSize="3" fontFamily="Poppins">Green Line</text>
          {/* Pandal legend */}
          <circle cx="25" cy="6" r="2" fill="#C4622D"/>
          <text x="28" y="8" fill="white" fontSize="2.8" fontFamily="Poppins">Pandal</text>
        </svg>

        {/* Station name labels */}
        {metroStations.map(s => (
          <button
            key={s.id}
            className="absolute transition-all"
            style={{ left: `${s.coords.x}%`, top: `${s.coords.y}%`, transform: "translate(-50%, -100%)", marginTop: -8 }}
            onClick={() => setSelectedStation(s.id)}
          >
            <span
              className="px-1.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap"
              style={{ background: selectedStation === s.id ? "#D4940A" : "rgba(255,255,255,0.9)", color: selectedStation === s.id ? "#3A0A0A" : "#003594", fontSize: 9 }}
            >
              {s.name}
            </span>
          </button>
        ))}

        {/* Map label */}
        <div className="absolute top-2 right-3">
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Kolkata Metro Network</span>
        </div>
      </div>

      {/* Station detail card */}
      {station && (
        <div className="mx-5 mt-3 flex-1 overflow-y-auto">
          <div className="animate-fadeInUp">
            {/* Station header */}
            <div className="p-4 rounded-2xl mb-3" style={{ background: "#003594" }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-medium opacity-70 text-white">Selected Station</p>
                  <h2 className="font-display text-2xl font-bold text-white">{station.name}</h2>
                  <span className="text-xs text-white opacity-70">{station.line} · ~{station.walkTime} walk to pandals</span>
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <span className="text-3xl">🚇</span>
                </div>
              </div>
              <div className="alpana-divider opacity-20 mt-2" />
              {/* Exit information */}
              <button
                className="mt-3 flex items-center gap-2"
                onClick={() => setShowExits(!showExits)}
              >
                <span className="text-xs font-semibold text-white opacity-80">🚪 Exits & Entrances</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: showExits ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M3 5l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {showExits && (
                <div className="mt-2 grid grid-cols-2 gap-2 animate-fadeIn">
                  {station.exits.map((exit, i) => (
                    <div key={i} className="rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <p className="text-xs font-semibold text-white">{exit}</p>
                      <p className="text-xs text-white opacity-60">Gate {String.fromCharCode(65 + i)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Nearby pandals */}
            <p className="font-semibold text-sm mb-2 px-1" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>
              🎭 {nearbyPandals.length} Pandals Within Walking Distance
            </p>
            {nearbyPandals.map((p, idx) => (
              <div key={p.id} className="flex gap-3 p-3 rounded-2xl mb-2 card-hover" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>{p.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold ml-2 flex-shrink-0" style={{ background: crowdBg[p.crowd], color: crowdColors[p.crowd] }}>
                      ● {p.crowdLabel}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#7A6A5A" }}>{p.theme}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs font-medium" style={{ color: "#003594" }}>🚶 {station.walkTime}</span>
                    <span className="text-xs" style={{ color: "#7A6A5A" }}>⏱ {p.waitTime} wait</span>
                    <span className="flex items-center gap-0.5 text-xs" style={{ color: "#D4940A" }}>★ {p.rating}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Metro tips */}
            <div className="p-4 rounded-2xl mt-2" style={{ background: "#FFF7ED", border: "1px solid #FDE68A" }}>
              <p className="font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: "#92400E" }}>
                💡 Metro Pujo Tips
              </p>
              {["Buy a smart card for faster boarding during Pujo rush.", "Avoid 6–9 PM peak hours at Kalighat & Dum Dum stations.", "Last metro from Dum Dum to Majerhat: 11:30 PM (extended Pujo service)."].map(tip => (
                <p key={tip} className="text-xs mb-1 flex items-start gap-2" style={{ color: "#7A6A5A" }}>
                  <span style={{ color: "#D4940A" }}>•</span> {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
