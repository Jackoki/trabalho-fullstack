import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";

function CountryCard({ name, region, flag }) {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="160"
        image={flag}
        alt={`Bandeira de ${name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Região: {region}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Detalhes</Button>
      </CardActions>
    </Card>
  );
}

export default CountryCard;
