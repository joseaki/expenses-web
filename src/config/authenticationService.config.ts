import axios from 'axios';

const authenticationInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AUTHENTICATION_URL}/api`,
});

export default authenticationInstance;
