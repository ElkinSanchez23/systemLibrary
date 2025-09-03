import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState("/Panel");
  const links = [
    { to: "/Panel", label: "Panel" },
    { to: "/Gestion-libros", label: "Gestión de Libros" },
    { to: "/Prestamos", label: "Préstamos" },
    { to: "/Usuarios", label: "Usuarios" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="icon">▢</span>
        <h2>System Library</h2>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <button
            key={link.to}
            className={`nav-link ${active === link.to ? "active" : ""}`}
            onClick={() => setActive(link.to)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
