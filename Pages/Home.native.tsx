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
import { reminder } from '../ts/types';
import { getDBConnection, createTable, getReminderItems, deleteTable } from '../Services/myMowingService';
import { Button, Card } from '@rneui/themed';

const Home: React.FC<{
  navigation: any, route: any
}> = ({ route, navigation }) => {
  const loadDataCallback = useCallback(async () => {
    try {

      const db = await getDBConnection();
      // uncomment this to delete the table the first time the app is run
      //await deleteTable(db)
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

  useEffect(() => {
    if (route.params?.item) {
      const item = route.params.item
      setData(prevData => [item, ...prevData])
    }
  }, [route.params?.item])

  const [data, setData] = useState<reminder[]>([])


  return (
    <View >

      <FlatList
        style={{ width: "100%", height:"100%" }}
        data={data}
        renderItem={({ item }) => {
          return (
            <Card>
              <Reminder key={item.id}  {...item} />
            </Card>

          )
        }}
        ListHeaderComponent={() => <Button title="Add new Entry" type="solid" onPress={() => navigation.navigate("CreateEntryScreen")}></Button>}
      />
    </View>
  );
};

export default Home