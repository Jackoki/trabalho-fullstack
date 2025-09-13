import React from "react";
import { Container, Typography } from "@mui/material";
import Home from "./components/Home";

function App() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" sx={{ marginTop: 4 }}>
        🌍 Busca de Países
      </Typography>
      <Home />
    </Container>
  );
}

export default App;
