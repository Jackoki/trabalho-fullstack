import React, { useState } from "react";
import { Container } from "@mui/material";
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";

function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery.toLowerCase());
  };

  return (
    <Container sx={{ py: 4 }}>
      <SearchForm onSearch={handleSearch} />
      <CountryList query={query} />
    </Container>
  );
}

export default App;
