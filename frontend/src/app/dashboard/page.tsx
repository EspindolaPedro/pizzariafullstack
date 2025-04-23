"use client";
import { useContext, useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { api } from "@/services/apiClient";
import Modal from 'react-modal';
import { ModalOrder } from "@/components/ModalOrder/ModalOrder";


Modal.setAppElement('body');

type OrderProps = {
    id: string,
    table: string | number,
    status: boolean,
    draft: boolean,
    name: string | null,
}

export type OrderItemProps = {
    id: string,
    amout: number,
    order_id: string,
    product_id: string,
    product: {
        id: string,
        name: string,
        price: string,
        description: string,
        banner: string,        
    },
    order: {
        id: string,
        table: string | number,
        status: string | null,
        
    }
}

export default function Dashboard() {
    useEffect(() => {
        document.title = `Painel - PedroPizza`;
    }, []);

    const [orderList, setOrderList] = useState<OrderProps[]>([])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const getOrders = async () => {
        setIsLoading(true);
        const res = await api.get('/orders');
        setOrderList(res.data);
        setIsLoading(false);
    }
    
    useEffect(() => {
        getOrders();

        const intervalId = setInterval( async () => {
            getOrders();
        }, 300); 

        return () => clearInterval(intervalId);
    }, []);  


    const closeModal = () => {
        setModalVisible(false);
    }

    const handleView = async (id: string) => {
        try {
            const res = await api.get('/order/detail', {
                params:{
                     order_id: id
                }
            });
            setModalItem(res.data);
            setModalVisible(true);
        } catch (err) {
            console.log(err)
        }
    }

    const handleFinishItem = async (id: string) => {
        const res = await api.put('/order/finish', {
            order_id: id
        })
        getOrders()
        setModalVisible(false)
    }
    
    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>

                    <button onClick={getOrders}>
                        < FiRefreshCcw size={25} color="#3fffa3"  style={{
                        transition: "transform 0.30s ease-in",  // Suaviza a rotação
                        transform: isLoading ? "rotate(360deg)" : "rotate(0deg)",  // Rotaciona 360 graus
                    }}/>
                    </button>
                </div>

                <article className={styles.listOrders}>

                    {orderList.length == 0 && (
                        <span className={styles.emptyList}>
                            Nenhum pedido aberto foi encontrado...
                        </span>
                    ) }

                    {orderList.map((item) => (
                        <section key={item.id} className={styles.orderItem}>
                            <button onClick={ () => handleView(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))

                    }

                </article>

            </main>
            { modalVisible && 
                <ModalOrder 
                isOpen={modalVisible}
                onRequestClose={closeModal}
                order={modalItem}
                handleFinishOrder={handleFinishItem}
                />            
            }
        </>
    )
}