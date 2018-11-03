import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProfessionalService } from './professional.service';
import { Professional } from '../myhealth.digital.health';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
  providers: [ProfessionalService, RestService]
})
export class ProfessionalComponent implements OnInit {
  @Input() professionalId: string;

  formValid = false;
  private professional: Professional;
  private errorMessage;
  private participant: Professional;
  update = false;
  public currentUser;

  professionalForm = new FormGroup({
  profession:  new FormControl('', Validators.required),
  experience:  new FormControl(''),
  registration: new FormControl(''),
  qualification: new FormControl(''),
  specialization: new FormControl(''),
  hospital: new FormControl(''),
  houseNumber: new FormControl(''),
  houseName: new FormControl(''),
  street : new FormControl(''),
  city : new FormControl(''),
  district : new FormControl(''),
  state : new FormControl(''),
  country : new FormControl(''),
  zipCode : new FormControl(''),
  phoneNumber : new FormControl(''),
  mobileNumber : new FormControl(''),
  email: new FormControl(''),
  Id : new FormControl('', Validators.required),
  firstName : new FormControl('', Validators.required),
  middleName : new FormControl(''),
  lastName : new FormControl('')
  });

  constructor(
    private service: ProfessionalService,
    private restservice: RestService,
    private router: Router) { }

  ngOnInit() {
    console.log('professional component');
    this.professionalForm.patchValue({
      Id: this.professionalId
    });
     this.restservice.checkWallet().subscribe(
      (results) => {
        if ( results['length'] > 0 )  {
            this.getCurrentUser();
           this.service.getparticipant(this.professionalId).subscribe(
            (result: Professional ) => {
              this.formValid = true;
              this.professional = { ... result};
              this.professionalForm.patchValue(this.professional);
              },
            error => {
              if (error === 'Server error') {
                this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
                /*this.formValid = false;*/
              } else {
                this.errorMessage = error;
                /*this.formValid = false;*/
              }
            }
          );
        } else {
        console.log('professional.component', 'No cards in the wallet');
        }
      }
    );
  }
  onSubmit() {
    this.formValid = true;
    console.warn(this.professionalForm.value);
    this.participant = {
      'profession': this.professionalForm.value.profession,
      'experience': this.professionalForm.value.experience,
    'registration': this.professionalForm.value.registration,
    'qualification': this.professionalForm.value.qualification,
    'specialization': this.professionalForm.value.specialization,
    'hospital': this.professionalForm.value.hospital,
    'houseNumber': this.professionalForm.value.houseNumber,
    'houseName': this.professionalForm.value.houseName,
    'street': this.professionalForm.value.street,
    'city': this.professionalForm.value.city,
    'district': this.professionalForm.value.district,
    'state': this.professionalForm.value.state,
    'country': this.professionalForm.value.country,
    'zipCode': this.professionalForm.value.zipCode,
    'phoneNumber': this.professionalForm.value.phoneNumber,
    'mobileNumber': this.professionalForm.value.mobileNumber,
    'email': this.professionalForm.value.email,
    'Id': this.professionalForm.value.Id,
    'firstName': this.professionalForm.value.firstName,
    'middleName': this.professionalForm.value.middleName,
    'lastName': this.professionalForm.value.lastName
    };
    if ( this.update ) {
      return this.service.updateParticipant(this.participant.Id, this.participant).subscribe(
        (response: Professional ) =>  { this.professional = response;
        },
        error => {
          if (error === 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
          } else {
            this.errorMessage = error;
          }
        }
      );
    } else {
    return this.restservice.signUp(this.participant, 'Professional')
    .then(() => {
      this.getCurrentUser();
      return this.router.navigate(['/records']);
    });
  }
 }
  getCurrentUser() {
    return this.restservice.getCurrentUser().subscribe(
      ((currentUser) => {
        this.currentUser = currentUser['participant'];
        this.professionalId = this.currentUser.slice( this.currentUser.indexOf('#') + 1);
        console.log('getCurrentUser', this.currentUser);
        console.log('getCurrentUser', this.professionalId);
      }));
  }

}
