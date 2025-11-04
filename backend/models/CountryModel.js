import { pool } from "../config/db.js";

export class CountryModel {
  static async create({ name, region, subregion, flag, capitals, languages, currencies }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [result] = await conn.query(
        "INSERT INTO countries (name, region, subregion, flag) VALUES (?, ?, ?, ?)",
        [name, region, subregion, flag]
      );

      const countryId = result.insertId;

      for (const capital of capitals || [])
        await conn.query("INSERT INTO capitals (country_id, name) VALUES (?, ?)", [countryId, capital]);

      for (const lang of languages || [])
        await conn.query("INSERT INTO languages (country_id, name) VALUES (?, ?)", [countryId, lang]);

      for (const cur of currencies || [])
        await conn.query("INSERT INTO currencies (country_id, name) VALUES (?, ?)", [countryId, cur]);

      await conn.commit();
      return countryId;
    } 
    
    catch (error) {
      await conn.rollback();
      throw error;
    } 
    
    finally {
      conn.release();
    }
  }

  static async getAll() {
    const [countries] = await pool.query("SELECT * FROM countries");

    for (const c of countries) {
      const [capitals] = await pool.query("SELECT name FROM capitals WHERE country_id = ?", [c.id]);
      const [languages] = await pool.query("SELECT name FROM languages WHERE country_id = ?", [c.id]);
      const [currencies] = await pool.query("SELECT name FROM currencies WHERE country_id = ?", [c.id]);

      c.capitals = capitals.map((x) => x.name);
      c.languages = languages.map((x) => x.name);
      c.currencies = currencies.map((x) => x.name);
    }

    return countries;
  }

  static async getByName(name) {
    const [rows] = await pool.query("SELECT * FROM countries WHERE name = ?", [name]);
    const country = rows[0];
    
    if (!country) 
      return null;

    const [capitals] = await pool.query("SELECT name FROM capitals WHERE country_id = ?", [country.id]);
    const [languages] = await pool.query("SELECT name FROM languages WHERE country_id = ?", [country.id]);
    const [currencies] = await pool.query("SELECT name FROM currencies WHERE country_id = ?", [country.id]);

    country.capitals = capitals.map((x) => x.name);
    country.languages = languages.map((x) => x.name);
    country.currencies = currencies.map((x) => x.name);

    return country;
  }

  static async deleteById(id) {
    await pool.query("DELETE FROM countries WHERE id = ?", [id]);
  }
}
