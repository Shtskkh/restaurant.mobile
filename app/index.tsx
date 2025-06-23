import {Layout, Button, Input, Divider, CircularProgressBar, Spinner} from "@ui-kitten/components";
import {useRouter} from "expo-router";
import React, {useContext, useState} from 'react';
import {Alert, SafeAreaView} from "react-native";
import {AuthContext} from "../context/auth";
import {useAuth} from "../utils/apiHooks";
import {StyleSheet} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const authState = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {error, refetch, isLoading} = useAuth(username, password);

    const handleLogin = async () => {
        if (username && password) {

            const {data} = await refetch();
            if (!data || error) {
                Alert.alert('Ошибка', 'Неверные логин и пароль');
                return;
            }

            if (data?.token) {
                authState.logIn(username, data.token)
                router.replace("/");
            }

        } else {
            Alert.alert('Ошибка', 'Заполните все поля');
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <Input style={styles.input} placeholder="Логин" onChangeText={setUsername} size={'large'}/>
                <Input style={styles.input} placeholder="Пароль" onChangeText={setPassword} secureTextEntry
                       size={'large'}/>
                <Button style={styles.button} size={'large'} onPress={handleLogin}>{isLoading ?
                    <Spinner/> : "Вход"}</Button>
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    },
    button: {
        width: '100%',
    }
})