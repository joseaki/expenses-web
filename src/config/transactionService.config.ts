import axios from 'axios';
import { getAuth } from 'firebase/auth';

const transactionInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TRANSACTION_URL}/api`,
});

transactionInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuth().currentUser?.getIdToken();
    config.headers.Authorization = `bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default transactionInstance;
