import axios from "axios";

const instance = axios.create({
    baseURL: 'https://skill-exchange-server.vercel.app/api',
    withCredentials:true
    
  });

const useAxios = () => {
    return instance;
};

export default useAxios;