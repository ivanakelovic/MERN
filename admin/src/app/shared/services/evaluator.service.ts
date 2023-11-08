import ApiClient from './api-client/api-client';
import {EvaluatorModel} from "../models/evaluator.model";
import {OfferModel} from "../models/offer.model";

const EVALUATOR_ENDPOINT = '/evaluators';

export const createEvaluation = async (evaluation: EvaluatorModel): Promise<EvaluatorModel | null> => {
    return ApiClient.post(EVALUATOR_ENDPOINT, evaluation)
        .then(response => response.data)
        .then(data => new EvaluatorModel(data))
}


const getEvaluator = () => {
    return ApiClient.get(EVALUATOR_ENDPOINT)
        .then(response => response.data)
}
export const postEvaluator = async (evaluatorId: string): Promise<EvaluatorModel | null> => {
    return ApiClient.get(`${EVALUATOR_ENDPOINT}/${evaluatorId}`)
        .then(response => response.data)
        .then(data => new EvaluatorModel(data))
}
export const createEvaluator = async (evaluator: EvaluatorModel): Promise<EvaluatorModel | null> => {
    return ApiClient.post(EVALUATOR_ENDPOINT, evaluator)
        .then(response => response.data)
        .then(data => new EvaluatorModel(data))
}


export const getEvaluations = async (filters: { rating?: number, offer?: string, collaborators?: string }): Promise<EvaluatorModel[] | null> => {
    let path = EVALUATOR_ENDPOINT;

    if (filters.rating) {
        path += `rating=${filters.rating}`
    }

    if (filters.offer) {
        if (path.includes('?')) {
            path += `&offer=${filters.offer}`;
        } else {
            path += `?offer=${filters.offer}`;
        }
    }

    if (filters.collaborators) {
        if (path.includes('?')) {
            path += `&collaborators=${filters.collaborators}`;
        } else {
            path += `?collaborators=${filters.collaborators}`;
        }
    }
    const limit = 999999;
    return ApiClient.get(`${path}?limit=${limit}`)
        .then(response => response.data)
        .then(data => data.results)
        .then(data => data.map(item => new EvaluatorModel(item)))


}