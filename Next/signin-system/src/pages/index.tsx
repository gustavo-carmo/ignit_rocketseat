import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from '../styles/home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isAuthenticated } = useContext(AuthContext);


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await signIn({ email, password });
  }

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const cookies = parseCookies(ctx);

  if (cookies['signin-system@token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}