import SQLite, { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { reminder } from '../ts/types';

SQLite.enablePromise(true);
export const getDBConnection = async () => {
    return openDatabase({ name: 'reminder-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS Reminders(
          id int NOT NULL,
          type TEXT NOT NULL,
          date Timestamp NOT NULL,
          nextDate Timestamp NOT NULL
      );`;

    await db.executeSql(query);
};

export const getReminderItems = async (db: SQLiteDatabase): Promise<reminder[]> => {
    try {
        const items: reminder[] = [];
        const results = await db.executeSql(`SELECT rowid as id,type,date,nextDate FROM Reminders`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                items.push(result.rows.item(index))
            }
        });
        return items;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get Items !!!');
    }
};

export const saveReminder = async (db: SQLiteDatabase, item: reminder) => {
    const insertQuery =
        `INSERT OR REPLACE INTO Reminders(type, date,nextDate) values('${item.type}','${item.date}','${item.nextDate}')`;
    return db.executeSql(insertQuery);
};

export const deleteReminder = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from Reminders where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table Reminders`;

    await db.executeSql(query);
};