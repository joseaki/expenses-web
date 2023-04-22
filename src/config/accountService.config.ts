import axios from "axios";

const accountInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ACCOUNT_URL}/api`,
});

export default accountInstance;
