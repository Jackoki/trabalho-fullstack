import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

// Estilo do card principal 
const boxStyle = {
  width: 300,
  height: 380,
  borderRadius: 2,
  boxShadow: 3,
  display: "flex",
  flexDirection: "column",
};

// Estilo da área da imagem 
const mediaStyle = {
  height: 160,
  objectFit: "contain",
  backgroundColor: "#f9f9f9",
};

// Função utilitária para exibir strings ou arrays 
const formatData = (data) =>
  Array.isArray(data) ? data.join(", ") : data || "Não informado";

// Card que exibe informações de um país 
function CountryCard({ name, region, subregion, capital, languages, currencies, flag }) {
  return (
    <Card sx={boxStyle}>
      
      <CardMedia
        component="img"
        image={flag}
        alt={`Bandeira de ${name}`}
        sx={mediaStyle}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Região: {formatData(region)}
        </Typography>

        {subregion && (
          <Typography variant="body2" color="text.secondary">
            Sub-região: {formatData(subregion)}
          </Typography>
        )}

        {capital && (
          <Typography variant="body2" color="text.secondary">
            Capital: {formatData(capital)}
          </Typography>
        )}

        {languages && (
          <Typography variant="body2" color="text.secondary">
            Línguas: {formatData(languages)}
          </Typography>
        )}

        {currencies && (
          <Typography variant="body2" color="text.secondary">
            Moedas: {formatData(currencies)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

CountryCard.propTypes = {
  name: PropTypes.string.isRequired,
  region: PropTypes.string,
  subregion: PropTypes.string,
  capital: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  languages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  currencies: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  flag: PropTypes.string.isRequired,
};

export default CountryCard;
