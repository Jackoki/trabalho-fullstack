import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("O campo de busca não pode estar vazio.");
      return;
    }
    setError("");
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        mb: 3,
      }}
    >
      <TextField
        label="Buscar país"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button type="submit" variant="contained" color="primary">
        Buscar
      </Button>
    </Box>
  );
}

export default SearchForm;
