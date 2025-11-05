import { db } from "../config/db.js";

export class LanguageModel {
  static async findByCountryId(countryId) {
    const [rows] = await db.query("SELECT * FROM languages WHERE country_id = ?", [countryId]);
    return rows;
  }

  static async create(countryId, name) {
    await db.query("INSERT INTO languages (country_id, name) VALUES (?, ?)", [countryId, name]);
  }
}
