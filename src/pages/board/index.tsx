import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash, FiX } from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton';
import styles from './styles.module.scss';
import Link from 'next/link';

import firebase from '../../services/firebaseConnection';
import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'


type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
}
interface BoardProps {
  user:{
    id: string;
    nome: string;
    vip: boolean;
    lastDonate: string | Date;
  }
  data: string
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState('');
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));

  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();
    
    if(input === '') {
      alert('Escreva uma tarefa')
      return;
    }

    if(taskEdit) {
      await firebase.firestore().collection('tarefas').doc(taskEdit.id).update({
        tarefa: input
      })
      .then(() => {
        let data = taskList;
        let taskIndex = taskList.findIndex(item => item.id === taskEdit.id);
        data[taskIndex].tarefa = input;

        setTaskList(data);
        setTaskEdit(null);
        setInput('');
      })
      return;
    }

    await firebase.firestore().collection('tarefas').add({
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

  async function handleDelete(id:string) {
    await firebase.firestore().collection('tarefas').doc(id).delete()
    .then(() => {
      let taksDeleted = taskList.filter( item => {
        return (item.id !== id)
      })

      setTaskList(taksDeleted);
      
    }).catch((err) => {
      console.log(err)
    })
  }

   function handleEditTask(task: TaskList) {
     setTaskEdit(task);
     setInput(task.tarefa);
   }

   function handleCancelEdit() {
     setInput('');
     setTaskEdit(null);
   }


  return(
    <>
    <Head>
      <title>Minhas tarefas - Board</title>
    </Head>
    <main className={styles.container}>

      {taskEdit && (
        <div className={styles.warnText}>
          <button onClick={ handleCancelEdit }>
            <FiX size={30} color="#FF3636" />
          </button>
          <span>Você está editando uma tarefa!</span>
        </div>
      )}


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
      <h1>Você tem {taskList.length} {taskList.length === 1 ? 'tarefa' : 'tarefas'}!</h1>
      <section>
        {taskList.map(task => (
          <article key={task.id} className={styles.taskList}>
            <Link href={`/board/${task.id}`}>
              <a>
                <p>{task.tarefa}</p>
              </a>
            </Link>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>{task.createdFormated}</time>
                </div>
                {user.vip && (
                  <button onClick={ () => handleEditTask(task) }>
                    <FiEdit2 size={20} color="#FFF" />
                    <span>Editar</span>
                  </button>
                )}
              </div>
              <button onClick={ () => handleDelete(task.id) }>
                <FiTrash size={20} color="#FF3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
    {user.vip && (
      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar este projeto.</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>
            Última doação foi há {formatDistance(new Date(user.lastDonate), new Date(), { locale: ptBR })}
          </time>
        </div>
      </div>
    )}
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

  const tasks = await firebase.firestore().collection('tarefas')
  .where('userId', '==', session?.id)
  .orderBy('created', 'asc').get();

  const data = JSON.stringify(tasks.docs.map( item => {
    return {
      id: item.id,
      createdFormated: format(item.data().created.toDate(), 'dd MMMM yyyy'),
      ...item.data(),
    }
  }));

  const user = {
    nome: session?.user.name,
    id: session?.id,
    vip: session?.vip,
    lastDonate: session?.lastDonate
  }

  return{
    props:{
      user,
      data
    }
  }
}