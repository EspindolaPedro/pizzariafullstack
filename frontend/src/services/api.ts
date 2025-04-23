import axios, { AxiosError } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupApiClient(ctx = undefined) {
    let cookies = parseCookies(ctx);
    const token = cookies['@nextAuth.token'];

    const api = axios.create({
        baseURL: 'http://192.168.100.194:3333',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    });

    api.interceptors.response.use(
        response =>  response,
        (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                destroyCookie(undefined, '@nextAuth.token');
                window.location.href = '/';
            }
            return Promise.reject(new AuthTokenError());
        }
        return Promise.reject(error);
    });

    return api;
}
