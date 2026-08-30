import { useState, useEffect, useRef } from "react";
import { pandals } from "../data/appData";

type AppScreen = "splash" | "zone" | "dashboard" | "metro" | "train" | "food" | "account";
interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const crowdColors = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };
const crowdBg = { low: "#F0FFF4", medium: "#FFFBEB", high: "#FFF1F1" };

export default function Dashboard({ onNavigate }: Props) {
  const [hours, setHours] = useState(6);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [expandedPandal, setExpandedPandal] = useState<number | null>(null);
  const [pathAnimated, setPathAnimated] = useState(false);
  const [vicinityMapVisible, setVicinityMapVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const maxPandals = Math.min(Math.floor(hours / 1.5), pandals.length);
  const activePandals = pandals.slice(0, maxPandals);

  useEffect(() => {
    const t = setTimeout(() => setPathAnimated(true), 400);
    const t2 = setTimeout(() => setVicinityMapVisible(true), 800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  // Route path connecting pandal coords
  const routeCoords = activePandals.map(p => p.coords);
  const pathD = routeCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x}% ${c.y}%`).join(" ");

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8" }}>
      {/* Status bar area */}
      <div style={{ height: 54 }} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <p className="text-xs font-medium" style={{ color: "#7A6A5A", fontFamily: "Poppins" }}>Pandal Hopper</p>
          <h1 className="font-display text-xl font-bold leading-tight" style={{ color: "#3A0A0A" }}>
            Your Route · {hours} hrs
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L11.2 6.5H17.3L12.5 10.1L14.3 15.8L9 12.3L3.7 15.8L5.5 10.1L0.7 6.5H6.8L9 1Z" fill="#D4940A"/></svg>
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="1.5" fill="#3A0A0A"/><circle cx="8" cy="8" r="1.5" fill="#3A0A0A"/><circle cx="8" cy="13" r="1.5" fill="#3A0A0A"/></svg>
          </button>
          <button onClick={() => onNavigate("account")} className="w-9 h-9 rounded-full overflow-hidden" style={{ border: "2px solid #7B1C1C" }}>
            <div className="w-full h-full flex items-center justify-center font-semibold text-xs" style={{ background: "#7B1C1C", color: "#FBF5E8" }}>RB</div>
          </button>
        </div>
      </div>

      {/* Vicinity map — small integrated map below top bar */}
      <div
        className={`mx-5 rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-500 ${vicinityMapVisible ? "opacity-100" : "opacity-0 translate-y-2"}`}
        style={{ height: 110, background: "#1a3a2a", border: "1.5px solid #E0D5C5", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        onClick={() => setSelectedMarker(selectedMarker === null ? 1 : null)}
      >
        {/* Map base */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 110" preserveAspectRatio="none">
          {/* Streets */}
          <rect width="390" height="110" fill="#1e4a30"/>
          {[20,45,70,92].map(y => <line key={y} x1="0" y1={y} x2="390" y2={y} stroke="#2a5a3a" strokeWidth="8"/>)}
          {[50,110,170,230,290,350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="110" stroke="#2a5a3a" strokeWidth="8"/>)}
          {/* Parks */}
          <rect x="60" y="15" width="40" height="30" fill="#2d6e42" rx="4"/>
          <rect x="200" y="50" width="35" height="35" fill="#2d6e42" rx="4"/>
          {/* Water */}
          <ellipse cx="310" cy="55" rx="25" ry="15" fill="#1a4a5a"/>
          {/* Labels */}
          <text x="80" y="35" textAnchor="middle" fill="#4a9a5a" fontSize="6" fontFamily="Poppins">Park</text>
        </svg>

        {/* Vicinity pandal markers — always visible, independent of main route */}
        {pandals.map((p, i) => {
          const x = (p.coords.x / 100) * 390;
          const y = (p.coords.y / 100) * 110 * 0.6 + 10;
          const isSelected = selectedMarker === p.id;
          return (
            <div
              key={p.id}
              className="absolute transition-all duration-200"
              style={{ left: x - 10, top: Math.min(y, 80), zIndex: isSelected ? 10 : 1 }}
              onClick={e => { e.stopPropagation(); setSelectedMarker(isSelected ? null : p.id); }}
            >
              <div className="relative">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow"
                  style={{ background: isSelected ? "#D4940A" : "#7B1C1C", transform: isSelected ? "scale(1.4)" : "scale(1)", transition: "all 0.2s" }}
                >
                  {i + 1}
                </div>
                {isSelected && (
                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg text-xs font-semibold animate-fadeIn" style={{ background: "#3A0A0A", color: "#FBF5E8" }}>
                    {p.name.split(" ").slice(0, 2).join(" ")}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #3A0A0A" }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live location */}
        <div className="absolute animate-pulse-gold" style={{ left: 185, top: 45, transform: "translate(-50%, -50%)" }}>
          <div className="w-4 h-4 rounded-full" style={{ background: "#3B82F6", boxShadow: "0 0 0 3px rgba(59,130,246,0.3)" }} />
        </div>

        {/* Map label */}
        <div className="absolute top-2 left-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>Nearby Pandals • Tap to explore</span>
        </div>
        <div className="absolute top-2 right-3">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>↗ Expand</span>
        </div>
      </div>

      {/* Main route map */}
      <div className="mx-5 mt-3 rounded-2xl overflow-hidden relative" style={{ height: 200, background: "#1a3a2a" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Base map */}
          <rect width="100" height="100" fill="#1e4a30"/>
          {/* Grid streets */}
          {[15,30,45,60,75,90].map(y => <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="#2a5a3a" strokeWidth="1.5"/>)}
          {[15,28,42,55,68,80,92].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="#2a5a3a" strokeWidth="1.5"/>)}
          {/* Major roads */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#3a7a4a" strokeWidth="3"/>
          <line x1="50" y1="0" x2="50" y2="100" stroke="#3a7a4a" strokeWidth="3"/>
          {/* Parks */}
          <rect x="20" y="20" width="18" height="12" fill="#2d6e42" rx="2"/>
          <rect x="60" y="60" width="16" height="16" fill="#2d6e42" rx="2"/>
          <rect x="35" y="65" width="12" height="14" fill="#2d6e42" rx="2"/>
          {/* Water body */}
          <ellipse cx="75" cy="35" rx="12" ry="8" fill="#1a4a5a"/>
          {/* Labels */}
          <text x="29" y="28" textAnchor="middle" fill="#4a9a5a" fontSize="3" fontFamily="Poppins">Park</text>
          <text x="75" y="36" textAnchor="middle" fill="#2a6a7a" fontSize="2.5" fontFamily="Poppins">Lake</text>

          {/* Animated route path */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {pathAnimated && (
            <path
              d={routeCoords.map((c, i) => {
                if (i === 0) return `M ${c.x} ${c.y}`;
                const prev = routeCoords[i - 1];
                const mx = (prev.x + c.x) / 2;
                const my = (prev.y + c.y) / 2;
                return `Q ${mx + 8} ${my - 8} ${c.x} ${c.y}`;
              }).join(" ")}
              stroke="#F0B429"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 2"
              filter="url(#glow)"
              style={{ strokeDashoffset: 0, animation: "pathDraw 2s ease forwards" }}
            />
          )}

          {/* Pandal markers on main map */}
          {activePandals.map((p, i) => (
            <g key={p.id}>
              {/* Connector line already drawn by path */}
              <circle cx={p.coords.x} cy={p.coords.y} r="4" fill="#7B1C1C" stroke="#F0B429" strokeWidth="1"/>
              <circle cx={p.coords.x} cy={p.coords.y} r="2" fill="#FBF5E8"/>
              <text x={p.coords.x} y={p.coords.y + 0.6} textAnchor="middle" fill="#FBF5E8" fontSize="2.2" fontWeight="bold" fontFamily="Poppins">{i + 1}</text>
            </g>
          ))}

          {/* Current location */}
          <circle cx="50" cy="58" r="3" fill="#3B82F6" opacity="0.9"/>
          <circle cx="50" cy="58" r="5" fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.5"/>
        </svg>

        {/* Map controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "rgba(255,255,255,0.9)", color: "#3A0A0A" }}>+</button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "rgba(255,255,255,0.9)", color: "#3A0A0A" }}>−</button>
        </div>

        {/* Route stats overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2">
          {[
            { label: "Pandals", value: activePandals.length },
            { label: "Distance", value: `${(activePandals.length * 3.2).toFixed(1)} km` },
            { label: "Est. Time", value: `${hours} hrs` },
          ].map(stat => (
            <div key={stat.label} className="flex-1 rounded-xl px-2.5 py-1.5" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
              <p className="font-mono-data text-xs font-bold" style={{ color: "#F0B429" }}>{stat.value}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours slider */}
      <div className="mx-5 mt-3 p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#7B1C1C" strokeWidth="1.5"/><path d="M8 5v3.5l2 1.5" stroke="#7B1C1C" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="font-semibold text-sm" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>Hours Available</span>
          </div>
          <span className="font-mono-data font-bold text-sm" style={{ color: "#7B1C1C" }}>{hours} hrs → {activePandals.length} pandals</span>
        </div>
        <input
          type="range" min="2" max="12" value={hours}
          onChange={e => setHours(Number(e.target.value))}
          className="w-full"
          style={{ "--val": `${((hours - 2) / 10) * 100}%` } as React.CSSProperties}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: "#7A6A5A" }}>
          <span>2 hrs</span><span>12 hrs</span>
        </div>
      </div>

      {/* Collapsible bottom sheet */}
      <div
        className="flex-1 mx-5 mt-3 rounded-t-3xl overflow-hidden flex flex-col"
        style={{ background: "#fff", border: "1px solid #E0D5C5", borderBottom: "none", minHeight: 0 }}
      >
        {/* Sheet handle */}
        <button
          className="flex flex-col items-center pt-3 pb-2"
          onClick={() => setSheetExpanded(!sheetExpanded)}
        >
          <div className="w-10 h-1 rounded-full mb-2" style={{ background: "#E0D5C5" }} />
          <div className="flex items-center justify-between w-full px-5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>🗺 Route Details</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#7B1C1C", color: "#FBF5E8" }}>{activePandals.length}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: sheetExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
              <path d="M4 6l4 4 4-4" stroke="#7A6A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Pandal list */}
        <div className="overflow-y-auto flex-1 px-4 pb-4">
          {activePandals.map((pandal, idx) => (
            <div key={pandal.id} className="mb-3">
              <button
                className="w-full text-left rounded-2xl overflow-hidden transition-all active:scale-98"
                style={{ background: "#FBF5E8", border: "1px solid #E0D5C5" }}
                onClick={() => setExpandedPandal(expandedPandal === pandal.id ? null : pandal.id)}
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Step number */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: "#7B1C1C", color: "#FBF5E8" }}>
                    {idx + 1}
                  </div>
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "#E0D5C5" }}>
                    <img src={pandal.image} alt={pandal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm leading-tight truncate" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>
                        {pandal.name}
                      </h3>
                      <span
                        className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: crowdBg[pandal.crowd], color: crowdColors[pandal.crowd] }}
                      >
                        ● {pandal.crowdLabel}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#7A6A5A" }}>{pandal.neighborhood} · {pandal.theme}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium" style={{ color: "#7B1C1C" }}>⏱ {pandal.waitTime} wait</span>
                      <span className="text-xs" style={{ color: "#7A6A5A" }}>👁 {pandal.viewTime} viewing</span>
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {expandedPandal === pandal.id && (
                  <div className="px-4 pb-3 border-t animate-fadeIn" style={{ borderColor: "#E0D5C5" }}>
                    <div className="alpana-divider mb-3" />
                    <div className="relative rounded-xl overflow-hidden mb-3" style={{ height: 120 }}>
                      <img src={pandal.image} alt={pandal.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(58,10,10,0.7), transparent)" }} />
                      <div className="absolute bottom-2 left-3">
                        <p className="text-xs font-bold" style={{ color: "#F0B429" }}>{pandal.year}</p>
                        <p className="font-display text-sm font-bold" style={{ color: "#FBF5E8" }}>{pandal.theme}</p>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        {pandal.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(212,148,10,0.9)", color: "#3A0A0A" }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#5A4A3A", fontFamily: "Poppins" }}>{pandal.highlight}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: "⏱", label: "Wait", value: pandal.waitTime },
                        { icon: "👁", label: "View", value: pandal.viewTime },
                        { icon: "🚇", label: "Transit", value: pandal.transitToNext === "0" ? "Last stop" : pandal.transitToNext },
                      ].map(item => (
                        <div key={item.label} className="rounded-xl p-2 text-center" style={{ background: "#fff" }}>
                          <p className="text-base">{item.icon}</p>
                          <p className="font-mono-data text-xs font-bold mt-0.5" style={{ color: "#7B1C1C" }}>{item.value}</p>
                          <p className="text-xs" style={{ color: "#7A6A5A" }}>{item.label}</p>
                        </div>
                      ))}
                    </div>
                    {idx < activePandals.length - 1 && (
                      <div className="mt-2 flex items-center gap-2 p-2 rounded-xl" style={{ background: "#F0F7FF" }}>
                        <span className="text-sm">🚇</span>
                        <p className="text-xs" style={{ color: "#3A0A0A" }}>
                          Next: Metro from <span className="font-semibold">{pandal.metro}</span> → {activePandals[idx + 1]?.metro} ({pandal.transitToNext})
                        </p>
                      </div>
                    )}
                    <button className="w-full mt-3 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95" style={{ background: "#7B1C1C", color: "#FBF5E8" }}>
                      Get Directions →
                    </button>
                  </div>
                )}
              </button>

              {/* Connector between stops */}
              {idx < activePandals.length - 1 && (
                <div className="flex items-center gap-2 pl-7 py-1">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-3" style={{ background: "#D4940A" }} />
                    <div className="text-xs" style={{ color: "#D4940A" }}>🚇</div>
                    <div className="w-px h-3" style={{ background: "#D4940A" }} />
                  </div>
                  <span className="text-xs" style={{ color: "#7A6A5A" }}>{pandal.transitToNext} via metro</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
