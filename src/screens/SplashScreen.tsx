import { useEffect, useState } from "react";

interface Props {
  onNext: () => void;
}

export default function SplashScreen({ onNext }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden" style={{ background: "linear-gradient(160deg, #4A0E0E 0%, #7B1C1C 30%, #A02828 60%, #C4622D 85%, #D4940A 100%)" }}>
      {/* Animated mandap lights top */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pt-16">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="animate-mandapGlow" style={{ animationDelay: `${i * 0.3}s` }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#F0B429", boxShadow: "0 0 12px 4px rgba(240,180,41,0.6)" }} />
            <div className="w-px h-8 mx-auto opacity-40" style={{ background: "linear-gradient(to bottom, #F0B429, transparent)" }} />
          </div>
        ))}
      </div>

      {/* Alpana border top */}
      <div className="absolute top-24 left-0 right-0 h-8 opacity-30">
        <svg viewBox="0 0 390 32" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 16 Q24 0 48 16 Q72 32 96 16 Q120 0 144 16 Q168 32 192 16 Q216 0 240 16 Q264 32 288 16 Q312 0 336 16 Q360 32 384 16 Q390 13 390 16" stroke="#F0B429" strokeWidth="2" fill="none"/>
          {[48,96,144,192,240,288,336].map(x => (
            <circle key={x} cx={x} cy="16" r="3" fill="#F0B429" />
          ))}
        </svg>
      </div>

      {/* Central content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8" style={{ marginTop: 60 }}>
        {/* Devi silhouette */}
        <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative animate-float">
            <svg width="180" height="200" viewBox="0 0 180 200">
              {/* Glow */}
              <defs>
                <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F0B429" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#F0B429" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="haloGrad" cx="50%" cy="30%" r="40%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <ellipse cx="90" cy="100" rx="70" ry="90" fill="url(#glowGrad)"/>
              {/* Halo */}
              <circle cx="90" cy="52" r="38" fill="none" stroke="#F0B429" strokeWidth="2" opacity="0.6"/>
              <circle cx="90" cy="52" r="44" fill="none" stroke="#F0B429" strokeWidth="1" opacity="0.3"/>
              {/* Trishul */}
              <line x1="90" y1="15" x2="90" y2="90" stroke="#F0B429" strokeWidth="2.5" opacity="0.9"/>
              <path d="M82 18 Q90 8 98 18" stroke="#F0B429" strokeWidth="2" fill="none" opacity="0.9"/>
              <line x1="84" y1="25" x2="84" y2="35" stroke="#F0B429" strokeWidth="1.5" opacity="0.7"/>
              <line x1="96" y1="25" x2="96" y2="35" stroke="#F0B429" strokeWidth="1.5" opacity="0.7"/>
              {/* Body */}
              <ellipse cx="90" cy="130" rx="28" ry="50" fill="#D4940A" opacity="0.4"/>
              {/* Face */}
              <circle cx="90" cy="75" r="22" fill="#C4622D" opacity="0.6"/>
              {/* Crown */}
              <path d="M68 62 L72 45 L80 58 L90 40 L100 58 L108 45 L112 62" fill="#D4940A" opacity="0.8"/>
              {/* Arms */}
              <line x1="65" y1="105" x2="40" y2="85" stroke="#C4622D" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
              <line x1="65" y1="105" x2="45" y2="125" stroke="#C4622D" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
              <line x1="115" y1="105" x2="140" y2="85" stroke="#C4622D" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
              <line x1="115" y1="105" x2="135" y2="125" stroke="#C4622D" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
              {/* Third eye */}
              <ellipse cx="90" cy="73" rx="4" ry="2.5" fill="#F0B429" opacity="0.9"/>
              {/* Decorative dots */}
              {[30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const r = 55;
                return <circle key={i} cx={90 + r * Math.cos(rad)} cy={52 + r * Math.sin(rad)} r="2" fill="#F0B429" opacity="0.5"/>;
              })}
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className={`text-center mt-4 transition-all duration-700 delay-300 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font--display tracking-widest text-xs font-semibold mb-2" style={{ color: "#F0B429", fontFamily: "Poppins", letterSpacing: "0.3em" }}>
            আসছে বছর আবার হবে
          </p>
          <h1 className="font-display text-5xl font-bold leading-none" style={{ color: "#FBF5E8" }}>
            Pujo<br/>
            <span style={{ color: "#F0B429" }}>Guide</span>
          </h1>
          <div className="alpana-divider mt-3 mx-auto w-48" />
          <p className="mt-3 text-sm font-light tracking-wider" style={{ color: "rgba(251,245,232,0.75)", fontFamily: "Poppins" }}>
            Your complete Durga Puja companion<br/>for Kolkata 2025
          </p>
        </div>

        {/* Feature pills */}
        <div className={`flex flex-wrap justify-center gap-2 mt-6 transition-all duration-700 delay-500 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {["🗺 Smart Routes", "🚇 Metro Guide", "🍜 Food Finder", "🎭 Live Crowd"].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(251,245,232,0.15)", color: "#FBF5E8", border: "1px solid rgba(251,245,232,0.2)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full px-8 pb-12">
        <div className={`transition-all duration-700 delay-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={onNext}
            className="w-full py-4 rounded-2xl font-semibold text-base tracking-wide transition-all active:scale-95"
            style={{ background: "#FBF5E8", color: "#7B1C1C", fontFamily: "Poppins", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
          >
            Begin Your Pandal Hopping Journey
          </button>
          <p className="text-center text-xs mt-3 opacity-50" style={{ color: "#FBF5E8" }}>
            Kolkata Puja 2025 • Oct 9–13
          </p>
        </div>
      </div>

      {/* Bottom alpana border */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none">
        <svg viewBox="0 0 390 64" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 32 Q24 16 48 32 Q72 48 96 32 Q120 16 144 32 Q168 48 192 32 Q216 16 240 32 Q264 48 288 32 Q312 16 336 32 Q360 48 384 32 Q390 29 390 32" stroke="#F0B429" strokeWidth="2" fill="none"/>
          <path d="M0 48 Q24 32 48 48 Q72 64 96 48 Q120 32 144 48 Q168 64 192 48 Q216 32 240 48 Q264 64 288 48 Q312 32 336 48 Q360 64 384 48" stroke="#F0B429" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    </div>
  );
}
