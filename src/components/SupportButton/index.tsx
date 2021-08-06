import Link from 'next/link'
import styles from './styles.module.scss'

export function SupportButton() {
  return(
    <div className={styles.donateContainer}>
      <Link href="/donate">
        <a>
          <button>Apoiar</button>
        </a>
      </Link>
    </div>
  )
}