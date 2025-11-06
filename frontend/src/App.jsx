import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CountriesProvider } from "./contexts/CountriesContext";

import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";
import AddCountry from "./pages/AddCountry";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <CountriesProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/countries" element={
              <ProtectedRoute>
                <>
                  <LogoutButton />
                  <SearchForm />
                  <CountryList />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="/add-country" element={
              <ProtectedRoute>
                <>
                  <LogoutButton />
                  <AddCountry />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={isLoggedIn ? (<Navigate to="/countries" replace />) : (<Navigate to="/" replace />)}/>
        </Routes>
      </CountriesProvider>
    </BrowserRouter>
  );
}

export default App;
