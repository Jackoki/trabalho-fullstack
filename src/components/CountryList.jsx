import { useEffect, useContext } from "react";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
import CountryCard from "./CountryCard";
import { CountriesContext } from "../contexts/CountriesContext";

function CountryList() {
  const { state, dispatch } = useContext(CountriesContext);
  const { query, countries, loading, error } = state;

  useEffect(() => {
    const fetchCountries = async () => {
      dispatch({ type: "SET_LOADING" });

      try {
        // sempre busca todos (garante que temos todos os campos para filtrar)
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,region,subregion,capital,languages,currencies,flags"
        );

        if (!res.ok) throw new Error("Erro ao carregar países");

        const data = await res.json();

        const formatted = data.map((c) => ({
          name: c.name.common, // nome oficial em inglês
          region: c.region,
          subregion: c.subregion,
          capital: c.capital ? c.capital[0] : "—",
          languages: c.languages ? Object.values(c.languages) : [],
          currencies: c.currencies
            ? Object.values(c.currencies).map((cur) => cur.name)
            : [],
          flag: c.flags.png,
        }));

        let results = formatted;

        if (query && query.trim() !== "") {
          const q = query.toLowerCase();

          // procura em todos os campos relevantes
          results = formatted.filter(
            (c) =>
              c.name.toLowerCase() === q ||
              c.region?.toLowerCase() === q ||
              c.subregion?.toLowerCase() === q ||
              c.capital?.toLowerCase() === q ||
              c.languages.some((lang) => lang.toLowerCase() === q) ||
              c.currencies.some((cur) => cur.toLowerCase() === q)
          );

          if (results.length === 0) {
            dispatch({
              type: "SET_ERROR",
              payload:
                "A pesquisa deve ser feita em inglês ou não há resultados.",
            });
            return;
          }
        }

        // ordenar por nome
        results.sort((a, b) => a.name.localeCompare(b.name, "en-US"));

        dispatch({ type: "SET_COUNTRIES", payload: results });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    fetchCountries();
  }, [query, dispatch]);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Carregando países...</Typography>
      </Container>
    );
  }

  if (error || countries.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography>{error || "Nenhum país encontrado."}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Países
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {countries.map((country, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CountryCard {...country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CountryList;
