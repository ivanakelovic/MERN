import ApiClient from './api-client/api-client';
import {OfferModel} from "../models/offer.model";

const OFFERS_ENDPOINT = '/offers';

export const createOffer = async (offer: OfferModel): Promise<OfferModel | null> => {
    return ApiClient.post(OFFERS_ENDPOINT, offer)
        .then(response => response.data)
        .then(data => new OfferModel(data))
}
/*
export const getOffers = () => {
    return ApiClient.get(OFFERS_ENDPOINT)
        .then(response => response.data)
}*/

export const getOffers = (filters: { createdBy?: string, tender?: string, isSelected?: any }): Promise<OfferModel[] | null> => {
    let path = OFFERS_ENDPOINT;

    if (filters.createdBy) {
        path += `?createdBy=${filters.createdBy}`
    }

    if (filters.tender) {
        if (path.includes('?')) {
            path += `&tender=${filters.tender}`;
        } else {
            path += `?tender=${filters.tender}`;
        }
    }

    if (filters.isSelected) {
        if (path.includes('?')) {
            path += `&isSelected=${filters.isSelected}`;
        } else {
            path += `?isSelected=${filters.isSelected}`;
        }
    }

    return ApiClient.get(path)
        .then(response => response.data)
        .then(data => data.results)
        .then(data => data.map(item => new OfferModel(item)));
}

export const getOffer = async (offerId: string): Promise<OfferModel | null> => {
    return ApiClient.get(`${OFFERS_ENDPOINT}/${offerId}`)
        .then(response => response.data)
        .then(data => new OfferModel(data))
}


export const updateOffer = async (offerId: string, updateData: any): Promise<OfferModel | null> => {
    return ApiClient.put(`${OFFERS_ENDPOINT}/${offerId}`, updateData)
        .then(response => response.data)
        .then(data => new OfferModel(data));
};

/*
export const sendWinningOfferEmail = async (offer: OfferModel,email) => {
    try {
        const response = await ApiClient.post(`${OFFERS_ENDPOINT}`, {
            offer:offer.offer,
            isSelected:false,
            tender:offer.tender,
            createdBy:offer.createdBy
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};*/

export const sendWinningOfferEmail = async (offer: OfferModel) => {

    try {
        return ApiClient.post(`${OFFERS_ENDPOINT}/send-email`, {
            offer: offer.offer,
            tender: offer.tender,
            isSelected: offer.isSelected,
            documents: offer.documents,
            createdBy: offer.createdBy
        })
    } catch (error) {
        console.error(error);
    }

}
