import { useState } from "react";
import { foodPlaces, zones } from "../data/appData";

type HungerLevel = "snack" | "meal" | "starving";
type FoodType = "all" | "Street Food" | "Local Cafe" | "Fine Dining";
type ViewMode = "list" | "map";
type BookingState = "none" | "express_confirm" | "table_slots" | "express_booked" | "table_booked";

const hungerIcons: Record<HungerLevel, string> = { snack: "🍡", meal: "🍛", starving: "🍖" };
const hungerLabels: Record<HungerLevel, string> = { snack: "Quick Snack", meal: "Proper Meal", starving: "Starving!" };

export default function FoodScreen() {
  const [area, setArea] = useState("Central Kolkata");
  const [hunger, setHunger] = useState<HungerLevel>("meal");
  const [filter, setFilter] = useState<FoodType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedFood, setSelectedFood] = useState<number | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>("none");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = foodPlaces.filter(f => {
    const hungerMatch = f.hungerLevel.includes(hunger);
    const typeMatch = filter === "all" || f.type === filter;
    return hungerMatch && typeMatch;
  });

  const foodDetail = foodPlaces.find(f => f.id === selectedFood);

  const handleBook = (type: "express" | "table") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingState(type === "express" ? "express_confirm" : "table_slots");
    }, 1000);
  };

  const confirmBooking = (type: "express" | "table") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingState(type === "express" ? "express_booked" : "table_booked");
    }, 1200);
  };

  // Booking overlay
  if (selectedFood && bookingState !== "none") {
    return (
      <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8" }}>
        <div style={{ height: 54 }} />
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => { setBookingState("none"); setSelectedFood(null); }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="#3A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <h1 className="font-display text-xl font-bold" style={{ color: "#3A0A0A" }}>
            {bookingState === "express_booked" ? "Booking Confirmed! 🎉" : bookingState === "table_booked" ? "Table Reserved! 🎉" : bookingState === "express_confirm" ? "Express Pickup" : "Choose Time Slot"}
          </h1>
        </div>

        <div className="flex-1 px-5 overflow-y-auto">
          {(bookingState === "express_booked" || bookingState === "table_booked") ? (
            <div className="animate-fadeInUp">
              {/* Success state */}
              <div className="rounded-3xl overflow-hidden mb-4" style={{ background: "#7B1C1C" }}>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(212,148,10,0.2)", border: "2px solid #D4940A" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l5 5 11-11" stroke="#D4940A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white mb-1">{foodDetail?.name}</h2>
                  <p className="text-sm opacity-70 text-white">
                    {bookingState === "express_booked" ? `Express Pickup · ${foodDetail?.specialty}` : `Table for 2 · ${selectedSlot || "8:00 PM"}`}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  {bookingState === "express_booked" ? (
                    <>
                      {/* QR Code */}
                      <div className="rounded-2xl p-4 mb-3" style={{ background: "#FBF5E8" }}>
                        <div className="w-28 h-28 mx-auto rounded-xl qr-pattern mb-2 relative flex items-center justify-center" style={{ border: "2px solid #7B1C1C" }}>
                          <div className="w-16 h-16 grid grid-cols-4 gap-0.5">
                            {[...Array(16)].map((_, i) => (
                              <div key={i} className="rounded-sm" style={{ background: Math.random() > 0.5 ? "#7B1C1C" : "transparent" }} />
                            ))}
                          </div>
                          <div className="absolute w-6 h-6 rounded flex items-center justify-center" style={{ background: "#7B1C1C" }}>
                            <span className="text-xs font-bold text-white">PJ</span>
                          </div>
                        </div>
                        <p className="text-center font-mono-data text-xs font-bold" style={{ color: "#7B1C1C" }}>PJ2025-{foodDetail?.name.slice(0,3).toUpperCase()}-{Math.floor(Math.random()*9000)+1000}</p>
                        <p className="text-center text-xs mt-1" style={{ color: "#7A6A5A" }}>Show this QR at pickup counter</p>
                      </div>
                      <div className="rounded-2xl p-4" style={{ background: "rgba(212,148,10,0.15)" }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-medium opacity-70 text-white">Pickup Time</p>
                            <p className="font-display text-3xl font-bold" style={{ color: "#D4940A" }}>7:30 PM</p>
                            <p className="text-xs text-white opacity-60">Today, Oct 12 · Counter #3</p>
                          </div>
                          <div className="text-4xl">🕰</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl p-4" style={{ background: "rgba(212,148,10,0.15)" }}>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-xs opacity-70 text-white">Reserved For</p>
                          <p className="font-display text-3xl font-bold" style={{ color: "#D4940A" }}>{selectedSlot || "8:00 PM"}</p>
                          <p className="text-xs text-white opacity-60">Today, Oct 12 · Table for 2</p>
                        </div>
                        <span className="text-4xl">🪑</span>
                      </div>
                      <div className="h-px opacity-20 mb-3" style={{ background: "#D4940A" }} />
                      <p className="text-xs text-white opacity-70">Confirmation Code: <span className="font-bold font-mono-data">{foodDetail?.name.slice(0,2).toUpperCase()}-TBL-{Math.floor(Math.random()*900)+100}</span></p>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => { setBookingState("none"); setSelectedFood(null); }}
                className="w-full py-4 rounded-2xl font-semibold transition-all active:scale-95"
                style={{ background: "#7B1C1C", color: "#FBF5E8" }}
              >
                Back to Food Finder
              </button>
            </div>
          ) : bookingState === "express_confirm" ? (
            <div className="animate-fadeInUp">
              <div className="p-4 rounded-2xl mb-4" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={foodDetail?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: "#3A0A0A" }}>{foodDetail?.name}</h3>
                    <p className="text-sm" style={{ color: "#7A6A5A" }}>{foodDetail?.specialty}</p>
                    <p className="font-bold text-lg mt-1" style={{ color: "#7B1C1C" }}>{foodDetail?.price}  est. ₹280–380</p>
                  </div>
                </div>
                <div className="alpana-divider" />
                <div className="mt-3 space-y-2">
                  {[
                    { label: "Pickup Location", value: `${foodDetail?.area} Counter #3` },
                    { label: "Estimated Ready", value: "7:30 PM (15 min from now)" },
                    { label: "Valid Until", value: "8:30 PM" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span style={{ color: "#7A6A5A" }}>{item.label}</span>
                      <span className="font-semibold" style={{ color: "#3A0A0A" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => confirmBooking("express")}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ background: "#7B1C1C", color: "#FBF5E8" }}
              >
                {loading ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/><span>Booking...</span></> : "Confirm Express Pickup ⚡"}
              </button>
            </div>
          ) : (
            <div className="animate-fadeInUp">
              {/* Time slot selector */}
              <p className="font-semibold mb-3" style={{ color: "#3A0A0A" }}>Select a Time Slot</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map(slot => {
                  const available = slot !== "8:30 PM";
                  return (
                    <button
                      key={slot}
                      disabled={!available}
                      onClick={() => setSelectedSlot(slot)}
                      className="py-3 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: selectedSlot === slot ? "#7B1C1C" : available ? "#fff" : "#F5F5F5",
                        color: selectedSlot === slot ? "#FBF5E8" : available ? "#3A0A0A" : "#9A9A9A",
                        border: `1px solid ${selectedSlot === slot ? "#7B1C1C" : available ? "#E0D5C5" : "#E8E8E8"}`,
                      }}
                    >
                      {slot}
                      {!available && <span className="block text-xs font-normal text-red-400">Full</span>}
                    </button>
                  );
                })}
              </div>
              <div className="p-3 rounded-2xl mb-4" style={{ background: "#FFF7ED", border: "1px solid #FDE68A" }}>
                <p className="text-xs" style={{ color: "#92400E" }}>⏱ Tables fill up fast during Pujo! Book at least 1 hour in advance.</p>
              </div>
              <button
                onClick={() => selectedSlot && confirmBooking("table")}
                disabled={!selectedSlot || loading}
                className="w-full py-4 rounded-2xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
                style={{ background: "#7B1C1C", color: "#FBF5E8" }}
              >
                {loading ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/><span>Reserving...</span></> : `Reserve Table for ${selectedSlot || "..."} →`}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8" }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div className="px-5 py-3">
        <h1 className="font-display text-2xl font-bold" style={{ color: "#3A0A0A" }}>Food Finder 🍛</h1>
        <p className="text-xs" style={{ color: "#7A6A5A" }}>Fuel your Pujo hopping adventure</p>
      </div>

      {/* Controls */}
      <div className="px-5 space-y-3">
        {/* Area + View toggle */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3.3 4 8 4 8s4-4.7 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.4 1.4 0 1 1 7 3.7a1.4 1.4 0 0 1 0 2.8z" fill="#7B1C1C"/></svg>
            <select
              value={area}
              onChange={e => setArea(e.target.value)}
              className="flex-1 text-sm font-semibold bg-transparent border-none outline-none"
              style={{ color: "#3A0A0A" }}
            >
              {zones.map(z => <option key={z}>{z}</option>)}
            </select>
          </div>
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid #E0D5C5" }}>
            {(["list", "map"] as ViewMode[]).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className="px-3 py-2 text-sm transition-all"
                style={{ background: viewMode === m ? "#7B1C1C" : "#fff", color: viewMode === m ? "#FBF5E8" : "#7A6A5A" }}
              >
                {m === "list" ? "≡" : "⊞"}
              </button>
            ))}
          </div>
        </div>

        {/* Hunger selector */}
        <div className="flex gap-2">
          {(["snack", "meal", "starving"] as HungerLevel[]).map(h => (
            <button
              key={h}
              onClick={() => setHunger(h)}
              className="flex-1 py-2.5 rounded-xl flex flex-col items-center gap-0.5 transition-all"
              style={{ background: hunger === h ? "#7B1C1C" : "#fff", border: `1px solid ${hunger === h ? "#7B1C1C" : "#E0D5C5"}` }}
            >
              <span className="text-lg">{hungerIcons[h]}</span>
              <span className="text-xs font-semibold" style={{ color: hunger === h ? "#FBF5E8" : "#5A4A3A" }}>{hungerLabels[h]}</span>
            </button>
          ))}
        </div>

        {/* Type filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {(["all", "Street Food", "Local Cafe", "Fine Dining"] as FoodType[]).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: filter === t ? "#D4940A" : "#fff", color: filter === t ? "#3A0A0A" : "#7A6A5A", border: `1px solid ${filter === t ? "#D4940A" : "#E0D5C5"}` }}
            >
              {t === "all" ? "🍽 All" : t === "Street Food" ? "🛺 Street" : t === "Local Cafe" ? "☕ Café" : "🍷 Fine Dining"}
            </button>
          ))}
        </div>
      </div>

      {/* Food list / map */}
      <div className="flex-1 overflow-y-auto px-5 mt-3 pb-2">
        {viewMode === "map" ? (
          <div className="rounded-2xl overflow-hidden relative" style={{ height: 300, background: "#1e4a30" }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect width="100" height="100" fill="#1e4a30"/>
              {[20,40,60,80].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#2a5a3a" strokeWidth="1"/>)}
              {[20,40,60,80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#2a5a3a" strokeWidth="1"/>)}
              {filtered.map(f => (
                <g key={f.id}>
                  <circle cx={f.coords.x} cy={f.coords.y} r="5" fill="#C4622D" stroke="white" strokeWidth="1"/>
                  <text x={f.coords.x} y={f.coords.y + 1.5} textAnchor="middle" fill="white" fontSize="4">🍛</text>
                </g>
              ))}
            </svg>
            <p className="absolute bottom-3 left-3 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
              {filtered.length} food spots in {area}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-2xl mb-2">😕</p>
                <p className="font-semibold" style={{ color: "#7A6A5A" }}>No results. Try a different hunger level.</p>
              </div>
            )}
            {filtered.map(food => (
              <div key={food.id} className="rounded-2xl overflow-hidden card-hover" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                {/* Image */}
                <div className="relative" style={{ height: 110 }}>
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(58,10,10,0.7), transparent 60%)" }} />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,0,0,0.5)", color: "#FBF5E8" }}>{food.type}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(212,148,10,0.9)", color: "#3A0A0A" }}>{food.price}</span>
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight text-white">{food.name}</h3>
                      <p className="text-xs text-white opacity-80">{food.area} · {food.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs font-bold text-white">{food.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Info row */}
                <div className="px-3 py-2 flex items-center gap-4">
                  <span className="text-xs" style={{ color: "#7A6A5A" }}>⏱ {food.waitTime} wait</span>
                  <span className="text-xs" style={{ color: "#7A6A5A" }}>🕐 Open until {food.openUntil}</span>
                  <div className="flex gap-1 ml-auto">
                    {food.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ background: "#FBF5E8", color: "#7B1C1C" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="px-3 pb-3 flex gap-2">
                  {food.expressPickup && (
                    <button
                      onClick={() => { setSelectedFood(food.id); handleBook("express"); }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      style={{ background: "#7B1C1C", color: "#FBF5E8" }}
                    >
                      ⚡ Express Pickup
                    </button>
                  )}
                  {food.tableAvailable && (
                    <button
                      onClick={() => { setSelectedFood(food.id); handleBook("table"); }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      style={{ background: food.expressPickup ? "#FBF5E8" : "#7B1C1C", color: food.expressPickup ? "#7B1C1C" : "#FBF5E8", border: food.expressPickup ? "1px solid #E0D5C5" : "none" }}
                    >
                      🪑 Book Table
                    </button>
                  )}
                  {!food.expressPickup && !food.tableAvailable && (
                    <span className="flex-1 py-2.5 text-center text-xs" style={{ color: "#7A6A5A" }}>Walk-in only</span>
                  )}
                  {/* Loading overlay */}
                  {loading && selectedFood === food.id && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ background: "rgba(251,245,232,0.9)" }}>
                      <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "#E0D5C5", borderTopColor: "#7B1C1C" }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
