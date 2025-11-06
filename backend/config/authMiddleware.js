import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../utils/TokenBlacklist.js";

export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  
  catch (err) {
    console.error("Erro na autenticação:", err);
    return res.status(403).json({ message: "Token inválido" });
  }
  // Se o token estiver inválido => barrar
  if (tokenBlacklist.has(token))
    return res.status(401).json({ message: "Token expirado ou inválido" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.sendStatus(403);
  }
}

