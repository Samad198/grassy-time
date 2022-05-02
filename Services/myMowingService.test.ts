import { GrassType, Season } from '../ts/enums';
import {calculateNextMow} from './myMowingService'


test('Check that calculateNextMow function returns the correct output', async () => {
    // just writing 1 test to demonstrate. Should test all cases for this occasion
    const testDate = new Date('2014-01-01 10:11:55')
    const newDate = await calculateNextMow(testDate,GrassType.Kikuyu,Season.Summer)
    expect(newDate.toISOString().slice(0, 19).replace('T', ' ')).toBe("2014-01-13 10:11:55");
  });