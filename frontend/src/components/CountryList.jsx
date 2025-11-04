import { useEffect, useContext } from "react";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
import CountryCard from "./CountryCard";
import { CountriesContext } from "../contexts/CountriesContext";

function CountryList() {
  // Pega o estado global e a função dispatch do contexto
  const { state, dispatch } = useContext(CountriesContext);
  // Extrai variáveis do estado (query: termo pesquisado, countries: lista filtrada, etc.)
  const { query, countries, loading, error } = state;

  useEffect(() => {
    // Função assíncrona para buscar os países
    const fetchCountries = async () => {
      dispatch({ type: "SET_LOADING" }); // muda o estado para carregando

      try {
        // Sempre busca todos os países, garantindo que temos os campos necessários para filtrar
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,region,subregion,capital,languages,currencies,flags"
        );

        if (!res.ok) throw new Error("Erro ao carregar países");

        const data = await res.json();

        // Formata os dados da API para facilitar o uso no app
        const formatted = data.map((c) => ({
          name: c.name.common, // nome oficial em inglês
          region: c.region,
          subregion: c.subregion,
          capital: c.capital ? c.capital[0] : "—", // pega apenas a primeira capital (alguns países têm várias)
          languages: c.languages ? Object.values(c.languages) : [], // transforma objeto em lista
          currencies: c.currencies
            ? Object.values(c.currencies).map((cur) => cur.name) // extrai apenas o nome das moedas
            : [],
          flag: c.flags.png, // link da bandeira
        }));

        let results = formatted;

        // Se houver query, aplica filtros
        if (query && query.trim() !== "") {
          const q = query.toLowerCase();

          // Filtra países comparando a query com:
          // - nome oficial
          // - região
          // - sub-região
          // - capital
          // - línguas
          // - moedas
          results = formatted.filter(
            (c) =>
              c.name.toLowerCase() === q ||
              c.region?.toLowerCase() === q ||
              c.subregion?.toLowerCase() === q ||
              c.capital?.toLowerCase() === q ||
              c.languages.some((lang) => lang.toLowerCase() === q) ||
              c.currencies.some((cur) => cur.toLowerCase() === q)
          );

          // Se não houver resultados, exibe erro
          if (results.length === 0) {
            dispatch({
              type: "SET_ERROR",
              payload:
                "A pesquisa deve ser feita em inglês ou não há resultados.",
            });
            return;
          }
        }

        // Ordena a lista alfabeticamente pelo nome em inglês
        results.sort((a, b) => a.name.localeCompare(b.name, "en-US"));

        // Atualiza o estado global com a lista filtrada/ordenada
        dispatch({ type: "SET_COUNTRIES", payload: results });
      } catch (err) {
        // Em caso de erro na requisição ou processamento
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    fetchCountries(); // executa a função de busca
  }, [query, dispatch]); // reexecuta sempre que a query mudar

  // Renderização condicional
  if (loading) {
    // Mostra indicador de carregamento
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Carregando países...</Typography>
      </Container>
    );
  }

  if (error || countries.length === 0) {
    // Mostra mensagem de erro ou aviso de lista vazia
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography>{error || "Nenhum país encontrado."}</Typography>
      </Container>
    );
  }

  // Caso normal: exibe a lista de países
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Países
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Itera sobre os países e renderiza um CountryCard para cada */}
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
