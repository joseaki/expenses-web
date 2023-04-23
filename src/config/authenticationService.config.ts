import axios from 'axios';

const authenticationInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/api`,
});

export default authenticationInstance;
