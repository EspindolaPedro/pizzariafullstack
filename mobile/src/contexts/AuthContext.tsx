import React from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credencials: signInProps) => void,
    loadingAuth: boolean,
    loading: boolean,
    signOut: () => void,
}
type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string
}
export const AuthContext = React.createContext({} as AuthContextData);

type AuthProviderProps = {
    children: React.ReactNode
}

type signInProps = {
    email: string,
    password: string,
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = React.useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    });

    const [loadingAuth, setLoadingAuth] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const isAuthenticated = !!user.name;

    React.useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@pizzariaToken');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if (Object.keys(hasUser).length > 0) {
            api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

            }
            setUser({
                id: hasUser.id,
                name: hasUser.name,
                email: hasUser.email,
                token: hasUser.token
            })
            setLoading(false)
        }
        getUser();
    }, [])

    const signIn = async ({email, password}: signInProps) => {
        setLoadingAuth(true)
        try {
            const res = await api.post('/session', {
                email,
                password
            })
            const { id, name, token } = res.data;
            const data = {
                ...res.data,
            }
            await AsyncStorage.setItem('@pizzariaToken', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({id, name, email, token}) 
            setLoadingAuth(false)

        } catch(err) {
            console.log(err)
            setLoadingAuth(false);
        }
    }
    
    const signOut = async () => {
        await AsyncStorage.clear()
        .then( () => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: '',
            })
        })
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}