import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';

import { User } from '../myhealth.digital.health';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService, RestService]
})

export class ProfileComponent implements OnInit {

  @Input() myId: string;

  formValid = false;
  private user: User;
  private errorMessage;
  private participant;
  update = false;
  public currentUser;

  profileForm = new FormGroup({
  age:  new FormControl(''),
  maritalStatus:  new FormControl('', Validators.required),
  gender: new FormControl('', Validators.required),
  bloodGroup: new FormControl('', Validators.required),
  houseNumber : new FormControl(''),
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
  authorized : new FormControl(''),
  Id : new FormControl('', Validators.required),
  firstName : new FormControl('', Validators.required),
  middleName : new FormControl(''),
  lastName : new FormControl('')
  });
  constructor(private service: ProfileService,
     private restservice: RestService,
     private router: Router) {
   /* this.profileForm.setValue({
      'age': null,
      'maritalStatus': null,
      'gender': null,
      'bloodGroup': null,
      'houseNumber': null,
      'houseName': null,
      'street': null,
      'city': null,
      'district': null,
      'state': null,
      'country': null,
      'zipCode': null,
      'phoneNumber': null,
      'mobileNumber': null,
      'email': null,
      'authorized': null,
      'firstName': null,
      'middleName': null,
      'lastName': null
    });*/
   }

    ngOnInit() {
      this.profileForm.patchValue({
        Id: this.myId
      });
       this.restservice.checkWallet().subscribe(
        (results) => {
          if ( results['length'] > 0 )  {
              this.getCurrentUser();
             this.service.getparticipant(this.myId).subscribe(
              (result: User ) => {
                this.formValid = true;
                this.user = { ... result};
                this.profileForm.patchValue(this.user);
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
          console.log('profile.component', 'No cards in the wallet');
          }
        }
      );
    }


    onSubmit() {
      this.formValid = true;
      console.warn(this.profileForm.value);
      const auth = [ 'resource:myhealth.digital.health.Professional#' + this.profileForm.value.authorized ];
      this.participant = {
        'age': this.profileForm.value.age,
        'maritalStatus': this.profileForm.value.maritalStatus,
      'gender': this.profileForm.value.gender,
      'bloodGroup': this.profileForm.value.bloodGroup,
      'houseNumber': this.profileForm.value.houseNumber,
      'houseName': this.profileForm.value.houseName,
      'street': this.profileForm.value.street,
      'city': this.profileForm.value.city,
      'district': this.profileForm.value.district,
      'state': this.profileForm.value.state,
      'country': this.profileForm.value.country,
      'zipCode': this.profileForm.value.zipCode,
      'phoneNumber': this.profileForm.value.phoneNumber,
      'mobileNumber': this.profileForm.value.mobileNumber,
      'email': this.profileForm.value.email,
      'authorized': auth,
      'Id': this.profileForm.value.Id,
      'firstName': this.profileForm.value.firstName,
      'middleName': this.profileForm.value.middleName,
      'lastName': this.profileForm.value.lastName
      };
      if ( this.update ) {
        return this.service.updateParticipant(this.participant.Id, this.participant).subscribe(
          (response: User ) =>  { this.user = response;
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
      return this.restservice.signUp(this.participant, 'User')
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
        this.myId = this.currentUser.slice( this.currentUser.indexOf('#') + 1);
        console.log('getCurrentUser', this.currentUser);
        console.log('getCurrentUser', this.myId);
      }));
  }
  }
