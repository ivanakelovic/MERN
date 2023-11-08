import ApiClient from "./api-client/api-client";
import {CompanyModel} from "../models/company.model";

const COMPANIES_ENDPOINT = '/companies';

export const createCompany = async (company: CompanyModel): Promise<CompanyModel | null> => {
    return ApiClient.post(COMPANIES_ENDPOINT, company)
        .then(response => response.data)
        .then(data => new CompanyModel(data))
};

export const getCompanies = (): Promise<CompanyModel[] | null> => {
    return ApiClient.get(COMPANIES_ENDPOINT)
        .then(response => response.data)
        .then(data => data.results)
        .then(data => data.map(item => new CompanyModel(item)))
};

export const getCompany = async (companyId: CompanyModel): Promise<CompanyModel | null> => {
    return ApiClient.get(`${COMPANIES_ENDPOINT}/${companyId}`)
        .then(response => response.data)
        .then(data => new CompanyModel(data))
}
export const updateCompany = async (companyId: string, updateData: any): Promise<CompanyModel | null> => {
    return ApiClient.put(`${COMPANIES_ENDPOINT}/${companyId}`, updateData)
        .then(response => response.data)
        .then(data => new CompanyModel(data))
};