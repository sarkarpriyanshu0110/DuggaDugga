import { useState } from "react";
import { zones, preferences } from "../data/appData";

interface Props {
  onNext: () => void;
}

export default function ZoneSelector({ onNext }: Props) {
  const [step, setStep] = useState<"zone" | "prefs">("zone");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const togglePref = (id: string) => {
    setSelectedPrefs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1800);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FBF5E8", paddingTop: 60 }}>
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: "#7B1C1C", color: "#FBF5E8" }}>
            {step === "zone" ? "1" : "2"}
          </div>
          <span className="text-xs font-medium" style={{ color: "#7B1C1C", fontFamily: "Poppins" }}>
            {step === "zone" ? "of 2 — Choose Your Zone" : "of 2 — Your Preferences"}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full mt-2" style={{ background: "#E0D5C5" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: step === "zone" ? "50%" : "100%", background: "linear-gradient(90deg, #7B1C1C, #D4940A)" }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {step === "zone" ? (
          <div className="animate-fadeInUp">
            <h2 className="font-display text-3xl font-bold mb-1" style={{ color: "#3A0A0A" }}>
              Where are you<br/>starting from?
            </h2>
            <p className="text-sm mb-6" style={{ color: "#7A6A5A", fontFamily: "Poppins" }}>
              We'll optimize your route from this area
            </p>

            {/* Map pin search */}
            <div className="flex items-center gap-3 p-4 rounded-2xl mb-5" style={{ background: "#fff", border: "1.5px solid #E0D5C5" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FFF0E0" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C5.52 1.5 3.5 3.52 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.48-2.02-4.5-4.5-4.5zm0 6.1A1.6 1.6 0 1 1 8 4.3a1.6 1.6 0 0 1 0 3.2z" fill="#7B1C1C"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-0.5" style={{ color: "#7B1C1C" }}>Current Location</p>
                <p className="text-sm font-semibold" style={{ color: "#3A0A0A" }}>Park Street, Central Kolkata</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: "#F0FFF4", color: "#22c55e" }}>● Live</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#7A6A5A" }}>Or choose a neighborhood</p>

            <div className="grid grid-cols-2 gap-3">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className="p-4 rounded-2xl text-left transition-all active:scale-95"
                  style={{
                    background: selectedZone === zone ? "#7B1C1C" : "#fff",
                    border: `1.5px solid ${selectedZone === zone ? "#7B1C1C" : "#E0D5C5"}`,
                    boxShadow: selectedZone === zone ? "0 4px 16px rgba(123,28,28,0.3)" : "none",
                  }}
                >
                  <div className="text-xl mb-1">{
                    zone === "Salt Lake" ? "🏙" :
                    zone === "South Kolkata" ? "🦁" :
                    zone === "North Kolkata" ? "🎭" :
                    zone === "Central Kolkata" ? "🏛" : "🌿"
                  }</div>
                  <p className="font-semibold text-sm" style={{ color: selectedZone === zone ? "#FBF5E8" : "#3A0A0A", fontFamily: "Poppins" }}>
                    {zone}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fadeInUp">
            <h2 className="font-display text-3xl font-bold mb-1" style={{ color: "#3A0A0A" }}>
              What's your<br/>Pujo style?
            </h2>
            <p className="text-sm mb-6" style={{ color: "#7A6A5A", fontFamily: "Poppins" }}>
              Select all that apply — we'll personalize your route
            </p>

            <div className="grid grid-cols-2 gap-3">
              {preferences.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePref(pref.id)}
                  className="p-4 rounded-2xl text-left transition-all active:scale-95"
                  style={{
                    background: selectedPrefs.includes(pref.id) ? "#7B1C1C" : "#fff",
                    border: `1.5px solid ${selectedPrefs.includes(pref.id) ? "#7B1C1C" : "#E0D5C5"}`,
                    boxShadow: selectedPrefs.includes(pref.id) ? "0 4px 16px rgba(123,28,28,0.3)" : "none",
                  }}
                >
                  <div className="text-2xl mb-2">{pref.icon}</div>
                  <p className="font-semibold text-sm leading-tight" style={{ color: selectedPrefs.includes(pref.id) ? "#FBF5E8" : "#3A0A0A", fontFamily: "Poppins" }}>
                    {pref.label}
                  </p>
                  {selectedPrefs.includes(pref.id) && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#D4940A" }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Hours slider */}
            <div className="mt-6 p-4 rounded-2xl" style={{ background: "#fff", border: "1.5px solid #E0D5C5" }}>
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-sm" style={{ color: "#3A0A0A", fontFamily: "Poppins" }}>How much time do you have?</p>
                <span className="font-mono-data text-sm font-bold" style={{ color: "#7B1C1C" }}>6 hrs</span>
              </div>
              <input type="range" min="2" max="12" defaultValue="6" className="w-full" style={{ "--val": "50%" } as React.CSSProperties} />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#7A6A5A" }}>
                <span>2 hrs</span><span>12 hrs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 pt-4" style={{ borderTop: "1px solid #E0D5C5" }}>
        {loading ? (
          <div className="w-full py-4 rounded-2xl flex items-center justify-center gap-3" style={{ background: "#7B1C1C" }}>
            <div className="w-5 h-5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: "#FBF5E8", borderRightColor: "#FBF5E8" }} />
            <span className="font-semibold text-sm" style={{ color: "#FBF5E8", fontFamily: "Poppins" }}>Generating your route...</span>
          </div>
        ) : (
          <button
            onClick={() => step === "zone" ? setStep("prefs") : handleGenerate()}
            disabled={step === "zone" && !selectedZone}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95 disabled:opacity-40"
            style={{ background: "#7B1C1C", color: "#FBF5E8", fontFamily: "Poppins", boxShadow: "0 4px 16px rgba(123,28,28,0.3)" }}
          >
            {step === "zone" ? "Continue →" : "✨ Generate My Pujo Route"}
          </button>
        )}
        {step === "prefs" && !loading && (
          <button onClick={() => setStep("zone")} className="w-full py-3 mt-2 text-sm font-medium" style={{ color: "#7A6A5A" }}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
