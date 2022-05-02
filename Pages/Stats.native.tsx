import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';
import { grassData } from '../Services/myMowingService';
import { stat } from '../ts/types';
import { Button, Card } from '@rneui/themed';

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
            <Card>
              <Text style={{fontWeight:"bold"}}>{item.grassType}</Text>
              <Text >Growth Rate Summer (cm/day): {item.growthRateSummer}</Text>
              <Text>Growth Rate Winter (cm/day):{item.growthRateWinter}</Text>
              <Text >Base length (cm): {item.bestLength}</Text>
            </Card>
          )
        }}

      />
    </View>

  );
};

export default Stats