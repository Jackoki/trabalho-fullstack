import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import CountryCard from "./CountryCard";

function CountryList() {
  // Dados fictícios para teste
  const countries = [
    { name: "Brasil", region: "América do Sul", flag: "https://flagcdn.com/w320/br.png" },
    { name: "Japão", region: "Ásia", flag: "https://flagcdn.com/w320/jp.png" },
    { name: "Alemanha", region: "Europa", flag: "https://flagcdn.com/w320/de.png" },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Países
      </Typography>
      <Grid container spacing={3}>
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
