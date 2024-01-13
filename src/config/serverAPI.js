
import axios from 'axios'

const serverAPI =  axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    // headers: {'X-Custom-Header': 'foobar'}
  });
export default serverAPI;