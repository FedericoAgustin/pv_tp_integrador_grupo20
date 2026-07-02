import { useAdmin } from "../../context/AdminContext";

const Header = () => {
  const { admin, cerrarSesion } = useAdmin();

  const manejarCerrarSesion = () => {
    cerrarSesion();
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <h3 className="m-0">Panel de Administración</h3>

      {admin && (
        <div className="d-flex align-items-center gap-3">
          <span>{admin.nombre} — {admin.sector}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;