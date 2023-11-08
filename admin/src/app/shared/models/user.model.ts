import {BaseModel} from "./base.model";
import {CompanyModel} from "./company.model";
import {FileModel} from "./file.model";

export class UserModel extends BaseModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isEmailVerified: string;
    company: CompanyModel;
    password: string;
    documents: FileModel;
    isBlocked: boolean;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}