import React from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';
import StatCard from '../Components/StatCard.native';
import { grassData } from '../Services/myMowingService';
import { stat } from '../ts/types';


const Stats: React.FC<{
}> = () => {
  const data: stat[] = grassData
  return (
    <View>

      <FlatList
        style={{ width: "100%" }}
        data={data}
        keyExtractor={(item) => {
          return item.grassType;
        }}
        renderItem={({ item }) => {
          return (
            <StatCard {...item}/>
          )
        }}

      />
    </View>

  );
};

export default Stats