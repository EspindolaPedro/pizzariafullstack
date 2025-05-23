import Link from "next/link";
import styles from "./style.module.scss"
import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean; 
    children: ReactNode;

}

export function Button( { loading, children, ...rest }: ButtonProps ) {
    return (

        <button 
        className={styles.button}
        disabled={loading}
        {...rest}
        >
            {
                loading ? (
                    <FaSpinner color="#fff" size={16}/>
                ) : (
                    <Link href="" className={styles.buttonText}>{children}</Link>
                )}
            
        </button>
    
)
}