import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/countries";
    } 
    
    else {
      alert(data.message || "Erro ao fazer login");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom textAlign="center">Login</Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField label="Usuário" name="username" value={form.username} onChange={handleChange} required/>
          <TextField label="Senha" name="password" type="password" value={form.password} onChange={handleChange} required/>
          <Button type="submit" variant="contained" fullWidth>Entrar</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;