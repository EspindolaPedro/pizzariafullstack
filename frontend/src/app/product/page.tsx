"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Header } from '@/components/Header/Header';
import { FiUpload } from 'react-icons/fi'
import Image from 'next/image';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';

type ItemProps = {
    id: string,
    name: string,
}



export default function Product() {
    useEffect(() => {
        document.title = "Novo Produto - PedroPizza"
    }, [])


    const [avatar, setAvatar] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    const [categories, setCategories] = useState<ItemProps[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(``);

    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {

            setImageAvatar(image);
            setAvatar(URL.createObjectURL(image))

        }

    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get('/category');

                setCategories(response.data);

            } catch {
                toast.error('Erro na busca das categorias');
                return [];
            }
        }

        getCategories();
    }, [])

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = new FormData();
            if (!name || !price || !description || !imageAvatar) {
                toast.error(`Preencha todos os campos!`)
                return;
            }
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', selectedCategory);
            data.append('file', imageAvatar);

            await api.post('/product', data)
            toast.success('Produto cadastrado com sucesso!')

            setName('');
            setPrice('');
            setDescription('');
            setImageAvatar(null);

        } catch(err) {
            console.log(err)
            toast.error('Erro ao cadastrar.')
        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>

                        <span>
                            <FiUpload
                                size={30}
                                color="#fff"
                            />
                        </span>

                        <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                        {avatar && (
                            <Image alt='Foto do produto'
                                className={styles.preview}
                                src={avatar}
                                width={250}
                                height={250} />
                        )
                        }

                    </label>


                    <select name="category" id="category" value={selectedCategory} onChange={ (e) =>  setSelectedCategory(e.target.value) }>
                        { categories === null ? (
                            <option value="">
                                Categorias não encontradas
                            </option>
                        ) : (

                            categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))
                        )
                        }
                    </select>

                    <input
                        type="text"
                        placeholder='Digite o nome do produto'
                        className={styles.input}
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Preço do Produto'
                        className={styles.input}
                        value={price}
                        onChange={ (e) => setPrice(e.target.value)}
                    />

                    <textarea 
                        placeholder='Descreva seu produto'
                        className={styles.input}
                        value={description}
                        onChange={ (e) => setDescription(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>

                </form>


            </main>
        </>
    )

}