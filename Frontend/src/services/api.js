import axios from 'axios';

const api = axios.create({
  baseURL: 'http:///api', // This should match your backend
});

export const getRoadmaps = () => api.get('/roadmaps');