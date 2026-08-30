import { useState } from "react";
import { trainStations, pandals } from "../data/appData";

export default function TrainScreen() {
  const [selectedStation, setSelectedStation] = useState("sealdah");

  const station = trainStations.find(s => s.id === selectedStation);
  const nearbyPandals = station ? pandals.filter(p => station.pandals.includes(p.id)) : [];
  const crowdColors = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };
  const crowdBg = { low: "#F0FFF4", medium: "#FFFBEB", high: "#FFF1F1" };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8" }}>
      <div style={{ height: 54 }} />

      <div className="px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#8B1A1A" }}>
            <span className="text-white text-xs font-bold">IR</span>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: "#7A6A5A" }}>Indian Railways</p>
            <h1 className="font-display text-xl font-bold" style={{ color: "#3A0A0A" }}>Train Pujo Guide</h1>
          </div>
        </div>
      </div>

      {/* Train network map */}
      <div className="mx-5 rounded-2xl overflow-hidden relative" style={{ height: 220, background: "#1e3a2a" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect width="100" height="100" fill="#1e4a30"/>
          {[20,40,60,80].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#2a5a3a" strokeWidth="0.8"/>)}
          {[20,40,60,80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#2a5a3a" strokeWidth="0.8"/>)}

          {/* Howrah-Sealdah main line */}
          <path d="M 22 52 Q 35 48 52 45" stroke="#FF6B35" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Sealdah-Ballygunge line */}
          <path d="M 52 45 Q 56 58 60 72" stroke="#FF6B35" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Ballygunge-Jadavpur line */}
          <path d="M 60 72 Q 54 80 48 88" stroke="#FF6B35" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Howrah branch */}
          <path d="M 22 52 L 22 30" stroke="#8B8B35" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>

          {/* Station markers */}
          {trainStations.map(s => {
            const isSelected = s.id === selectedStation;
            return (
              <g key={s.id}>
                <rect x={s.coords.x - 4} y={s.coords.y - 4} width="8" height="8" fill={isSelected ? "#D4940A" : "#FF6B35"} stroke="white" strokeWidth={isSelected ? 1.5 : 0.8} rx="1"/>
                {isSelected && <rect x={s.coords.x - 6} y={s.coords.y - 6} width="12" height="12" fill="none" stroke="#D4940A" strokeWidth="1" rx="2" opacity="0.5"/>}
                {/* Nearby pandal indicators */}
                {pandals.filter(p => s.pandals.includes(p.id)).map((p, i) => (
                  <circle key={p.id} cx={s.coords.x + (i * 7) - 3} cy={s.coords.y - 10} r="3" fill="#C4622D" stroke="white" strokeWidth="0.8"/>
                ))}
              </g>
            );
          })}

          {/* Legend */}
          <rect x="2" y="2" width="40" height="16" fill="rgba(0,0,0,0.55)" rx="2"/>
          <line x1="4" y1="8" x2="14" y2="8" stroke="#FF6B35" strokeWidth="2"/>
          <text x="16" y="10" fill="white" fontSize="3" fontFamily="Poppins">Suburban Rail</text>
          <circle cx="6" cy="15" r="2.5" fill="#C4622D"/>
          <text x="10" y="17" fill="white" fontSize="3" fontFamily="Poppins">Pandal nearby</text>
        </svg>

        {/* Clickable station overlays */}
        {trainStations.map(s => (
          <button
            key={s.id}
            className="absolute"
            style={{ left: `${s.coords.x}%`, top: `${s.coords.y}%`, transform: "translate(-50%, 8px)" }}
            onClick={() => setSelectedStation(s.id)}
          >
            <span
              className="px-1.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap block"
              style={{ background: selectedStation === s.id ? "#D4940A" : "rgba(255,255,255,0.9)", color: selectedStation === s.id ? "#3A0A0A" : "#8B1A1A", fontSize: 9 }}
            >
              {s.name}
            </span>
          </button>
        ))}

        <div className="absolute top-2 right-3">
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Suburban Rail Network</span>
        </div>
      </div>

      {/* Station tabs */}
      <div className="flex gap-2 px-5 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {trainStations.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedStation(s.id)}
            className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: selectedStation === s.id ? "#7B1C1C" : "#fff",
              color: selectedStation === s.id ? "#FBF5E8" : "#5A4A3A",
              border: `1px solid ${selectedStation === s.id ? "#7B1C1C" : "#E0D5C5"}`,
            }}
          >
            🚂 {s.name}
          </button>
        ))}
      </div>

      {/* Station detail */}
      {station && (
        <div className="flex-1 mx-5 mt-3 overflow-y-auto animate-fadeInUp pb-4">
          {/* Station card */}
          <div className="p-4 rounded-2xl mb-3" style={{ background: "#8B1A1A" }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs opacity-70 text-white">Station</p>
                <h2 className="font-display text-xl font-bold text-white">{station.name}</h2>
                <p className="text-xs text-white opacity-70">{station.type} · {station.platforms}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl">🚂</span>
                <p className="text-xs text-white opacity-60 mt-1">{station.autoTime}</p>
              </div>
            </div>
            <div className="alpana-divider opacity-20" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl p-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs text-white opacity-60">Nearest Pandals</p>
                <p className="font-bold text-sm text-white">{station.pandals.length} within reach</p>
              </div>
              <div className="rounded-xl p-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs text-white opacity-60">Local Transport</p>
                <p className="font-bold text-sm text-white">Auto · Bus · Metro</p>
              </div>
            </div>
          </div>

          {/* Pandals reachable */}
          <p className="font-semibold text-sm mb-2" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>
            🎭 Pandals Via This Station
          </p>
          {station.nearbyPandals.map((desc, i) => {
            const pandal = nearbyPandals[i];
            return (
              <div key={i} className="flex gap-3 p-3 rounded-2xl mb-2" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                {pandal && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={pandal.image} alt={pandal.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>
                    {pandal?.name || desc.split("(")[0].trim()}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#7B1C1C" }}>📍 {desc}</p>
                  {pandal && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: crowdBg[pandal.crowd], color: crowdColors[pandal.crowd] }}>
                        ● {pandal.crowdLabel}
                      </span>
                      <span className="text-xs" style={{ color: "#7A6A5A" }}>★ {pandal.rating}</span>
                    </div>
                  )}
                </div>
                <button className="self-center px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0" style={{ background: "#FBF5E8", color: "#7B1C1C", border: "1px solid #E0D5C5" }}>
                  Add to Route
                </button>
              </div>
            );
          })}

          {/* Train tips */}
          <div className="p-4 rounded-2xl mt-2" style={{ background: "#FFF7ED", border: "1px solid #FDE68A" }}>
            <p className="font-semibold text-sm mb-2" style={{ color: "#92400E" }}>🚂 Train Pujo Tips</p>
            {[
              "Howrah-Sealdah runs special Pujo trains with extended hours until 1 AM.",
              "Book Circular Railway day pass (₹40) for unlimited rides.",
              "Platform 1 at Howrah is closest to the auto/taxi stand for pandal-bound vehicles.",
            ].map(tip => (
              <p key={tip} className="text-xs mb-1 flex items-start gap-2" style={{ color: "#7A6A5A" }}>
                <span style={{ color: "#D4940A" }}>•</span> {tip}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
