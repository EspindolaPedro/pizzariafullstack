import React from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator

} from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn () {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const { signIn, loadingAuth } = React.useContext(AuthContext);

    const handleLogin = async () => {
        
        if (!email || !password) return alert('Preencha todos os campos');

        await signIn({ email, password });

    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Digite seu email'
                style={styles.input}
                placeholderTextColor={'#f0f0f0'}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput 
                placeholder='Digite sua senha'
                style={styles.input}
                placeholderTextColor={'#f0f0f0'}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity  style={styles.button} onPress={handleLogin}>
                { loadingAuth ? (
                    <ActivityIndicator size={25} color={'#fff'}/>   
                ) : (
                    <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#101026'}}>Acessar</Text>
                )
            }
            </TouchableOpacity>

        </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    text: {
        textAlign: 'center', 
    },
    logo: {
        marginBottom:18
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14,
        
    }, 
    input: {
        width: '95%',
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        color: '#fff',
        padding: 14,
    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
