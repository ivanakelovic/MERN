import {BaseModel} from "./base.model";

export class CompanyModel extends BaseModel {
    name: string;
    businessType: string;
    address: string;
    phoneNumber: string;
    website: string;
    companySize: number;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}
