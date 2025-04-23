import '@/styles/globals.scss'
import { AuthProvider } from '@/contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PedroPizzaria - Seu sistema de pedidos', // Título global
  description: 'Sistema de pedidos para sua pizzaria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={''}>
        <AuthProvider>
        {children}
        <ToastContainer autoClose={3000}/>
        </AuthProvider>
      </body>
    </html>
  );
}
