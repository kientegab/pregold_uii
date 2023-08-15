export interface IDocument {
    id?: number;
    libelle?: string;
    description?:string;
    status?:string;
    chemin?:string;
    type?:string;
    format?:string;
    
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public libelle?: string,
        public description?: string,
        public status?: string,
        public chemin?: string,
        public type?: string,
        public format?: string

        
    ){}
    
}