import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { OrderItemProps } from '@/app/dashboard/page';

interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    order: OrderItemProps[];
    handleFinishOrder: (id: string) => void,

}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }: ModalProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            backgroundColor: '#1d1d2e',
            transform: 'translate(-50%, -50%)'
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border:0 }}
            >
                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>
                <h2>Detalhes do pedido</h2>

                <span className={styles.table}>
                    Mesa: <strong>{order[0]?.order.table}</strong>
                </span>

                {order?.map( item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amout} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))

                }

                <button className={styles.buttonOrder} onClick={ () => handleFinishOrder(order[0].order_id) }>
                    Concluir pedido
                </button>

            </div>

        </Modal>
    )

}