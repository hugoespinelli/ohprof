import axios from 'axios';

class Requester {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://private-5e878-ohprof.apiary-mock.com',
      // baseURL: 'http://192.168.99.1:5000',
      // baseURL: 'http://localhost:5000',
      timeout: 10000
    })
  }

  get base_instance() {
    return this.instance;
  }
}

export default new Requester().base_instance;
