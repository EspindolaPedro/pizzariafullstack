import React, { useContext } from 'react'
import {
    Text, 
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { StackParamsList } from '../../routes/app.auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from '../../services/api';

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [table, setTable] = React.useState('');

    const openOrder = async () => {
      if (!table) return;

       const res = await api.post('/order', {
        table: Number(table)
      })
      
      setTable('')

      navigation.navigate('Order', {
        table,
        order_id: res.data.id
      })
      
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput 
                placeholder='Número da mesa'
                placeholderTextColor={'#f0f0f0'}
                style={styles.input}
                keyboardType='numeric'
                value={table}
                onChangeText={setTable}
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24

    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})