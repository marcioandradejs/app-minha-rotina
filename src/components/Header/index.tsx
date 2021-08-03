import Link from 'next/link'
import Image from 'next/image'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Logo Board"
            width={72}
            height={76}
          />
        </Link>
        <nav>
          <Link href="/">
           <a>Home</a>
          </Link>
          <Link href="/board">
            <a>Meu Board</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}