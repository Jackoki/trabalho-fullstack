import express from "express";
import { CountryModel } from "../models/CountryModel.js";
import { authenticateToken } from "../config/authMiddleware.js";


const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const countries = await CountryModel.getAll();
    res.json(countries);
  } 
  
  catch (error) {
    console.error("Erro ao listar países:", error);
    res.status(500).json({ message: "Erro ao listar países" });
  }
});

router.get("/:name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const country = await CountryModel.getByName(name);

    if (!country)
      return res.status(404).json({ message: "País não encontrado" });

    res.json(country);
  } 
  
  catch (error) {
    console.error("Erro ao buscar país:", error);
    res.status(500).json({ message: "Erro ao buscar país" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, region, subregion, flag, capitals, languages, currencies } = req.body;

    if (!name || !region)
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });

    const countryId = await CountryModel.create({
      name,
      region,
      subregion,
      flag,
      capitals,
      languages,
      currencies,
    });

    res.status(201).json({
      message: "País criado com sucesso!",
      countryId,
    });
  } 
  
  catch (error) {
    console.error("Erro ao criar país:", error);
    res.status(500).json({ message: "Erro ao criar país" });
  }
});

export default router;