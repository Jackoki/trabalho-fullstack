import express from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/UserModel.js";
import { LogModel } from "../models/LogModel.js";
import { authenticateToken } from "../config/authMiddleware.js";

const router = express.Router();

const validateUser = [
  body("username")
    .trim()
    .notEmpty().withMessage("Usuário é obrigatório")
    .isLength({ min: 3 }).withMessage("Usuário deve ter ao menos 3 caracteres")
    .escape(),
  body("password")
    .trim()
    .notEmpty().withMessage("Senha é obrigatória")
    .isLength({ min: 4 }).withMessage("Senha deve ter ao menos 4 caracteres")
    .escape(),
];

const loginRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Muitas tentativas. Tente novamente em 1 minuto." }
});

router.post("/register", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await LogModel.create(null, "register", "error", "Validação falhou");
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      await LogModel.create(req.user?.username || "unknown", "register", "error", "Campos obrigatórios ausentes");
      return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const existingUser = await UserModel.findByUsername(username);

    if (existingUser) {
      await LogModel.create(req.user?.username || "unknown", "register", "error", "Usuário já cadastrado");
      return res.status(400).json({ message: "Usuário já cadastrado!" });
    }

    await UserModel.create(username, password);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { username },
    });
  } 
  
  catch (error) {
    await LogModel.create(req.user?.username || "unknown", "register", "error", error.message);
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});

router.post("/login", loginRateLimit, validateUser, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    await LogModel.create(null, "login", "error", "Validação falhou");
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const user = await UserModel.findByUsername(username);

    if (!user) {
      await LogModel.create(req.user?.username || "unknown", "login", "error", "Usuário não encontrado");
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const validPassword = await UserModel.validatePassword(user, password);    

    if (!validPassword) {
      await LogModel.create(req.user?.username || "unknown", "login", "error", "Senha incorreta");
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } 
  
  catch (error) {
  await LogModel.create({
    username: req.body.username,
    action: "login",
    status: "error",
    message: error.message
  });

  res.status(500).json({ message: error.message });
  }
});

router.post("/logout", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  tokenBlacklist.add(token);
  res.json({ message: "Logout realizado com sucesso" });
});

export default router;
