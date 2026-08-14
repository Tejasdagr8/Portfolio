import profile from "../assets/profile.jpeg";

export default function ProfileAvatar({ className = "", size = "lg" }) {
  const frame =
    size === "sm"
      ? "w-24 h-24"
      : "w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52";
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-iris to-mint blur-2xl opacity-25 scale-110 pointer-events-none"
        aria-hidden="true"
      />
      <div className={`relative ${frame} rounded-full p-[2px] bg-gradient-to-br from-iris/50 via-white/10 to-mint/50 shadow-[0_0_40px_rgba(140,123,255,0.15)]`}>
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0B0E16]">
          <img
            src={profile}
            alt="Tejas Melkote — AI/ML Engineer"
            className="absolute inset-0 w-full h-full object-cover object-[50%_38%] scale-[1.06]"
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, transparent 55%, rgba(11,14,22,0.25) 78%, rgba(11,14,22,0.75) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/[0.08] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
