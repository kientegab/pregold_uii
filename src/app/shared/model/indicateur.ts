export interface IIndicateur {
    id?: number;
    libelle?: string;
    
}

export class Indicateur implements IIndicateur {
    constructor(
        public id?: number,
        public libelle?: string
        
    ){}
}
