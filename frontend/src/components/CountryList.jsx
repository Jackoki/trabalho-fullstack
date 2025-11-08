import { Card, CardContent, CardMedia, Typography } from "@mui/material";

// Estilos do card principal. Define tamanho, sombra e organização interna.
const boxStyle = {
  width: 300,
  height: 380,
  borderRadius: 2,
  boxShadow: 3,
  display: "flex",
  flexDirection: "column",
};

// Estilos da área da imagem. Mantém proporções sem distorcer e adiciona fundo neutro.
const mediaStyle = {
  height: 160,
  objectFit: "contain",
  backgroundColor: "#f9f9f9",
};

// Componente que exibe um país em formato de card. Recebe informações por props e renderiza de forma amigável.
function CountryCard({ name, region, subregion, capital, languages, currencies, flag }) {
  return (
    <Card sx={boxStyle}>
      
      {/* Exibição da bandeira */}
      <CardMedia
        component="img"
        image={flag}
        alt={`Bandeira de ${name}`}
        sx={mediaStyle}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        
        {/* Nome do país */}
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>

        {/* Região principal */}
        <Typography variant="body2" color="text.secondary">
          Região: {region}
        </Typography>

        {/* Sub-região (opcional) */}
        {subregion && (
          <Typography variant="body2" color="text.secondary">
            Sub-região: {subregion}
          </Typography>
        )}

        {/* Capital (aceita string ou lista) */}
        {capital && (
          <Typography variant="body2" color="text.secondary">
            Capital: {Array.isArray(capital) ? capital.join(", ") : capital}
          </Typography>
        )}

        {/* Línguas (aceita string ou lista) */}
        {languages && (
          <Typography variant="body2" color="text.secondary">
            Línguas: {Array.isArray(languages) ? languages.join(", ") : languages}
          </Typography>
        )}

        {/* Moedas (aceita string ou lista) */}
        {currencies && (
          <Typography variant="body2" color="text.secondary">
            Moedas: {Array.isArray(currencies) ? currencies.join(", ") : currencies}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default CountryCard;
