import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU2YTE5YTFhZWM4OTZkNjQ5Nzg2YTQzZDVhOTQ3MSIsInN1YiI6IjY2MWFiOGFmOGMzMTU5MDE1ZmMwZjlmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FOxgveLucyo-4u0fvX0BBEvcXJV-C4bE9dlcRlmtNZo'
      },
});

export default instance;