import { Navigate } from "react-router-dom";

//Função utilizada para resgatar o token e 
//se o mesmo estiver vazio, será direcionado para a tela de login
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />; 
  }

  return children;
}