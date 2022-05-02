import React from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from '@rneui/themed';

const Settings: React.FC<{
}> = () => {
    const signOut = () => {
        auth().signOut()
    }
    return (
        <View>
            <Button
                title={"Logout"}
                onPress={signOut} />


        </View>
    );

};
const styles = StyleSheet.create({

});

export default Settings