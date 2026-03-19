import { NavLink } from "react-router-dom";

function Layout({ title, children }) {
  return (
    <div className="app">
      <header className="page-header">
        <h1>{title}</h1>
        <p>麻雀輸贏紀錄</p>
      </header>

      <nav className="top-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Dashboard
        </NavLink>
        <NavLink
          to="/year-summary"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          年份總結
        </NavLink>
        <NavLink
          to="/month-summary"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          月份總結
        </NavLink>
        <NavLink
          to="/records"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          記錄
        </NavLink>
      </nav>

      {children}
    </div>
  );
}

export default Layout;