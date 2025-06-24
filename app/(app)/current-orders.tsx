import {useFocusEffect} from "expo-router";
import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Card, CircularProgressBar, Layout, List, Spinner, Text} from '@ui-kitten/components';
import {AuthContext} from "../../context/auth";
import {useCurrentOrders} from "../../utils/apiHooks";

export default function CurrentOrdersScreen() {
    const authContext = useContext(AuthContext);
    const {data, isLoading, error, refetch} = useCurrentOrders(authContext.username);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (isLoading) {
        return (
            <SafeAreaView style={styles.tabContainer}>
                <Spinner/>
            </SafeAreaView>
        )
    }

    if (!data || error) {
        return (
            <SafeAreaView style={styles.tabContainer}>
                <Text>Нет заказов.</Text>
            </SafeAreaView>
        )
    }

    const renderDishItem = ({item}) => (
        <Layout style={styles.dishItem}>
            <Text>{item.title}</Text>
            <Text appearance='hint'>{item.status}</Text>
        </Layout>
    );

    return (
        <SafeAreaView style={styles.tabContainer}>
            <ScrollView>
                {data.map((order) => (
                    <Card key={order.idOrder} style={styles.card}>
                        <Text category='h6'>Заказ #{order.idOrder}</Text>
                        <Text appearance='hint'>Стол: {order.tableNumber}</Text>
                        <List
                            style={styles.dishList}
                            data={order.dishesInOrder}
                            renderItem={renderDishItem}
                        />
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    card: {
        width: '100%',
        marginBottom: 16,
        padding: 8,
    },
    button: {
        marginVertical: 8,
    },
    accordionHeader: {
        padding: 16,
    },
    dishItem: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dishList: {
        marginVertical: 8,
    },
});