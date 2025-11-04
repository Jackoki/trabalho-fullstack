import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUsername,
  findUserById,
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../models/UserModel.js";

const router = express.Router();


// 🟢 Rota de registro (signup)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await findUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já cadastrado!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, password: hashedPassword });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});


// 🟠 Rota de login
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


// 🟡 Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
};


// 🔵 Rota para obter todos os usuários (somente autenticado)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
});


// 🔵 Rota para obter usuário por ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});


// 🟣 Rota para atualizar dados do usuário
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { username, password } = req.body;
    let updatedData = { username };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUser(req.params.id, updatedData);
    res.json({ message: "Usuário atualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});


// 🔴 Rota para excluir usuário
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const success = await deleteUser(req.params.id);
    if (!success) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário" });
  }
});


export default router;

