import {QueryClientProvider} from "@tanstack/react-query";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {Stack} from 'expo-router';
import {useContext, useState} from "react";
import * as eva from '@eva-design/eva';
import {SafeAreaView} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {AuthContext, AuthProvider} from "../context/auth";
import {queryClient} from "../utils/clients";
import {EvaIconsPack} from '@ui-kitten/eva-icons';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <IconRegistry icons={EvaIconsPack}/>
                            <RootNavigator/>
                        </AuthProvider>
                    </QueryClientProvider>
                </ApplicationProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

function RootNavigator() {
    const authState = useContext(AuthContext);
    return (
        <Stack>
            <Stack.Protected guard={!authState.isLoggedIn}>
                <Stack.Screen name="index" options={{headerShown: false}}/>
            </Stack.Protected>
            <Stack.Protected guard={authState.isLoggedIn}>
                <Stack.Screen name="(app)" options={{headerShown: false}}/>
            </Stack.Protected>
        </Stack>
    )
}