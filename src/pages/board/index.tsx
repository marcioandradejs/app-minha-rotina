import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton';
import styles from './styles.module.scss';
import Link from 'next/link';

import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

interface BoardProps {
  user:{
    id: string;
    nome: string;
  }
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState('');
  const [taskList, setTaskList] = useState([]);

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();
    
    if(input === '') {
      alert('Escreva uma tarefa')
      return;
    }

    await firebase.firestore().collection('Tarefas').add({
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.nome
    })
    .then((doc) => {
      console.log('cadastrado com sucesso')
      let data = {
        id: doc.id,
        created: new Date(),
        createdFormated: format(new Date(), 'dd MMMM yyyy'),
        tarefa: input,
        userId: user.id,
        nome: user.nome
      };

      setTaskList([...taskList, data]);
      setInput('');

    })
    .catch((err) => {
      console.log('Erro: ', err)
    })
  }


  return(
    <>
    <Head>
      <title>Minhas tarefas - Board</title>
    </Head>
    <main className={styles.container}>
      <form onSubmit={handleAddTask}>
        <input 
        type="text" 
        placeholder="Digite sua terefa..."
        value={input}
        onChange={ (e) => setInput(e.target.value) }
        />
        <button type="submit">
          <FiPlus size={25} color="#17181f" />
        </button>
      </form>
      <h1>Você tem 2 tarefas!</h1>
      <section>
        {taskList.map(task => (
          <article key={task.id} className={styles.taskList}>
            <Link href={`/board/${task.id}`}>
              <p>{task.tarefa}</p>
            </Link>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>{task.createdFormated}</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF" />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash size={20} color="#FF3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
    <div className={styles.vipContainer}>
      <h3>Obrigado por apoiar este projeto.</h3>
      <div>
        <FiClock size={28} color="#FFF" />
        <time>
          Última doação foi há 3 dias
        </time>
      </div>
    </div>
    <SupportButton />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(!session?.id){
    // Se o usuario não estiver logado, vamos redirecionar.
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    nome: session?.user.name,
    id: session?.id
  }

  return{
    props:{
      user
    }
  }
}