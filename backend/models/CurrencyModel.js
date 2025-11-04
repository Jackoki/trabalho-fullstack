import { pool } from "../config/db.js";

export class CurrencyModel {
  static async findByCountryId(countryId) {
    const [rows] = await pool.query("SELECT * FROM currencies WHERE country_id = ?", [countryId]);
    return rows;
  }

  static async create(countryId, name) {
    await pool.query("INSERT INTO currencies (country_id, name) VALUES (?, ?)", [countryId, name]);
  }
}
