import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];


export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['signin-system@token']}`
  }
});

export function singOut() {
  destroyCookie(undefined, 'signin-system@refresh-token');
  destroyCookie(undefined, 'signin-system@token');
  
  Router.push('/');
}

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response?.status === 401) {
    /* eslint-disable */
    if (error.response?.data.code === 'token.expired') {
      cookies = parseCookies();

      const { 'signin-system@refresh-token': refreshToken } = cookies;

      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        api.post('refresh', {
          refreshToken
        }).then(response => {
          
          setCookie(undefined, 'signin-system@token', response?.data.token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          });

          setCookie(undefined, 'signin-system@refresh-token', response?.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          });

          api.defaults.headers['Authorization'] = `Bearer ${response?.data.token}`;

          failedRequestsQueue.forEach(request => request.onSuccess(response?.data.token));
          failedRequestsQueue = [];
        }).catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err));
          failedRequestsQueue = [];
        }).finally(() => {
          isRefreshing = false;
        });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {

            originalConfig.headers['Authorization'] = `Bearer ${token}`;

            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          }
        })
      })
    } else {

    }
  }
})