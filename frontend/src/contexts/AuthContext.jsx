import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// AuthProvider:  Gerencia o estado global de autenticação. Armazena o token localmente (localStorage) para persistência entre recargas.
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Realiza login armazenando o token.
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Realiza logout: Informa o backend para invalidar o token (blacklist) Remove o token localmente
  const logout = async () => {
    try {
      if (token) {
        await fetch("http://localhost:443/api/users/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      // Não impede o logout mesmo se a requisição falhar.
    }

    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Prov
