import { useEffect, useState } from "react";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
import CountryCard from "./CountryCard";

function CountryList({ query }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const url = query && query.trim() !== "" ? `https://restcountries.com/v3.1/name/${query}?fields=name,region,subregion,capital,languages,currencies,flags` : `https://restcountries.com/v3.1/all?fields=name,region,subregion,capital,languages,currencies,flags`;

    fetch(url)
      .then((res) => {
        if (!res.ok) 
          throw new Error("País não encontrado");

        return res.json();
      })

      .then((data) => {
        const formatted = data.map((c) => ({
          name: c.name.common,
          region: c.region,
          subregion: c.subregion,
          capital: c.capital ? c.capital[0] : "—",
          languages: c.languages ? Object.values(c.languages).join(", ") : "—",
          currencies: c.currencies ? Object.values(c.currencies).map(cur => cur.name).join(", ") : "—",
          flag: c.flags.png,
        }));
        
        formatted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

        setCountries(formatted);
        setLoading(false);
      })

      .catch((err) => {
        setCountries([]);
        setLoading(false);
      });
  }, [query]);


  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Carregando países...</Typography>
      </Container>
    );
  }

  if (countries.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography>Nenhum país encontrado.</Typography>
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
