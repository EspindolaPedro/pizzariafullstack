import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from "../../services/api";

import ModalPicker from "../../components/ModalPicker";

import ListItem from "../../components/ListItem";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from "../../routes/app.auth";

type RouteDetailParams = {
    Order: {
        table: string | number,
        order_id: string,
    }
}

export type CategoryProps = {
    id: string,
    name: string
}

type ProductProps = {
    id: string,
    name: string,
}

type itemProps = {
    id: string,
    product_id: string,
    name: string,
    amount: string | number,
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [amount, setAmount] = React.useState('1');
    const [items, setItems] = React.useState<itemProps[] | []>([])

    const [category, setCategory] = React.useState<CategoryProps[] | []>([]);
    const [categorySelected, setSelectedCategory] = React.useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = React.useState(false);

    const [products, setProducts] = React.useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = React.useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = React.useState(false)



    const handleCloseOrder = async () => {
        try {
            const res = await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })
        } catch (err) {
            console.log(err)
        }
        navigation.goBack()
    }

    //getCategory
    React.useEffect(() => {
        const getCategory = async () => {
            const res = await api.get('/category')
            setCategory(res.data);
            setSelectedCategory(res.data[0]);
        };
        getCategory();
    }, [])

    //getProduct
    React.useEffect(() => {
        const getProducts = async () => {
            const res = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProducts(res.data);
            setProductSelected(res.data[0]);

        }
        getProducts();
    }, [categorySelected])

    const handleChangeCategory = (item: CategoryProps) => {
        setSelectedCategory(item);
    }

    const handleChangeProduct = (item: ProductProps) => {
        setProductSelected(item);
    }

    const handleAdd = async () => {
        const res = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })
        let data = {
            id: res.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldData => [...oldData, data]);
    }

    const handleDeleteItem = async (item_id: string) => {
        const res = await api.delete('/order/remove', {
            params: {
                item_id
            }
        })
        let removeItems = items.filter(item => item.id !== item_id)
        setItems(removeItems)
    }

    const handleFinishOrder = () => {
        navigation.navigate("FinishOrder", {
            number: route.params?.table,
            order_id: route.params?.order_id
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.table}</Text>

                {
                    items.length < 1 && (
                        <TouchableOpacity onPress={handleCloseOrder}>
                            <Feather name="trash-2" size={28} color={'#ff6f4b'} />
                        </TouchableOpacity>
                    )
                }

            </View>

            {category.length > 0 ? (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#fff' }}>{categorySelected?.name}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.input}>
                    <Text style={{ color: '#fff' }}>Nenhuma categoria encontrada.</Text>
                </TouchableOpacity>
            )
            }


            {products.length > 0 ? (

                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#fff' }}>{productSelected?.name}</Text>
                </TouchableOpacity>

            ) : (

                <TouchableOpacity style={styles.input}>
                    <Text style={{ color: '#fff' }}>Nenhum produto encontrado.</Text>
                </TouchableOpacity>

            )

            }

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>

                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor={'#f0f0f0'}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { opacity: items.length < 1 ? 0.3 : 1 }]}
                    disabled={items.length < 1}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
                style={{
                    flex: 1,
                    marginTop: 24
                }}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14,
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        paddingBlock: 20,
        marginBottom: 12,
        justifyContent: 'center',
        paddingInline: 10,
        color: '#fff',
        fontSize: 18,

    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#101026',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        height: 40
    }
})