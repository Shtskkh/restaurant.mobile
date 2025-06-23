import {Icon} from "@ui-kitten/components";
import {Stack, Tabs} from 'expo-router';
import {PaperProvider} from "react-native-paper";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="order" options={{title: "Сделать заказ", headerShown: false}}/>
            <Tabs.Screen name="current-orders" options={{title: "Текущие заказы", headerShown: false}}/>
            <Tabs.Screen name="settings" options={{title: "Настройки", headerShown: false}}/>
        </Tabs>
    );
}