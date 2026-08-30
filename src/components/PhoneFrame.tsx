import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #2d1010 50%, #1a0a0a 100%)" }}>
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4940A, transparent)" }} />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7B1C1C, transparent)" }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #C4622D, transparent)" }} />
        {/* Alpana decorative corners */}
        <svg className="absolute top-8 left-8 opacity-20" width="80" height="80" viewBox="0 0 80 80">
          <path d="M0 40 Q20 0 40 40 Q60 80 80 40" stroke="#D4940A" strokeWidth="1.5" fill="none" />
          <path d="M40 0 Q80 20 40 40 Q0 60 40 80" stroke="#D4940A" strokeWidth="1.5" fill="none" />
          <circle cx="40" cy="40" r="6" fill="none" stroke="#D4940A" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-8 right-8 opacity-20 rotate-180" width="80" height="80" viewBox="0 0 80 80">
          <path d="M0 40 Q20 0 40 40 Q60 80 80 40" stroke="#D4940A" strokeWidth="1.5" fill="none" />
          <path d="M40 0 Q80 20 40 40 Q0 60 40 80" stroke="#D4940A" strokeWidth="1.5" fill="none" />
          <circle cx="40" cy="40" r="6" fill="none" stroke="#D4940A" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Phone frame */}
      <div
        className="relative"
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          background: "#1a1a1a",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
          padding: 12,
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 34,
            background: "#000",
            borderRadius: 20,
            zIndex: 100,
          }}
        />

        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 38,
            width: "100%",
            height: "100%",
            background: "#FBF5E8",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
