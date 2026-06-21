import { useAdmin } from "../../context/AdminContext";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const { admin } = useAdmin();

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;