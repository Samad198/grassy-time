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
    const grassTypes = [GrassType.Buffalo, GrassType.Cynodon, GrassType.KentuckyBlue, GrassType.Kikuyu]
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
            <Text style={{fontWeight:"bold"}}>Date:<Text style={{fontWeight:"normal"}}>{dateToISO(date)}</Text></Text>
            
            <Text style={{fontWeight:"bold"}}>Grass Type:</Text>
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
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2fc562',
        alignContent: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 100
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
        backgroundColor: "white"
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default CreateEntry