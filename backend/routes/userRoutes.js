import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUsername, createUser } from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Usuário e senha são obrigatórios" });

    const existingUser = await findUsername(username);

    if (existingUser)
      return res.status(400).json({ message: "Usuário já cadastrado!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, password: hashedPassword });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: newUser.id, username: newUser.username },
    });
  } 
  
  catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await findUsername(username);
  if (!user)
    return res.status(401).json({ message: "Usuário não encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword)
    return res.status(401).json({ message: "Senha incorreta" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

export default router;
