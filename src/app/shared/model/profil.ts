export interface IProfil {
    id?: number;
    libelle?: string;
    code?: string;
    
}

export class Profil implements IProfil {
    constructor(
        public id?: number,
        public libelle?: string,
        public code?: string,
        
    ){}
}