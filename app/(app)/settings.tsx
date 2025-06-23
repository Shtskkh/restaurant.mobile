import {Button, Input, Layout, Text} from "@ui-kitten/components";
import {useRouter} from 'expo-router';
import React, {useContext, useState} from "react";
import {Alert, SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import {AuthContext} from "../../context/auth";

export default function SettingsScreen() {
    const router = useRouter();
    const authState = useContext(AuthContext);

    const handleLogout = () => {
        authState.logOut();
        router.replace("/");
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <Button style={styles.button} onPress={handleLogout}>Выйти</Button>
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 10
    },
    button: {
        width: '100%',
    }
})