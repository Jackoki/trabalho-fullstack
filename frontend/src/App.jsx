import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CountriesProvider } from "./contexts/CountriesContext";

// Páginas e componentes
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";
import AddCountry from "./pages/AddCountry";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";

function App() {
  return (
    // Contexto de autenticação disponível para toda a aplicação
    <AuthProvider>
      <BrowserRouter>
        {/* Contexto de países disponível apenas dentro das rotas protegidas */}
        <CountriesProvider>
          <Routes>

            {/* Login como rota inicial */}
            <Route path="/" element={<Login />} />

            {/* Lista de países + barra de busca, apenas se autenticado */}
            <Route
              path="/countries"
              element={
                <ProtectedRoute>
                  <div style={{ padding: "16px" }}>
                    <LogoutButton />
                    <SearchForm />
                    <CountryList />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Página de inserção de novo país, protegida */}
            <Route
              path="/add-country"
              element={
                <ProtectedRoute>
                  <div style={{ padding: "16px" }}>
                    <LogoutButton />
                    <AddCountry />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Qualquer rota desconhecida redireciona dinamicamente */}
            <Route
              path="*"
              element={
                <Navigate
                  to={localStorage.getItem("token") ? "/countries" : "/"}
                  replace
                />
              }
            />
          </Routes>
        </CountriesProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
