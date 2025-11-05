import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function AddCountry() {
  const [form, setForm] = useState({
    name: "",
    region: "",
    subregion: "",
    flag: "",
    capitals: "",
    languages: "",
    currencies: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // token do login

    const body = {
      name: form.name,
      region: form.region,
      subregion: form.subregion,
      flag: form.flag,
      capitals: form.capitals.split(",").map((c) => c.trim()),
      languages: form.languages.split(",").map((l) => l.trim()),
      currencies: form.currencies.split(",").map((c) => c.trim()),
    };

    const res = await fetch("http://localhost:3000/countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("País inserido com sucesso!");
      window.location.href = "/"; // redireciona para a lista
    } else {
      alert("Erro ao inserir país");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Inserir Novo País
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField label="Nome" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Região" name="region" value={form.region} onChange={handleChange} required />
          <TextField label="Sub-região" name="subregion" value={form.subregion} onChange={handleChange} />
          <TextField label="URL da Bandeira (PNG)" name="flag" value={form.flag} onChange={handleChange} />

          <TextField
            label="Capitais (separe por vírgula)"
            name="capitals"
            value={form.capitals}
            onChange={handleChange}
          />

          <TextField
            label="Línguas (separe por vírgula)"
            name="languages"
            value={form.languages}
            onChange={handleChange}
          />

          <TextField
            label="Moedas (separe por vírgula)"
            name="currencies"
            value={form.currencies}
            onChange={handleChange}
          />

          <Button variant="contained" type="submit">
            Salvar País
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddCountry;
