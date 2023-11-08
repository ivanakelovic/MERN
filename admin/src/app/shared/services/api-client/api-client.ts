import {AxiosResponse} from 'axios';
import axiosInstance from './axiosInstance';

const prepareQuery = (query?: string): string => {
    return query ? '?' + queryObjectToString(query) : '';
}

export const queryObjectToString = (query) => {
    let str = '';

    Object.keys(query).forEach(key => (str += query[key] ? `&${key}=${query[key]}` : ''));
    return str.substring(1, str.length);
}
const get = (endpoint: string, query?: any): Promise<AxiosResponse> => {
    return axiosInstance.get(`${endpoint}${prepareQuery(query)}`);
};

const post = (endpoint: string, body: any, query: string = ''): Promise<AxiosResponse> => {
    return axiosInstance.post(`${endpoint}${query}`, body);
};

const put = (endpoint: string, body: any, query: string = ''): Promise<AxiosResponse> => {
    return axiosInstance.put(`${endpoint}${query}`, body);
};

const remove = (endpoint: string, query: string = ''): Promise<AxiosResponse> => {
    return axiosInstance.delete(`${endpoint}${query}`);
};

const postFormData = (endpoint: string, formData: FormData, query: string = ''): Promise<AxiosResponse> => {
    return axiosInstance.post(`${endpoint}${query}`, formData);
};

const ApiClient = {get, post, put, remove, postFormData};

export default ApiClient;
