import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const guardado = localStorage.getItem("admin_sesion");
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() =>{
    if (admin) {
      localStorage.setItem("admin_sesion", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin_sesion");
    }
  }, [admin]);
    
  const iniciarSesion = (nombre, sector) => {
      setAdmin({ nombre, sector });
    };

  const cerrarSesion = () => {
      setAdmin(null); 
      localStorage.removeItem("admin_sesion");
    };

    return (
    <AdminContext.Provider value={{ admin, iniciarSesion, cerrarSesion }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};