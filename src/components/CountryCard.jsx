import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// Importa os componentes prontos do Material UI usados para construir o card

// Estilos do container principal do card
const boxStyle = {
  width: 300,            // largura fixa de 300px
  height: 380,           // altura fixa de 380px
  borderRadius: 2,       // cantos arredondados
  boxShadow: 3,          // sombra para dar destaque
  display: "flex",       // usa flexbox
  flexDirection: "column", // organiza os elementos na vertical
};

// Estilos da imagem da bandeira
const mediaStyle = {
  height: 160,            // altura fixa da área da imagem
  objectFit: "contain",   // garante que a imagem caiba sem ser cortada
  backgroundColor: "#f9f9f9", // fundo claro atrás da bandeira
};

// Componente que representa um card de país
function CountryCard({ name, region, subregion, capital, languages, currencies, flag }) {
  return (
    <Card sx={boxStyle}> 
      {/* Card principal com os estilos aplicados */}

      <CardMedia
        component="img"        // define que será uma imagem
        image={flag}           // URL da bandeira recebida como prop
        alt={`Bandeira ${name}`} // texto alternativo para acessibilidade
        sx={mediaStyle}        // aplica os estilos da imagem
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Área de conteúdo do card (nome, região, capital, etc.) */}

        <Typography gutterBottom variant="h6" component="div">
          {name} {/* Nome do país em destaque */}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Região: {region} {/* Região do país (ex: Europe) */}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Sub-região: {subregion} {/* Sub-região (ex: South America) */}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Capital: {capital} {/* Nome da capital */}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Línguas: {languages} {/* Lista das línguas oficiais */}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Moeda: {currencies} {/* Nome(s) da(s) moeda(s) */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CountryCard; 
// Exporta o componente para que seja usado em outros arquivos


