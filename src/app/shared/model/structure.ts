import { Ministere } from "./ministere";

export interface IStructure {
    id?: number;
    libelle?: string;
    sigle?:string;
    ministere?:Ministere;
}

export class Structure implements IStructure {
    constructor(
        public id?: number,
        public libelle?: string,
        public sigle?:string,
        public ministere?:Ministere,
    ){}
}