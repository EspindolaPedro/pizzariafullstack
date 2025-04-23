"use client";
import { Header } from "@/components/Header/Header";
import { useEffect, useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";

export default function Category() {
    useEffect(() => {
        document.title = "Nova categoria - Sujeito Programador " ;
    },[])

    const [name, setName] = useState('');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!name) {
            toast.error(`Deve preencher o nome da categoria.`)
            return;
        }

        await api.post('/category', {
            name
        });

        toast.success('Nova categoria cadastrada!');
        setName('');

    }

    return (
        <>
        <Header />
        
        <main className={styles.container}>
            
        <h1>Cadastrar Categorias</h1>

        <form className={styles.form} onSubmit={handleRegister}>
            <input 
                type="text"
                placeholder="Digite o nome da categoria"
                className={styles.input}
                value={name}
                onChange={ (e) => setName(e.target.value)}
            />

            <button type="submit" className={styles.buttonAdd}>
                Cadastrar
            </button>
        </form>

        </main>
        
        </>



    )
 } 