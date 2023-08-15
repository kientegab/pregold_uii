import { Indicateur } from "./indicateur";
import { Structure } from "./structure";
import { Document } from "./document";

export interface IActivite {
    id?: number;
    libelle?: string;
    ville?: string;
    date?: Date;
    nombre_participants?: number;
    resultat_obtenu?: string;
    indicateur?: Indicateur;
    structure?: Structure;
    document?: Document;
}

export class Activite implements IActivite {
    constructor(
        public id?: number,
        public libelle?: string,
        public ville?: string,
        public date?: Date, 
        public nombre_participants?: number,
        public resultat_obtenu?: string,
        public indicateur?: Indicateur,
        public structure?: Structure,
        public document?: Document
    ) { }
}
