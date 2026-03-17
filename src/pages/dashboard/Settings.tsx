const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8 relative">
        {/* Glow blur background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(var(--color-primary-rgb, 99,102,241), 0.18) 0%, transparent 70%)",
            filter: "blur(8px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Icon với pulse ring */}
        <span
          className="relative flex items-center justify-center w-12 h-12 text-2xl border rounded-xl bg-primary/20 border-primary shadow-neon"
          style={{ zIndex: 1 }}
        >
          {/* Animated ring */}
          <span
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "0.85rem",
              border: "1.5px solid rgba(99,102,241,0.45)",
              animation: "settingsPulse 2.4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: -7,
              borderRadius: "1.1rem",
              border: "1px solid rgba(99,102,241,0.18)",
              animation: "settingsPulse 2.4s ease-in-out infinite 0.5s",
              pointerEvents: "none",
            }}
          />
          ⚙️
        </span>

        {/* Text với fade-in slide */}
        <div style={{ zIndex: 1 }}>
          <h1
            className="text-3xl font-bold text-text-light"
            style={{
              animation: "settingsFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            Cài đặt hệ thống
          </h1>
          <p
            className="text-text-muted"
            style={{
              animation:
                "settingsFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
            }}
          >
            Tùy chỉnh trải nghiệm và bảo mật tài khoản
          </p>
        </div>

        <style>{`
          @keyframes settingsPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.06); }
          }
          @keyframes settingsFadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};
export default Settings;