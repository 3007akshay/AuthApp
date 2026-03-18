import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('auth.db');

// ✅ Initialize Database
export const initDB = async (): Promise<void> => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log(' Database initialized');
  } catch (error) {
    console.error(' DB Init Error:', error);
  }
};

// ✅ Register User
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    await db.runAsync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { success: true };
  } catch (error) {
    console.log(' Register Error:', error);
    return { success: false, error };
  }
};

// ✅ Login User
export const loginUser = async (
  email: string,
  password: string
): Promise<any | null> => {
  try {
    const user = await db.getFirstAsync<any>(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    return user || null;
  } catch (error) {
    console.log(' Login Error:', error);
    return null;
  }
};

// ✅ Update User
export const updateUser = async (
  id: number,
  name: string,
  password: string
): Promise<void> => {
  try {
    await db.runAsync(
      'UPDATE users SET name = ?, password = ? WHERE id = ?',
      [name, password, id]
    );
    console.log('✅ User updated');
  } catch (error) {
    console.log('❌ Update Error:', error);
  }
};