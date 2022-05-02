import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { GrassType } from '../ts/enums';

const Reminder: React.FC<{date: string, type: GrassType, nextDate:string 
}> = ({type,date,nextDate}) => {

    return (
        <View>
            <Text>You cut grass of type {type} at {date}</Text>
            <Text>You must cut again at {nextDate}</Text>
        </View>
    );
};

export default Reminder