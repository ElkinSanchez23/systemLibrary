import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { to: "/Panel", label: "Panel" },
    { to: "/", label: "Gestión de Libros" },
    { to: "/Prestamos", label: "Préstamos" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="icon">▢</span>
        <h2>System Library</h2>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
