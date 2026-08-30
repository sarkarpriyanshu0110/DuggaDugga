import { useState } from "react";
import { bookings, savedRoutes, pandals } from "../data/appData";

type Tab = "bookings" | "routes" | "history";

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "#F0FFF4", color: "#22c55e", label: "Confirmed ✓" },
  picked_up: { bg: "#EFF6FF", color: "#3B82F6", label: "Picked Up" },
  completed: { bg: "#F5F5F5", color: "#6B7280", label: "Completed" },
};

export default function AccountScreen() {
  const [tab, setTab] = useState<Tab>("bookings");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8" }}>
      <div style={{ height: 54 }} />

      {/* Profile header */}
      <div className="px-5 py-4" style={{ background: "linear-gradient(135deg, #7B1C1C, #C4622D)" }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-2xl" style={{ background: "rgba(251,245,232,0.2)", color: "#FBF5E8" }}>
            RB
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-white">Rahul Banerjee</h2>
            <p className="text-xs text-white opacity-70">Pandal Hopper · Gold Member</p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#D4940A", color: "#3A0A0A" }}>⭐ 12 Pandals visited</span>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 2L14 4L6 12H4V10L12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mt-4">
          {[
            { label: "Routes Saved", value: "4" },
            { label: "Food Bookings", value: "3" },
            { label: "Pujos Visited", value: "2" },
          ].map(stat => (
            <div key={stat.label} className="flex-1 rounded-xl p-2 text-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <p className="font-bold text-lg text-white">{stat.value}</p>
              <p className="text-xs text-white opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 pt-4 gap-2">
        {(["bookings", "routes", "history"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all"
            style={{ background: tab === t ? "#7B1C1C" : "#fff", color: tab === t ? "#FBF5E8" : "#7A6A5A", border: `1px solid ${tab === t ? "#7B1C1C" : "#E0D5C5"}` }}
          >
            {t === "bookings" ? "🍛 Bookings" : t === "routes" ? "🗺 Routes" : "📋 History"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 mt-4 pb-4">
        {tab === "bookings" && (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A6A5A" }}>Your Food Reservations</p>
            {bookings.map(booking => (
              <div key={booking.id} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                <button
                  className="w-full p-4 text-left"
                  onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{booking.type === "express" ? "⚡" : "🪑"}</span>
                        <h3 className="font-semibold text-sm" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>{booking.restaurant}</h3>
                      </div>
                      <p className="text-xs" style={{ color: "#7A6A5A" }}>
                        {booking.type === "express" ? booking.item : booking.tableSize}
                      </p>
                      <p className="text-xs mt-1 font-medium" style={{ color: "#7B1C1C" }}>
                        {booking.type === "express" ? `Pickup: ${booking.pickupDate} · ${booking.pickupTime}` : `Reserved: ${booking.reservedDate} · ${booking.reservedTime}`}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ background: statusStyle[booking.status].bg, color: statusStyle[booking.status].color }}
                      >
                        {statusStyle[booking.status].label}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "#3A0A0A" }}>{booking.amount}</span>
                    </div>
                  </div>
                </button>

                {expandedBooking === booking.id && (
                  <div className="px-4 pb-4 border-t animate-fadeIn" style={{ borderColor: "#E0D5C5" }}>
                    <div className="alpana-divider mb-3" />
                    {booking.type === "express" && (
                      <div className="flex items-center justify-between">
                        {/* Mini QR */}
                        <div className="w-20 h-20 rounded-xl grid grid-cols-5 gap-0.5 p-1.5" style={{ background: "#F5F0E8", border: "1px solid #E0D5C5" }}>
                          {[...Array(25)].map((_, i) => (
                            <div key={i} className="rounded-xs" style={{ background: Math.random() > 0.5 ? "#7B1C1C" : "transparent", width: "100%", height: "100%", aspectRatio: "1" }} />
                          ))}
                        </div>
                        <div className="flex-1 ml-4">
                          <p className="text-xs font-medium" style={{ color: "#7A6A5A" }}>Order Code</p>
                          <p className="font-mono-data font-bold text-sm" style={{ color: "#7B1C1C" }}>{booking.qrCode}</p>
                          <p className="text-xs mt-2" style={{ color: "#7A6A5A" }}>Show QR at pickup counter</p>
                        </div>
                      </div>
                    )}
                    {booking.type === "table" && (
                      <div className="text-center py-2">
                        <p className="text-xs font-medium" style={{ color: "#7A6A5A" }}>Confirmation Code</p>
                        <p className="font-mono-data font-bold text-lg" style={{ color: "#7B1C1C" }}>{booking.confirmCode}</p>
                        <p className="text-xs mt-1" style={{ color: "#7A6A5A" }}>Present this code at the restaurant</p>
                      </div>
                    )}
                    {booking.status === "confirmed" && (
                      <button className="w-full mt-3 py-2 rounded-xl text-xs font-semibold" style={{ background: "#FFF1F1", color: "#ef4444", border: "1px solid #fecaca" }}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "routes" && (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A6A5A" }}>Saved Routes</p>
            {savedRoutes.map(route => {
              const routePandals = pandals.filter(p => route.pandals.includes(p.id));
              return (
                <div key={route.id} className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>{route.name}</h3>
                      <p className="text-xs" style={{ color: "#7A6A5A" }}>{route.date} · {route.duration} · {route.pandals.length} stops</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: "#FBF5E8", color: "#7B1C1C", border: "1px solid #E0D5C5" }}>{route.zone}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {routePandals.map(p => (
                      <div key={p.id} className="w-10 h-10 rounded-lg overflow-hidden" style={{ border: "2px solid #FBF5E8" }}>
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{ background: "#7B1C1C", color: "#FBF5E8" }}>
                      Load Route →
                    </button>
                    <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "#FBF5E8", color: "#7A6A5A", border: "1px solid #E0D5C5" }}>
                      Share
                    </button>
                  </div>
                </div>
              );
            })}
            <button className="w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: "#FBF5E8", color: "#7B1C1C", border: "1.5px dashed #D4940A" }}>
              + Create New Route
            </button>
          </div>
        )}

        {tab === "history" && (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A6A5A" }}>Past Expeditions</p>
            {[
              { date: "Oct 10, 2024", pandalsVisited: 6, route: "North Kolkata Heritage", duration: "7h 20m", rating: "4.8" },
              { date: "Oct 12, 2024", pandalsVisited: 4, route: "South Kolkata Evening", duration: "4h 15m", rating: "4.6" },
            ].map(exp => (
              <div key={exp.date} className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid #E0D5C5" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: "#3A0A0A" }}>{exp.route}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#7A6A5A" }}>{exp.date} · {exp.duration}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-bold" style={{ color: "#D4940A" }}>
                    ★ {exp.rating}
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-xl px-3 py-2 flex-1 text-center" style={{ background: "#FBF5E8" }}>
                    <p className="font-bold text-xl" style={{ color: "#7B1C1C" }}>{exp.pandalsVisited}</p>
                    <p className="text-xs" style={{ color: "#7A6A5A" }}>Pandals</p>
                  </div>
                  <div className="rounded-xl px-3 py-2 flex-1 text-center" style={{ background: "#FBF5E8" }}>
                    <p className="font-bold text-xl" style={{ color: "#7B1C1C" }}>{exp.duration}</p>
                    <p className="text-xs" style={{ color: "#7A6A5A" }}>Duration</p>
                  </div>
                  <div className="rounded-xl px-3 py-2 flex-1 text-center" style={{ background: "#FBF5E8" }}>
                    <p className="font-bold text-xl" style={{ color: "#D4940A" }}>🏆</p>
                    <p className="text-xs" style={{ color: "#7A6A5A" }}>Badge</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
