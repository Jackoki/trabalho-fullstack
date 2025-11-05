import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export class UserModel {
  static async create(username, password) {
    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashed]);
  }

  static async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}
