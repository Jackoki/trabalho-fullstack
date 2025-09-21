import { useState, useContext } from "react";
import { Box, TextField, Button, FormHelperText } from "@mui/material";
import { CountriesContext } from "../contexts/CountriesContext";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  mx: 4,
  mt: 6,
  maxWidth: 500,
};

const rowStyle = {
  display: "flex",
  gap: 1,
};

const helperTextStyle = {
  minHeight: "1.5em",
};

function SearchForm() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(CountriesContext);

  // regex que detecta caracteres acentuados comuns em português/espanhol/francês
  const nonEnglishChars = /[à-úÀ-ÚçÇñÑ]/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmed = input.trim();

    if (!trimmed) {
      setError("Campo de pesquisa não pode ser vazio.");
      return;
    }

    // 🔎 Verificação de caracteres não ingleses
    if (nonEnglishChars.test(trimmed)) {
      setError("A pesquisa deve ser feita em inglês (sem acentos).");
      return;
    }

    // Se passou pelas validações, envia para o contexto
    dispatch({ type: "SET_QUERY", payload: trimmed });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
      <Box sx={rowStyle}>
        <TextField
          label="Buscar país (em inglês)"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={!!error}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </Box>

      <FormHelperText sx={helperTextStyle} error>
        {error || " "}
      </FormHelperText>
    </Box>
  );
}

export default SearchForm;
