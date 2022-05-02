import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';
import Reminder from '../Components/Reminder.native';
import { GrassType } from '../ts/enums';
import { reminder } from '../ts/types';
import { getDBConnection,createTable, getReminderItems } from '../Services/db-service';
import { Button, } from '@rneui/themed';

const Home: React.FC<{navigation:any
}> = ({navigation}) => {

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedItems = await getReminderItems(db);
      setData(storedItems);
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const [data,setData] = useState<reminder[]>([])
  // const data: reminder[] = [
  //   { id:1,date: "someDate", type: GrassType.Kikuyu, nextDate: "someOtherDate" },
  //   { id:2,date: "someDate", type: GrassType.Kikuyu, nextDate: "someOtherDate" },
  //   { id:3,date: "someDate", type: GrassType.Kikuyu, nextDate: "someOtherDate" },
  // ]

  return (
    <View>
      
      <FlatList    
          style={{width:"100%"}}     
          data={data}
          
          renderItem={({item}) => {
            return (
                <Reminder key={item.id} {...item}/>
              
            )
          }}
          ListHeaderComponent={()=><Button title="Solid" type="solid" onPress={()=>navigation.navigate("CreateEntryScreen")}/>}
          />
    </View>
  );
};

export default Home