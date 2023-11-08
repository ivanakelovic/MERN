import {BaseModel} from "./base.model";
import {FileModel} from "./file.model";
import {UserModel} from "./user.model";

export class TenderModel extends BaseModel {
    title: string;
    description: string;
    deadline: Date;
    documents: FileModel;
    createdBy: UserModel;
    criteria: string;
    weightage: number;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}
