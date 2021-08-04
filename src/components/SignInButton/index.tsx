import styles from './styles.module.scss';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton() {
  const session = false;

  return session ? (
    <button
    type="button"
    className={styles.signInButton}
    onClick={() => {}}
    >
    <img src="/images/steve.png" alt="Usuário 1" />
    <span>Olá Matheus</span>
    <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
    type="button"
    className={styles.signInButton}
    onClick={() => {}}
    >
      <FaGithub color="#FFB800" />
      Entrar com GitHub
    </button>
  )
}