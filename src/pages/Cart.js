import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../../App';
import { Feather } from '@expo/vector-icons';

const Cart = () => {
    const { cart, decreaseQuantity, increaseQuantity, sumOfPriceInCart, clearAll } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <Feather name="trash-2" size={24} color="redz" onPress={() => clearAll()} />
            <Text style={styles.totalPrice}>Total: ${sumOfPriceInCart()}</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.title}</Text>
                            <Text style={styles.productPrice}>Prix: ${item.price}</Text>
                            <Text style={styles.productQuantity}>Quantité: {item.quantity}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="-" onPress={() => decreaseQuantity(item)} />
                            <Button title="+" onPress={() => increaseQuantity(item)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderTop: 1,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
    },
    productQuantity: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        color: '#528f76'
    },
});

export default Cart;
