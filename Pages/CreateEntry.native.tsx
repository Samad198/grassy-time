import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
} from 'react-native';
import { calculateNextMow, getDBConnection, saveReminder } from '../Services/myMowingService';
import { GrassType } from '../ts/enums';
import { Button, ButtonGroup } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'


const CreateEntry: React.FC<{ navigation: any; }> = ({ navigation }) => {
    const grassTypes = Object.values(GrassType)
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState(0);

    const dateToISO = (input:Date) => {
        return input.toISOString().slice(0, 19).replace('T', ' ')
    }
    const createEntry = async () => {
        try {
            const now = dateToISO(date)
            const next = dateToISO((await calculateNextMow(date,grassTypes[selectedIndex])))
            const db = await getDBConnection();
            const item = await saveReminder(db, { date: now, type: grassTypes[selectedIndex], nextDate: next });
            navigation.navigate('HomeScreen', { item: item })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView>
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Button title={"Choose date"} onPress={() => setOpen(true)} />
            <Text style={styles.boldText}>Date:<Text style={styles.normalText}>{dateToISO(date)}</Text></Text>
            
            <Text style={styles.boldText}>Grass Type:</Text>
            <ButtonGroup
                buttons={grassTypes}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

            <Button title={"Save"} onPress={createEntry} />

        </ScrollView>

    )
}
const styles = StyleSheet.create({
   
    boldText: {
        fontWeight: 'bold', 
    },
    normalText: {
        fontWeight: 'normal', 
    },
   
});

export default CreateEntry