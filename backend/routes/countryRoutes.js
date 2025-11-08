import express from "express";
import { body, validationResult } from "express-validator";
import { CountryModel } from "../models/CountryModel.js";
import { authenticateToken } from "../config/authMiddleware.js";
import { LogModel } from "../models/LogModel.js";

const router = express.Router();

// Middleware de validação dos dados do país antes do CREATE. O express-validator garante sanitização e mensagens claras de erro.
const validateCountry = [
  body("name")
    .trim()
    .notEmpty().withMessage("O nome do país é obrigatório.")
    .isLength({ max: 100 }).withMessage("O nome deve ter no máximo 100 caracteres.")
    .escape(),

  body("region")
    .trim()
    .notEmpty().withMessage("A região é obrigatória.")
    .isLength({ max: 100 }).withMessage("A região deve ter no máximo 100 caracteres.")
    .escape(),

  body("subregion")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("A sub-região deve ter no máximo 100 caracteres.")
    .escape(),

  body("flag")
    .optional()
    .trim()
    .isURL().withMessage("A URL da bandeira deve ser válida."),

  body("capitals")
    .optional()
    .isArray().withMessage("Capitais deve ser uma lista (array)."),

  body("languages")
    .optional()
    .isArray().withMessage("Idiomas deve ser uma lista (array)."),

  body("currencies")
    .optional()
    .isArray().withMessage("Moedas deve ser uma lista (array)."),
];

// GET /countries Lista todos os países.
router.get("/", authenticateToken, async (req, res) => {
  try {
    const countries = await CountryModel.getAll();
    return res.json(countries);
  } catch (error) {
    await LogModel.create(req.user?.username || "unknown", "list_countries", "error", error.message);
    return res.status(500).json({ message: "Erro ao listar países." });
  }
});

// GET /countries/:name  Busca um país pelo nome.
router.get("/:name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const country = await CountryModel.getByName(name);

    if (!country) {
      await LogModel.create(req.user?.username || "unknown", "get_country", "error", `País '${name}' não encontrado`);
      return res.status(404).json({ message: "País não encontrado." });
    }

    return res.json(country);
  } catch (error) {
    await LogModel.create(req.user?.username || "unknown", "get_country", "error", error.message);
    return res.status(500).json({ message: "Erro ao buscar país." });
  }
});

// POST /countriesCria um novo país.
router.post("/", authenticateToken, validateCountry, async (req, res) => {
  const errors = validationResult(req);

  // Caso haja erro de validação nos campos
  if (!errors.isEmpty()) {
    await LogModel.create(req.user?.username || "unknown", "create_country", "error", "Erro de validação");
    return res.status(400).json({
      message: "Erro de validação nos dados enviados.",
      errors: errors.array(),
    });
  }

  try {
    const { name, region, subregion, flag, capitals, languages, currencies } = req.body;

    // Checagem redundante, mas mantém o backend robusto mesmo sem validação
    if (!name || !region) {
      await LogModel.create(req.user?.username || "unknown", "create_country", "error", "Campos obrigatórios ausentes");
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    // Cria o país via model
    const countryId = await CountryModel.create({
      name,
      region,
      subregion,
      flag,
      capitals,
      languages,
      currencies,
    });

    return res.status(201).json({
      message: "País criado com sucesso!",
      countryId,
    });
  } catch (error) {
    await LogModel.create(req.user?.username || "unknown", "create_country", "error", error.message);
    return res.status(500).json({ message: "Erro ao criar país." });
  }
});

export default router;
