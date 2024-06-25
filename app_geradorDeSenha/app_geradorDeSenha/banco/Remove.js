import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

export function Remove() {
    const [name, setName] = useState('');

    const remove = async () => {
        try {
            db = await create();
            let result = await db.runAsync(`DELETE FROM passwords where NAME = ?;`, name);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Contact removed',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Error on removing contact');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 0.5, width: "80%" }}>
            <TextInput
                placeholder="Entre com o Nome"
                onChangeText={
                    nome => setName(nome)
                }
                style={{ padding: 8, backgroundColor: "white" }}
            />
            <TouchableOpacity style={styles.button} title="Delete" onPress={() => remove()}>
                <Text style={styles.buttonText}>Delete Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'black'
    },
    buttonText: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});