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
import { stat } from '../ts/types';

const Stats: React.FC<{
}> = () => {
    const data:stat[] = 
    [
        {grassType:"Kikuyu",growthRateSummer:0.65,growthRateWinter:0.45,baseLength:8},
        {grassType:"Kentucky Blue",growthRateSummer:0.65,growthRateWinter:0.45,baseLength:8},
        {grassType:"Buffalo",growthRateSummer:0.65,growthRateWinter:0.45,baseLength:8},
        {grassType:"Cynodon",growthRateSummer:0.65,growthRateWinter:0.45,baseLength:8},

    ]
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