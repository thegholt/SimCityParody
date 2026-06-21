export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">
          🏛️
        </span>
        <div className="topbar__titles">
          <span className="topbar__title">JimCity</span>
          <span className="topbar__tagline topbar__tagline--full">
            Your Labour MP's budget for Dartford
          </span>
          <span className="topbar__tagline topbar__tagline--mobile">
            <span>Your MP's budget</span>
            <span>for Dartford</span>
          </span>
        </div>
      </div>
    </header>
  )
}
