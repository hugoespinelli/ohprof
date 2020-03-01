import axios from 'axios';

class Requester {
  constructor() {
    this.instance = axios.create({
      // baseURL: 'https://private-5e878-ohprof.apiary-mock.com',
      baseURL: 'http://localhost:3000',
      timeout: 10000
    })
  }

  get base_instance() {
    return this.instance;
  }
}

export default new Requester().base_instance;
