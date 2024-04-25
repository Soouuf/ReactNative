import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    FlatList,
    Item
}
    from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title } from 'react-native-paper'
import { CartContext } from '../../App';
import { FontAwesome5 } from '@expo/vector-icons';


const Home = () => {

    const navigation = useNavigation();

    const CartStore = useContext(CartContext)

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch('https://fakestoreapi.com/products').
            then(response => response.json()).
            then(data => setProducts(data));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                <FontAwesome5 name="shopping-bag" size={24} color="black" onPress={() => navigation.navigate('Cart')}/>
            </Text>

            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <Card style={styles.card}>
                            <Card.Cover source={{ uri: item.image }} />
                            <Card.Content>
                                <Title style={styles.title}>{item.title}</Title>
                                <Text style={styles.price}>${item.price}</Text>
                            </Card.Content>
                            <Card.Actions style={styles.cardActions}>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => CartStore.addToCart(item)}>
                                    <Text style={styles.buttonText}>Ajouter au panier</Text>
                                </TouchableOpacity>
                            </Card.Actions>
                        </Card>
                    </View>
                )}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 20,
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    cardContainer: {
        width: '50%',
        padding: 10,
    },
    card: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        height: 100,
    },
    button: {
        backgroundColor: '#766F64',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cartButton: {
        padding: 5,
    },
})


export default Home;
