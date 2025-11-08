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
  //Função de pesquisa do qual usa um hook para verificar o que é escrito no formulário
  //Se ele estiver vazio na hora de pesquisar, retornará o erro de campo de pesquisa não pode ser vazio
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(CountriesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmed = input.trim();

    if (!trimmed) {
      setError("Campo de pesquisa não pode ser vazio.");
      return;
    }

    dispatch({ type: "SET_QUERY", payload: trimmed });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
      <Box sx={rowStyle}>
        <TextField label="Buscar país" variant="outlined" value={input} onChange={(e) => setInput(e.target.value)} error={!!error} fullWidth/>
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
