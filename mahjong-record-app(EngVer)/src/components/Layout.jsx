import { NavLink } from "react-router-dom";

function Layout({ title, children }) {
  return (
    <div className="app">
      <header className="page-header">
        <h1>{title}</h1>
        <p>Mahjong win / loss tracker dashboard</p>
      </header>

      <nav className="top-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Dashboard
        </NavLink>
        <NavLink
          to="/year-summary"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Year Summary
        </NavLink>
        <NavLink
          to="/month-summary"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Month Summary
        </NavLink>
        <NavLink
          to="/records"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Records
        </NavLink>
      </nav>

      {children}
    </div>
  );
}

export default Layout;