import bcrypt from "bcrypt";
import { db } from "./db.js";

//Função utilizada para inserir os dados no banco de dados caso esteja vazio
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
      const [result] = await db.query(
        "INSERT INTO countries (name, region, subregion, flag) VALUES (?, ?, ?, ?)",
        [country.name, country.region, country.subregion, country.flag]
      );

      const countryId = result.insertId;

      for (const capital of country.capitals) {
        await db.query("INSERT INTO capitals (country_id, name) VALUES (?, ?)", [countryId, capital]);
      }

      for (const lang of country.languages) {
        await db.query("INSERT INTO languages (country_id, name) VALUES (?, ?)", [countryId, lang]);
      }

      for (const curr of country.currencies) {
        await db.query("INSERT INTO currencies (country_id, name) VALUES (?, ?)", [countryId, curr]);
      }
    }
  }

}
