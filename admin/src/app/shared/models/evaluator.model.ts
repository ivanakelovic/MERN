import {BaseModel} from "./base.model";
import {OfferModel} from "./offer.model";

export class EvaluatorModel extends BaseModel {
    rating: number;
    comment: Date;
    collaborators: string;
    offer: OfferModel;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }
};