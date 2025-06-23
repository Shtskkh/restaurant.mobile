import {
    Button,
    Input,
    Card,
    Select,
    SelectItem,
    Icon,
    Spinner
} from "@ui-kitten/components";
import React, {useContext, useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {AuthContext} from "../../context/auth";
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDishes} from "../../utils/apiHooks";
import {fetchClient} from "../../utils/clients";

const PlusIcon = (props) => <Icon {...props} name='plus-outline'/>;
const TrashIcon = (props) => <Icon {...props} name='trash-2-outline'/>;

export default function OrderScreen() {
    const authState = useContext(AuthContext);
    const {data, error, isLoading} = useDishes();
    const employeeLogin = authState.username;
    const [tableNumber, setTableNumber] = useState<string>('');
    const [dishes, setDishes] = useState([{title: '', count: 1, comment: ''}]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.tabContainer}>
                <Spinner/>
            </SafeAreaView>
        )
    }

    const updateDishes = (index: number, field: string, value: any) => {
        const newDishes = [...dishes];
        if (field == 'count') {
            newDishes[index][field] = parseInt(value);
        }

        // @ts-ignore
        newDishes[index][field] = value;
        setDishes(newDishes);
    }

    const submitOrder = () => {
        const formData = new FormData();
        formData.append('EmployeeLogin', employeeLogin ?? 'null');
        formData.append('Date', new Date().toISOString().slice(0, -1));
        formData.append('Table', tableNumber);

        dishes.forEach((dish, index) => {
            formData.append(`Dishes[${index}].Title`, dish.title);
            formData.append(`Dishes[${index}].Count`, dish.count.toString());
            if (dish.comment) {
                formData.append(`Dishes[${index}].Comment`, dish.comment);
            }
        })

        fetchClient.POST("/api/Orders/Add", {
            body: formData
        });

        setDishes([{title: '', count: 1, comment: ''}]);

    };

    const addDishCard = () => {
        setDishes([...dishes, {title: '', count: 1, comment: ''}]);
    };

    const removeDishCard = (index: number) => {
        setDishes(dishes.filter((_, i) => i !== index));
    };

    return (
        <SafeAreaView style={styles.tabContainer}>
            <ScrollView>
                <Input style={styles.input} label={"Номер стола"} value={tableNumber} keyboardType="numeric"
                       onChangeText={setTableNumber}/>
                {dishes.map((dish, index) => (
                    <Card key={index} style={styles.card}>
                        <Select
                            style={styles.input}
                            label='Блюдо'
                            value={dish.title}
                            placeholder="Выберете блюдо"
                            onSelect={(selected) => updateDishes(index, 'title', data[selected.row].title)}
                        >
                            {data?.map((option, index) => (
                                <SelectItem key={index} title={option.title}/>
                            ))}
                        </Select>

                        <Input
                            style={styles.input}
                            label='Количество'
                            value={dish.count.toString()}
                            onChangeText={(value) => updateDishes(index, 'count', parseInt(value))}
                            keyboardType='numeric'
                        />

                        <Input
                            style={styles.input}
                            label='Комментарий'
                            value={dish.comment}
                            onChangeText={(value) => updateDishes(index, 'comment', value)}
                            keyboardType='default'
                            multiline
                        />

                        {dishes.length > 1 && (
                            <Button
                                style={styles.button}
                                appearance='ghost'
                                accessoryLeft={TrashIcon}
                                onPress={() => removeDishCard(index)}
                            />
                        )}
                    </Card>
                ))}
                <Button
                    style={styles.button}
                    accessoryLeft={PlusIcon}
                    onPress={addDishCard}
                >
                    Добавить блюдо
                </Button>

                <Button
                    style={styles.button}
                    onPress={submitOrder}
                    disabled={!tableNumber || !dishes.some(d => d.title)}
                >
                    Сделать заказ
                </Button>

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
})