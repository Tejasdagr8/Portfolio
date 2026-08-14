import profile from "../assets/profile.jpeg";

export default function ProfileAvatar({ className = "", size = "lg" }) {
  const frame =
    size === "sm"
      ? "w-28 aspect-[3/4]"
      : "w-36 sm:w-44 md:w-52 aspect-[3/4]";

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-iris to-mint blur-2xl opacity-20 scale-105 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className={`relative ${frame} rounded-2xl p-[2px] bg-gradient-to-br from-iris/50 via-white/10 to-mint/50 shadow-[0_0_40px_rgba(140,123,255,0.12)]`}
      >
        <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#0B0E16]">
          <img
            src={profile}
            alt="Tejas Melkote — AI/ML Engineer"
            className="w-full h-full object-contain object-center"
          />
          <div
            className="absolute inset-0 rounded-[14px] pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(11,14,22,0.45) 0%, transparent 28%), linear-gradient(to bottom, rgba(11,14,22,0.2) 0%, transparent 18%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 rounded-[14px] ring-1 ring-inset ring-white/[0.08] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
