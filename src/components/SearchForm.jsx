import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (onSearch) {
        onSearch(query.trim());
      } 

  };

  const boxStyle = {
    display: "flex",
    gap: 2,
    alignItems: "center",
    mb: 3,
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={boxStyle}>
      <TextField label="Buscar país" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} error={!!error} helperText={error}/>
      <Button type="submit" variant="contained" color="primary">Buscar</Button>
    </Box>
  );
}

export default SearchForm;
