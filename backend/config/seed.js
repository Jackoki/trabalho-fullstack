import bcrypt from "bcrypt";
import { db } from "./db.js";

export async function seedDatabase() {
  const [users] = await db.query("SELECT COUNT(*) AS count FROM users");
  if (users[0].count === 0) {
    const hashedPassword = await bcrypt.hash("user", 10);
    
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", ["user", hashedPassword]);
  }

  const [countries] = await db.query("SELECT COUNT(*) AS count FROM countries");
  if (countries[0].count === 0) {
    await db.query(
      "INSERT INTO countries (name, region, subregion, flag, capitals, languages, currencies) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        "Brasil",
        "América",
        "América do Sul",
        "https://flagcdn.com/br.svg",
        JSON.stringify(["Brasília"]),
        JSON.stringify(["Português"]),
        JSON.stringify(["Real"]),
      ]
    );

    await db.query(
      "INSERT INTO countries (name, region, subregion, flag, capitals, languages, currencies) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        "Japão",
        "Ásia",
        "Leste Asiático",
        "https://flagcdn.com/jp.svg",
        JSON.stringify(["Tóquio"]),
        JSON.stringify(["Japonês"]),
        JSON.stringify(["Iene"]),
      ]
    );
  }

}
