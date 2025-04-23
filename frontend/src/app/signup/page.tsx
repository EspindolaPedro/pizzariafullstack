"use client";
import styles from "@/styles/page.module.scss";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

  export default function SignUp() {

    useEffect(() => {
      document.title = "PedroPizzaria - Cadastre-se "; // Definindo manualmente o título
    }, []);
    
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (email == '' || password == '' || name == '') {
      toast.error('Preencha todos os campos!')
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }
    await signUp(data);

    setLoading(false);
    
  }

  return (
    <>
   
    <div className={styles.containerCenter}>
      <h1>Pedro Pizza</h1>

      <div className={styles.login}>

        <h2 className={styles.h2Head}>Criando sua Conta</h2>

        <form onSubmit={handleSignUp}>
          <Input
           placeholder="Digite seu nome"
           type="text"
           value={name}
           onChange={ (e) => setName(e.target.value)}
           />

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
           href="/"
            className={styles.text}

          >
            Já possui uma conta? Faça login.
          </Link>

        </form>

      </div>


    </div>
    </>


  );
}
