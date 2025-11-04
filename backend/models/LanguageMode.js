import { pool } from "../config/db.js";

export class LanguageModel {
  static async findByCountryId(countryId) {
    const [rows] = await pool.query("SELECT * FROM languages WHERE country_id = ?", [countryId]);
    return rows;
  }

  static async create(countryId, name) {
    await pool.query("INSERT INTO languages (country_id, name) VALUES (?, ?)", [countryId, name]);
  }
}
