import { db } from "./db.js";

export async function initDatabase() {
  const conn = await db.getConnection();

  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS countries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      region VARCHAR(100),
      subregion VARCHAR(100),
      flag VARCHAR(255)
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS capitals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      country_id INT,
      name VARCHAR(100),
      FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS languages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      country_id INT,
      name VARCHAR(100),
      FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS currencies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      country_id INT,
      name VARCHAR(100),
      FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS logs ( 
      id INT AUTO_INCREMENT PRIMARY KEY,
      user VARCHAR(100),
      action VARCHAR(100),
      status VARCHAR(50),
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);


  

  conn.release();
}
