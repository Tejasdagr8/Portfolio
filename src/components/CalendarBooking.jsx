const CAL_URL = import.meta.env.VITE_CALENDLY_URL || "";

export default function CalendarBooking() {
  if (!CAL_URL) {
    return (
      <div className="card-glass p-5 text-center">
        <p className="font-mono text-[10px] uppercase tracking-wider text-mint mb-2">schedule a chat</p>
        <p className="text-fog text-sm mb-4">Pick a time that works — email me and we&apos;ll set something up.</p>
        <a
          href="mailto:coooltejasdagr@gmail.com?subject=Portfolio%20—%20let's%20chat"
          data-track="calendar_email_fallback"
          className="inline-flex px-5 py-2.5 rounded-full border border-mint/30 text-mint text-sm font-mono hover:bg-mint/[0.06]"
        >
          Email to schedule
        </a>
      </div>
    );
  }

  return (
    <div className="card-glass overflow-hidden">
      <p className="font-mono text-[10px] uppercase tracking-wider text-mint p-4 pb-0">book a call</p>
      <iframe
        src={CAL_URL}
        title="Schedule a call with Tejas"
        className="w-full h-[520px] border-0 bg-white"
        loading="lazy"
      />
    </div>
  );
}
