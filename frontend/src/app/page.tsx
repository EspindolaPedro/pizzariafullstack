"use client"

import styles from "@/styles/page.module.scss";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Home() {
  
  useEffect(() => {
    document.title = "PedroPizzaria - Login"; 
  }, []);
  
  
  const { signIn, } = useContext(AuthContext)
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  
 
  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error('Preencha todos os campos!');
      return;
    } 

    setLoading(true); 

    let data = {
      email,
      password
    }

    await signIn(data);
    setLoading(false);
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <h1>Pedro Pizza</h1>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}

            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}

            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar 
            </Button>

            <Link
              href="/signup"
              className={styles.text}

            >
              Não possui uma conta? Cadastre-se
            </Link>

          </form>
        </div>
      </div>
    </>
  );
}
