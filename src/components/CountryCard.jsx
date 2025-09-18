import { Card, CardContent, CardMedia, Typography } from "@mui/material";

  function CountryCard({ name, region, subregion, capital, languages, currencies, flag }) {    
    const boxStyle = {
      width: 300,
      height: 380,
      borderRadius: 2,
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
    };

    const mediaStyle = {
      height: 160,
      objectFit: "contain",
      backgroundColor: "#f9f9f9",
    };


  return (
    <Card sx={boxStyle}>
      <CardMedia component="img" image={flag} alt={`Bandeira ${name}`} sx={mediaStyle}/>

      <CardContent sx={{ flexGrow: 1 }}>

      <Typography gutterBottom variant="h6" component="div">
        {name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Região: {region}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Sub-região: {subregion}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Capital: {capital}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Línguas: {languages}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Moeda: {currencies}
      </Typography>
      </CardContent>
    </Card>

  );
}

export default CountryCard;
