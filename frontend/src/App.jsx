import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa o provider do contexto de países
import { CountriesProvider } from "./contexts/CountriesContext";

// Importa os componentes da aplicação
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";
import AddCountry from "./pages/AddCountry";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <CountriesProvider>
        
        <Routes>
          {/* Página principal: busca e lista */}
          <Route
            path="/"
            element={
              <>
                <SearchForm />
                <CountryList />
              </>
            }
          />

          {/* Página de Login */}
          <Route path="/login" element={<Login />} />

          {/* Página para adicionar país */}
          <Route path="/add-country" element={<AddCountry />} />
        </Routes>
        
      </CountriesProvider>
    </BrowserRouter>
  );
}

export default App;