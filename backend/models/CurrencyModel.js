import { db } from "../config/db.js";

export class CurrencyModel {
  static async findByCountryId(countryId) {
    const [rows] = await db.query("SELECT * FROM currencies WHERE country_id = ?", [countryId]);
    return rows;
  }

  static async create(countryId, name) {
    await db.query("INSERT INTO currencies (country_id, name) VALUES (?, ?)", [countryId, name]);
  }
}
