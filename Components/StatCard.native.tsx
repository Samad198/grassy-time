import React from 'react';
import {Text} from 'react-native';

import {  stat } from '../ts/types';
import { Card } from '@rneui/themed';

const StatCard: React.FC<stat> = ({ grassType, growthRateSummer, growthRateWinter,bestLength }) => {

    return (
        <Card>
            <Text style={{ fontWeight: "bold" }}>{grassType}</Text>
            <Text >Growth Rate Summer (cm/day): {growthRateSummer}</Text>
            <Text>Growth Rate Winter (cm/day):{growthRateWinter}</Text>
            <Text >Base length (cm): {bestLength}</Text>
        </Card>
    );
};

export default StatCard