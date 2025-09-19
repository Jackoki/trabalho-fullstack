import { CountriesProvider } from "./contexts/CountriesContext";
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";

function App() {
  return (
    <CountriesProvider>
      <SearchForm />
      <CountryList />
    </CountriesProvider>
  );
}

export default App;
