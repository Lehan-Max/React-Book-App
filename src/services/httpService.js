import axios from "axios";
import { toast } from 'react-toastify';
import logger from './logService';

axios.interceptors.response.use(null, error => {
    const expectedError = 
        error.response && 
        error.response.status >= 400 && 
        error.response <500;
  
    if (!expectedError) {
      logger.log(error);
      toast.error('An Unexpected Error occoured!');
      console.log('working')
    }
  
    return Promise.reject(error);
  }
);

const http = {
    get: axios.get,
    put: axios.put,
    delete: axios.delete,
    post: axios.post
}

export default http;

