import bcrypt from "bcrypt";
import { db } from "./db.js";

export async function seedDatabase() {
  const [users] = await db.query("SELECT COUNT(*) AS count FROM users");
  if (users[0].count === 0) {
    const hashedPassword = await bcrypt.hash("user", 10);
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", ["user", hashedPassword]);
  }

  const defaultCountries = [
    {
      name: "Brasil",
      region: "América",
      subregion: "América do Sul",
      flag: "https://flagcdn.com/br.svg",
      capitals: ["Brasília"],
      languages: ["Português"],
      currencies: ["Real"],
    },
    {
      name: "Japão",
      region: "Ásia",
      subregion: "Leste Asiático",
      flag: "https://flagcdn.com/jp.svg",
      capitals: ["Tóquio"],
      languages: ["Japonês"],
      currencies: ["Iene"],
    },
  ];

  for (const country of defaultCountries) {
    const [rows] = await db.query("SELECT id FROM countries WHERE name = ?", [country.name]);
    if (rows.length === 0) {
      await db.query(
        "INSERT INTO countries (name, region, subregion, flag, capitals, languages, currencies) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          country.name,
          country.region,
          country.subregion,
          country.flag,
          JSON.stringify(country.capitals),
          JSON.stringify(country.languages),
          JSON.stringify(country.currencies),
        ]
      );
    }
  }
}
