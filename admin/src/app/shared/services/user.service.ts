import ApiClient from './api-client/api-client';
import {UserModel} from "../models/user.model";
import {CompanyModel} from "../models/company.model";

const USERS_ENDPOINT = '/users';
export const getUsers = (query?: any): Promise<[any, UserModel[]] | null> => {
    return ApiClient.get(USERS_ENDPOINT, query)
        .then(response => response.data)
        .then(data => [{
            page: data.page,
            limit: data.limit,
            totalPages: data.totalPages,
            totalResults: data.totalResults
        }, data.results.map(item => new UserModel(item))])
}
export const getUser = (userId: string): Promise<UserModel | null> => {
    return ApiClient.get(`${USERS_ENDPOINT}/${userId}`)
        .then(response => response.data)
        .then(data => new UserModel(data))
}

export const updateUser = async (userId: string, updateData: any): Promise<UserModel | null> => {
    return ApiClient.put(`${USERS_ENDPOINT}/${userId}`, updateData)
        .then(response => response.data)
        .then(data => new UserModel(data))
};

export const deleteUser = async (userId) => {
    return ApiClient.remove(`${USERS_ENDPOINT}/${userId}`)
        .then(response => response.data)
        .then()
}











