import { useEffect, useContext } from "react";
import { Grid, Container, Typography, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import { CountriesContext } from "../contexts/CountriesContext";
import { AuthContext } from "../contexts/AuthContext";

function CountryList() {

  //Uso de UseContext para resgatar as informações da API e inserir no componente
  const { state, dispatch } = useContext(CountriesContext);
  const { token } = useContext(AuthContext);
  const { query, countries, loading, error } = state;

  useEffect(() => {
    const fetchCountries = async () => {
      dispatch({ type: "SET_LOADING" });

      //Chamado da função de resgatar os países do banco de dados pelo backend
      try {
        const res = await fetch("http://localhost:443/api/countries", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) 
          throw new Error("Erro ao carregar países");

        const data = await res.json();

        //Preenche as informações pelo JSON do backend
        const formatted = data.map((c) => ({
          name: c.name,
          region: c.region,
          subregion: c.subregion || "—",
          capital: c.capitals?.length ? c.capitals[0] : "—",
          languages: c.languages || [],
          currencies: c.currencies || [],
          flag: c.flag || "",
        }));

        let results = formatted;

        if (query && query.trim() !== "") {
          const q = query.toLowerCase();
          results = formatted.filter(
            (c) =>
              c.name.toLowerCase().includes(q)
          );
        }

        //Retorno das informações em ordem alfabetica
        results.sort((a, b) => a.name.localeCompare(b.name));

        dispatch({ type: "SET_COUNTRIES", payload: results });
      } 
      
      catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    if (token) 
      fetchCountries();
  }, [query, dispatch, token]);

  //Enquanto estiver carregando, será carregado um componente falando que está carregando
  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Carregando países...</Typography>
      </Container>
    );
  }

  //Se nenhum país for encontrado ou der erro, será retornado que nenhum país foi encontrado
  if (error || countries.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography>{error || "Nenhum país encontrado."}</Typography>
      </Container>
    );
  }

  //Chamada dos botões e os cards
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Países
      </Typography>

      <Button variant="contained" component={Link} to="/add-country" sx={{ mb: 3 }}>
        Adicionar Novo País
      </Button>

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