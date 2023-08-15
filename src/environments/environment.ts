// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const domaineUrl="http://localhost:4200";
export const baseUrl="http://localhost:8082/api";
export const environment = {
  production: false,
  recordsPerPage: 10,
  domaine:`${domaineUrl}`,
  ministereResource: `${baseUrl}/ministere`,
  structureResource: `${baseUrl}/structure`,
  activiteResource: `${baseUrl}/activite`,
  indicateurResource: `${baseUrl}/indicateur`,
  profilResource: `${baseUrl}/profil`,
  documentResource: `${baseUrl}/document`,
  userResource: `${baseUrl}/compte`,
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
