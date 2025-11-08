import jwt from "jsonwebtoken";
import { tokenBlacklist } from "./TokenBlacklist.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Token não fornecido" });

  if (tokenBlacklist.has(token))
    return res.status(401).json({ message: "Token expirado ou inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  
  catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado. Faça login novamente." });
    }

    return res.status(403).json({ message: "Token inválido." });
  }
}
