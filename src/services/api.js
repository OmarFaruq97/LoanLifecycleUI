import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8080"
});

export const getLoans = (page =0) => API.get(`/loans?page=${page}`);
export const getSummary = (id) => API.get(`/loans/${id}/summary`);
export const postPayment = (data) => API.post(`/payments`, data);
export const createLoan = (data) => API.post(`/loans`, data);