import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

export function Insert() {
    const [name, setName] = useState('');

    const insert = async () => {
         try {
            let senha = await generatePassword()
            db = await create();
            let result = await db.runAsync(`INSERT INTO passwords (name, password) VALUES (?, ?);`, name, senha);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Password Generate: ' + senha,
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Error on registering contact');
        } catch (error) {
            console.log(error);
        }
    }

    const generatePassword = async () => {
        var random = Math.random();
        var ranString = btoa((random * 1000).toString()).slice(3, 11);
        return ranString
    };

    return (
        <View style={{marginTop: 70, width: "80%" }}>
            <TextInput
                placeholder="Entre com o Nome"
                onChangeText={
                    nome => setName(nome)
                }
                style={{ padding: 10, backgroundColor: 'white' }}
            />
            <TouchableOpacity style={styles.button} onPress={insert} >
                <Text style={styles.buttonText}>Generate Password and Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
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