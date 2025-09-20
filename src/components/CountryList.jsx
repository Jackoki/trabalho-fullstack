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

      const url =
        query && query.trim() !== ""
          ? `https://restcountries.com/v3.1/name/${query}?fields=name,region,subregion,capital,languages,currencies,flags`
          : "https://restcountries.com/v3.1/all?fields=name,region,subregion,capital,languages,currencies,flags";

      try {
        const res = await fetch(url);

        if (!res.ok) throw new Error("País não encontrado");

        const data = await res.json();

        // Formatar países
        const formatted = data.map((c) => ({
          name: c.name.common, // nome oficial em inglês
          region: c.region,
          subregion: c.subregion,
          capital: c.capital ? c.capital[0] : "—",
          languages: c.languages ? Object.values(c.languages).join(", ") : "—",
          currencies: c.currencies
            ? Object.values(c.currencies)
                .map((cur) => cur.name)
                .join(", ")
            : "—",
          flag: c.flags.png,
        }));

        // 🔎 Validação extra: só aceita se a query bater com o nome em inglês
        if (query && query.trim() !== "") {
          const match = formatted.find(
            (c) => c.name.toLowerCase() === query.toLowerCase()
          );

          if (!match) {
            dispatch({
              type: "SET_ERROR",
              payload: "A pesquisa deve ser feita em inglês.",
            });
            return;
          }

          // mantém só o país correspondente
          dispatch({ type: "SET_COUNTRIES", payload: [match] });
        } else {
          // sem query → retorna todos
          formatted.sort((a, b) => a.name.localeCompare(b.name, "en-US"));
          dispatch({ type: "SET_COUNTRIES", payload: formatted });
        }
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


