import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { create } from './Create.js';

export function AllContacts(){
    let [flatListItems, setFlatListItems] = useState([]);

    const getAll = async () => {
       try{
            db = await create();
            let allRows = await db.getAllAsync('SELECT * FROM passwords');
            setFlatListItems(allRows);
            console.log("[LOG] Data retrieved from tables passwords");
            if(allRows.length==0){
                Alert.alert(
                    'Warning',
                    'No password registered',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    let listItemView = (item) => {
        return (
            <View
                key={item.id}
                style={{ backgroundColor: '#EEE', marginTop: 20, padding: 15, borderRadius: 10 }}>
                <Text style={styles.textheader}>Código</Text>
                <Text style={styles.textbottom}>{item.id}</Text>

                <Text style={styles.textheader}>Nome</Text>
                <Text style={styles.textbottom}>{item.name}</Text>

                <Text style={styles.textheader}>Senha</Text>
                <Text style={styles.textbottom}>{item.password}</Text>

            </View>
        );
    };

    return (
        <View style={{ flex: 1, width: "80%"}}>
            {/* <Button title="List" onPress={() => getAll()} /> */}
            <TouchableOpacity style={styles.button} onPress={() => getAll()} >
                <Text style={styles.buttonText}>List All</Text>
            </TouchableOpacity>
            <View style={{ flex: 1}}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={flatListItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textheader: {
        color: '#111',
        fontSize: 12,
        fontWeight: '700',

    },
    textbottom: {
        color: '#111',
        fontSize: 18,
    },
    button: {
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