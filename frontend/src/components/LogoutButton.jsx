import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {
  const navigate = useNavigate();

  //Função de ao clicar no botão, o token é removido do localStorage e direciona para a tela de login
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Sair
    </button>
  );
}

export default LogoutButton;
