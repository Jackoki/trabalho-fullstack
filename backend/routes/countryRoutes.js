import express from "express";
import jwt from "jsonwebtoken";
import { getAllCountries, insertCountry } from "../models/CountryModel.js";

const router = express.Router();

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) 
    return res.sendStatus(401);


  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } 
  
  catch {
    res.sendStatus(403);
  }
}

router.get("/", authenticateToken, async (req, res) => {
  const countries = await getAllCountries();
  res.json(countries);
});

router.post("/", authenticateToken, async (req, res) => {
  const { name, population, capital } = req.body;
  await insertCountry({ name, population, capital });
  res.json({ message: "País inserido com sucesso!" });
});

export default router;
