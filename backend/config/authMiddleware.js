import jwt from "jsonwebtoken";
import { tokenBlacklist } from "./TokenBlacklist.js";

export function authenticateToken(req, res, next) {
  // Captura o header de autorização (Formato esperado: "Bearer <token>")
  const authHeader = req.headers.authorization;

  // Se existir, separa pelo espaço e pega somente o token
  const token = authHeader && authHeader.split(" ")[1];

  // Caso o token não seja fornecido
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  // Verifica se o token está na blacklist (como após um logout)
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token expirado ou inválido." });
  }

  try {
    // Verifica e valida o token usando a chave secreta definida no .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Disponibiliza os dados do token na requisição
    req.user = decoded;

    // Segue para a próxima função do fluxo de requisição
    next();
  } catch (err) {
    console.error("Erro ao autenticar token:", err);

    // Caso o token seja inválido ou tenha expirado
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
}
