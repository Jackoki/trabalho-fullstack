import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddCountry() {
  const navigate = useNavigate();

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

    const token = localStorage.getItem("token");

    const body = {
      name: form.name,
      region: form.region,
      subregion: form.subregion,
      flag: form.flag,
      capitals: form.capitals.split(",").map((c) => c.trim()),
      languages: form.languages.split(",").map((l) => l.trim()),
      currencies: form.currencies.split(",").map((c) => c.trim()),
    };

    const res = await fetch("http://localhost:4000/api/countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("País inserido com sucesso!");
      navigate("/countries");
    } 
    
    else {
      alert("Erro ao inserir país");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Inserir Novo País
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          <TextField label="Nome" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Região" name="region" value={form.region} onChange={handleChange} required />
          <TextField label="Sub-região" name="subregion" value={form.subregion} onChange={handleChange} />
          <TextField label="URL da Bandeira (PNG)" name="flag" value={form.flag} onChange={handleChange} />
          <TextField label="Capitais (separe por vírgula)" name="capitals" value={form.capitals} onChange={handleChange}/>
          <TextField label="Línguas (separe por vírgula)" name="languages" value={form.languages} onChange={handleChange}/>
          <TextField label="Moedas (separe por vírgula)" name="currencies" value={form.currencies} onChange={handleChange}/>

          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate("/countries")}>
              Voltar
            </Button>

            <Button variant="contained" type="submit">
              Salvar País
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddCountry;