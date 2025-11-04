// Importa o provider do contexto de países
import { CountriesProvider } from "./contexts/CountriesContext";

// Importa os componentes da aplicação
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";

// Componente principal da aplicação
function App() {
  return (
    // Envolve os componentes filhos com o provider do contexto
    // Isso permite que SearchForm e CountryList acessem o estado e dispatch do contexto
    <CountriesProvider>
      {/* Componente de formulário de busca de países */}
      <SearchForm />

      {/* Componente que lista os países retornados da pesquisa */}
      <CountryList />
    </CountriesProvider>
  );
}

// Exporta o componente App como padrão
export default App;
