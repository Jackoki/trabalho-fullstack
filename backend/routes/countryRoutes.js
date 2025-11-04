import express from "express";
import jwt from "jsonwebtoken";
import { CountryModel } from "../models/CountryModel.js";

const router = express.Router();

// 🛡️ Middleware de autenticação
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

// 🟢 Obter todos os países
router.get("/", authenticateToken, async (req, res) => {
  try {
    const countries = await CountryModel.getAll();
    res.json(countries);
  } catch (error) {
    console.error("Erro ao listar países:", error);
    res.status(500).json({ message: "Erro ao listar países" });
  }
});

// 🟡 Buscar país por nome
router.get("/:name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const country = await CountryModel.getByName(name);

    if (!country)
      return res.status(404).json({ message: "País não encontrado" });

    res.json(country);
  } catch (error) {
    console.error("Erro ao buscar país:", error);
    res.status(500).json({ message: "Erro ao buscar país" });
  }
});

// 🟠 Criar novo país
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
  } catch (error) {
    console.error("Erro ao criar país:", error);
    res.status(500).json({ message: "Erro ao criar país" });
  }
});

// 🔵 Atualizar país por nome
router.put("/:name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const existing = await CountryModel.getByName(name);

    if (!existing)
      return res.status(404).json({ message: "País não encontrado" });

    // Para simplificar, podemos deletar o registro anterior e recriar
    await CountryModel.deleteById(existing.id);
    const newId = await CountryModel.create(req.body);

    res.json({ message: "País atualizado com sucesso", countryId: newId });
  } catch (error) {
    console.error("Erro ao atualizar país:", error);
    res.status(500).json({ message: "Erro ao atualizar país" });
  }
});

// 🔴 Deletar país por ID
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await CountryModel.deleteById(req.params.id);
    res.json({ message: "País excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir país:", error);
    res.status(500).json({ message: "Erro ao excluir país" });
  }
});

export default router;