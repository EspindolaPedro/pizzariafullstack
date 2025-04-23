"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { AuthTokenError } from "@/services/errors/AuthTokenError";

type UserContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as UserContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;

    const router = useRouter();


    useEffect(() => {
        const fetchUser = async () => {
            const { '@nextAuth.token': token } = parseCookies();
            if (token) {
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                try {
                    const { data } = await api.get('/me');
                    const { id, name, email } = data;
                    setUser({ id, name, email });
                } catch (err) {
                    signOut();
                }
            } else {
                signOut();
            }
        }
        fetchUser();
    }, []);

    async function signIn({ email, password }: SignInProps) {
        try {
            const res = await api.post('/session', { email, password });

            const { id, name, token } = res.data;

            if (!token) {
                toast.error('token inválido!');
                return;
            }

            setCookie(undefined, '@nextAuth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
                sameSite: 'lax',
                //secure: process.env.NODE_ENV === 'production',

            });

            setUser({ id, name, email });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success('Logado com sucesso!');
            router.push("/dashboard");

        } catch (err) {
            if (err instanceof AuthTokenError) {
                toast.error('Token inválido, por favor faça login novamente.');
            } else {
                toast.error('Erro no login, tente novamente.');
            }
            console.log(`Erro ${err}`);
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const res = await api.post('/users', { name, email, password });
            toast.success('Cadastrado com sucesso!');
            router.push('/');
        } catch (err) {
            if (err instanceof AuthTokenError) {
                toast.error('Erro com autenticação, por favor faça login novamente.');
            } else {
                toast.error('Erro ao acessar');
            }
            console.log(`Erro ${err}`);
        }
    }

    function signOut() {
            destroyCookie(undefined, '@nextAuth.token');
            setUser(null);
            router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
