export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">
          🏛️
        </span>
        <div className="topbar__titles">
          <span className="topbar__title">JimCity</span>
          <span className="topbar__tagline">Jim's budget for Dartford</span>
        </div>
      </div>
    </header>
  )
}
