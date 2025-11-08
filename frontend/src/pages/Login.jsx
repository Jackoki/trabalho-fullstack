import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";

// Tela de Login Realiza autenticação chamando o backend e salva o token no contexto.
function Login() {
  const { login } = useContext(AuthContext);

  // Estado do formulário
  const [form, setForm] = useState({ username: "", password: "" });

  // Controle de erro e loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Foca automaticamente no campo de usuário ao abrir a tela
  useEffect(() => {
    document.querySelector('input[name="username"]')?.focus();
  }, []);

  // Atualiza o formulário conforme o usuário digita. Também limpa mensagens de erro para não ficar exibindo alert à toa.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Envia os dados para o backend e realiza login.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:443/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token);
        window.location.href = "/countries"; // Redireciona após login
      } else {
        setError(data.message || "Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor. Verifique se o backend está rodando.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Login
        </Typography>

        {/* Exibe mensagem de erro quando existir */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          <TextField
            label="Usuário"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <TextField
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
