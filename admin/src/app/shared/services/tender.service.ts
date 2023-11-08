import ApiClient from './api-client/api-client';
import {TenderModel} from "../models/tender.model";

const TENDER_ENDPOINT = '/tenders';
export const getTenders = (query?: any): Promise<[any, TenderModel[]] | null> => {
    return ApiClient.get(TENDER_ENDPOINT, query)
        .then(response => response.data)
        .then(data => [{
            page: data.page,
            limit: data.limit,
            totalPages: data.totalPages,
            totalResults: data.totalResults
        }, data.results.map(item => new TenderModel(item))])
}
export const getTender = async (tenderId: string): Promise<TenderModel | null> => {
    return ApiClient.get(`${TENDER_ENDPOINT}/${tenderId}`)
        .then(response => response.data)
        .then(data => new TenderModel(data))
}

export const createTender = async (tender: TenderModel): Promise<TenderModel | null> => {
    return ApiClient.post(TENDER_ENDPOINT, tender)
        .then(response => response.data)
        .then(data => new TenderModel(data))
}
export const deleteTender = async (tenderId) => {
    return ApiClient.remove(`${TENDER_ENDPOINT}/${tenderId}`)
        .then(response => response.data)
        .then()

}

// export const getTenderCount = async (status) => {
//     return ApiClient.get(`${TENDER_ENDPOINT}/${status}/count`)
//         .then(response => response.data)
//         .then(data => data.result);
//
// }








