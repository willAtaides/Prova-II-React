import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

export function Update() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const update = async () => {
        try {
            let senha = await generatePassword()
            db = await create();
            let result = await db.runAsync( `UPDATE passwords SET name = ?, password = ? WHERE id = ?;`, name, senha, id);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Password updated successfully',
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
        <View style={{ flex: 0.5, width: "80%" }}>
            <TextInput
                placeholder="Entre com o ID"
                onChangeText={text => setId(text)}
                style={{ padding: 8, backgroundColor: "white", marginTop: 10 }}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Entre com o nome"
                onChangeText={text => setName(text)}
                style={{ padding: 8, backgroundColor: "white", marginTop: 10 }}
            />
            <TouchableOpacity style={styles.button} onPress={() => update()}>
                <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
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
