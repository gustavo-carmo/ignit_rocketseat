import { createContext, ReactNode, useEffect, useState } from "react";
import { api, singOut } from "../services/api";
import { parseCookies, setCookie } from 'nookies';
import Router from 'next/router';

type CredentialsProps = {
  email: string;
  password: string;
}

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type AuthContextProps = {
  signIn(credentials: CredentialsProps): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'signin-system@token': token } = parseCookies();

    if (token) {
      api.get('me').then(response => {
        const { email, permissions, roles } = response?.data;

        setUser({
          email,
          permissions,
          roles
        });
      }).catch(() => {
        singOut();
      });
    }
  }, [])

  async function signIn({ email, password }: CredentialsProps) {
    try {
      const { data } = await api.post('sessions', { email, password });
      const { permissions, roles, token, refreshToken } = data;

      setCookie(undefined, 'signin-system@token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setCookie(undefined, 'signin-system@refresh-token', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        email,
        permissions,
        roles
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}