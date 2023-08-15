export interface IMinistere {
    id?: number;
    libelle?: string;
    sigle?:string;
}

export class Ministere implements IMinistere {
    constructor(
        public id?: number,
        public libelle?: string,
        public sigle?:string
    ){}
}
