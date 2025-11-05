import { db } from "../config/db.js";

export class CapitalModel {
  static async findByCountryId(countryId) {
    const [rows] = await db.query("SELECT * FROM capitals WHERE country_id = ?", [countryId]);
    return rows;
  }

  static async create(countryId, name) {
    await db.query("INSERT INTO capitals (country_id, name) VALUES (?, ?)", [countryId, name]);
  }
}
