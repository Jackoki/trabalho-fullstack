import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {
  const navigate = useNavigate();

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
