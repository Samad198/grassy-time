import { openDatabase, SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';
import { GrassType, Season } from '../ts/enums';
import { reminder, stat } from '../ts/types';

enablePromise(true);
export const getDBConnection = async () => {
    
    return openDatabase({ name: 'reminder-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS Reminders(
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
        `INSERT INTO Reminders(type, date,nextDate) values('${item.type}','${item.date}','${item.nextDate}')`;
    const result =  (await db.executeSql(insertQuery))[0];
    const insertedItem = {...item,id:result.insertId}
    return insertedItem 
};

export const deleteReminder = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from Reminders where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table Reminders`;

    await db.executeSql(query);
};

export const calculateNextMow = async (date:any,type:GrassType,season:Season) => {
    const grassItem = grassData.find(item=>item.grassType===type)
    if(grassItem){
    const growthRate = season===Season.Summer?grassItem?.growthRateSummer:grassItem?.growthRateWinter
    let incrementTime = grassItem.bestLength/growthRate
    var copiedDate = new Date(date.getTime());
    copiedDate.setDate(copiedDate.getDate() + incrementTime)
    }
    else{ 
        throw "Incorrect grass type supplied"
    }
    return copiedDate
};

export const getSeason = () => {
    return Season.Summer
};

export const grassData:stat[] = 
    [
        {grassType:GrassType.Kikuyu,growthRateSummer:0.65,growthRateWinter:0.45,bestLength:8},
        {grassType:GrassType.KentuckyBlue,growthRateSummer:0.65,growthRateWinter:0.45,bestLength:8},
        {grassType:GrassType.Buffalo,growthRateSummer:0.65,growthRateWinter:0.45,bestLength:8},
        {grassType:GrassType.Cynodon,growthRateSummer:0.65,growthRateWinter:0.45,bestLength:8},

    ]