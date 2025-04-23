import Link from "next/link"
import styles from "./styles.module.scss"
import { FiLogOut } from "react-icons/fi"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

export function Header() {

    const {signOut} = useContext(AuthContext);
    
    return (


        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link className={styles.h1s} href="/dashboard">
                    <h1>PEDROPIZZA</h1>
                </Link>
                <nav className={styles.menuNav}>

                    <Link href={`/category`}>
                       Nova Categoria
                    </Link>

                    <Link href={`/product`}>
                        Produto
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={24} />
                    </button>
                </nav>
            </div>


        </header>
    )
}