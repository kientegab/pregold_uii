import { Profil } from "./profil";
import { Structure } from "./structure";

export interface IUser {
    id?: number;
    matricule?: string;
    nom?:string;
    prenom?:string;
    email?:string;
    password?:string;
    profil?:Profil;
    structure?:Structure;
    
}

export class User implements IUser {
    constructor(
        public id?: number,
        public matricule?: string,
        public nom?: string,
        public prenom?: string,
        public email?: string,
        public password?: string,
        public profil?:Profil,
        public structure?:Structure
        

        
    ){}
    
}