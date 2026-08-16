export default function OpenToWorkBanner({ localTime = "" }) {
  return (
    <aside
      className="hero-open-banner hidden sm:block"
      aria-label="Open to AI/ML and software engineering opportunities in Bengaluru"
    >
      <div className="hero-open-banner-inner">
        <p className="hero-open-banner-kicker">
          <span className="hero-open-banner-dot status-pulse" aria-hidden />
          Open to opportunities
        </p>
        <p className="hero-open-banner-title">AI/ML & SDE roles</p>
        <p className="hero-open-banner-meta">
          Bengaluru
          {localTime ? (
            <>
              {" "}
              · <span className="tabular-nums">{localTime}</span> IST
            </>
          ) : (
            " · India"
          )}
        </p>
      </div>
    </aside>
  );
}
