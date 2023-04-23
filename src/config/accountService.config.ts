import axios from 'axios';
import { getAuth } from 'firebase/auth';

const accountInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/api`,
});

accountInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuth().currentUser?.getIdToken();
    config.headers.Authorization = `bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default accountInstance;
