import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <>
    <Head>
      <title>Board - Organizando suas tarefas</title>
    </Head>
    <main className={styles.contentContainer}>
      <img src="/images/board-user.svg" alt="Ferramenta Board" />
       <section className={styles.callToAction}>
         <h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..</h1>
         <p>
           <span>100% Gratuita</span> e online
          </p>
       </section>

       <div>
         <h2 className={styles.apoiador}>Apoiadores:</h2>
         <div className={styles.donaters}>
            <img src="/images/steve.png" alt="Usuário 1" />
            <img src="/images/steve.png" alt="Usuário 1" />
            <img src="/images/steve.png" alt="Usuário 1" />
            <img src="/images/steve.png" alt="Usuário 1" />
         </div>
       </div>
    </main>
    </>
  );
}
