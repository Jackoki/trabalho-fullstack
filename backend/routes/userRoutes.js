import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/UserModel.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) 
    return res.status(401).json({ message: "Usuário não encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) 
    return res.status(401).json({ message: "Senha incorreta" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
});

export default router;
