import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace myhealth.digital.health{
   export abstract class Individual extends Participant {
      Id: string;
      firstName: string;
      middleName: string;
      lastName: string;
   }
   export enum MaritalStatus {
      Single,
      Married,
   }
   export enum Gender {
      Male,
      Female,
      Other,
   }
   export enum BloodGroup {
      Opositive,
      Onegative,
      ABpositive,
      ABnegative,
      Bpositive,
      Bnegative,
      Apositive,
      Anegative,
   }
   export class Address {
      houseNumber: string;
      houseName: string;
      street: string;
      city: string;
      district: string;
      state: string;
      country: string;
      zipCode: string;
   }
   export class Communication {
      phoneNumber: string;
      mobileNumber: string;
      email: string;
   }
   export class User extends Individual {
      age: number;
      maritalStatus: MaritalStatus;
      gender: Gender;
      bloodGroup: BloodGroup;
      houseNumber: string;
      houseName: string;
      street: string;
      city: string;
      district: string;
      state: string;
      country: string;
      zipCode: string;
      phoneNumber: string;
      mobileNumber: string;
      email: string;
      authorized: Professional[];
   }
   export class Professional extends Individual {
      profession: string;
      experience: string;
      registration: string;
      qualification: string;
      specialization: string;
      hospital: string;
      houseNumber: string;
      houseName: string;
      street: string;
      city: string;
      district: string;
      state: string;
      country: string;
      zipCode: string;
      phoneNumber: string;
      mobileNumber: string;
      email: string;
   }
   export class Records extends Asset {
      recordId: string;
      owner: string;
      authorized: string[];
      description: string;
      hospital: string;
      doctor: string;
      createdOn: Date;
      lastModified: Date;
      summary: string;
      diagnosis: string;
      labReports: string;
      prescription: string;
   }
   export class Authorize {
      recordId: string;
      Id: string;
   }
   export class AuthorizeRecordView extends Transaction {
      auth: Authorize;
   }
// }
