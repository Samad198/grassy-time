import React, { useState, useEffect } from 'react';
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
import { grassData } from '../Services/myMowingService';
import { stat } from '../ts/types';

const Stats: React.FC<{
}> = () => {
    const data:stat[] = grassData
  return (
    <View>
        
        <FlatList    
          style={{width:"100%"}}     
          data={data}
          keyExtractor= {(item) => {
            return item.grassType;
          }}
          renderItem={({item}) => {
            return (
              
                <View >
                  <Text>This would be 1 of them</Text>
                </View>
              
            )
          }}
          ListHeaderComponent={()=><Text>Grass Data</Text>}
          />
    </View>

  );
};

export default Stats