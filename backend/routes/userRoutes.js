import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/UserModel.js";

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

router.post("/register", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Usuário e senha são obrigatórios" });

    const existingUser = await UserModel.findByUsername(username);

    if (existingUser)
      return res.status(400).json({ message: "Usuário já cadastrado!" });

    await UserModel.create(username, password);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { username },
    });
  } 
  
  catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});

router.post("/login", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { username, password } = req.body;

    const user = await UserModel.findByUsername(username);
    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado" });

    const validPassword = await UserModel.validatePassword(user, password);
    if (!validPassword)
      return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } 
  
  catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

export default router;
