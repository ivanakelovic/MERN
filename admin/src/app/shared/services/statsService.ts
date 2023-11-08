import ApiClient from './api-client/api-client';

const STATS_ENDPOINT = '/stats';

export const getStats = async ()=>{
    return ApiClient.get(`${STATS_ENDPOINT}`)
        .then(response => response.data);
}

export const getChartData = async (query?: any)=>{
    return ApiClient.get(`${STATS_ENDPOINT}/chart`,query) //sending along the query params
        .then(response => response.data);
}