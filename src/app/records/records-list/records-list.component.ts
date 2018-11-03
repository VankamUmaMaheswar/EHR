import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RecordsService } from '../Records.service';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { Observable } from 'rxjs';
import { Records, Professional } from '../../myhealth.digital.health';
import { ElementDef } from '@angular/core/src/view';




@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
  providers: [RecordsService]
})
export class RecordsListComponent implements OnInit {

  allAssets: Records[];
  private asset: Records;
  private currentId;
  private errorMessage;
  private recordId;
  showRecordTemplate = false;
  expand = false;
  public fileText;
  private fileType: string;
  expandrecord = [];
  authorize = [];
  userRecordId;
  timestampRecordId;
  file: File;
  loaded;
  pdfSummary = false;
  pdfSrc;
  summaryPage = 1;
  summaryRotation = 0;
  summaryZoom = 1.0;
  diagnosisPage = 1;
  diagnosisRotation = 0;
  diagnosisZoom = 1.0;
  labReportPage = 1;
  labReportRotation = 0;
  labReportZoom = 1.0;
  prescriptionPage = 1;
  prescriptionRotation = 0;
  prescriptionZoom = 1.0;
  pdfSummaryDisplay = [];
  pdfDiagnosis = false;
  pdfDiagnosisDisplay = [];
  index1;
  index2;
  type;
  pdfLabReportsDisplay = [];
  pdfPrescriptionDisplay = [];
  pdfLabReport = false;
  pdfPrescription = false;
  urls = new Array<string>();
  imgLabReports = false;
  imgLabReportsDisplay = [];




  recordForm = new FormGroup ({
  recordId: new FormControl('', Validators.required),
  owner: new FormControl(''),
  authorized: new FormControl(''),
  description: new FormControl(''),
  hospital: new FormControl(''),
  doctor: new FormControl(''),
  createdOn: new FormControl(''),
  lastModified: new FormControl(''),
  summary: new FormControl(''),
  diagnosis: new FormControl(''),
  labReports: new FormControl(''),
  prescription: new FormControl('')
  });
  constructor(public recordservice: RecordsService) {
    this.recordId = 1;
  }

  ngOnInit() {
    this.loadAll();
    this.expand = false;
  }

   loadAll() {
     const tempList: Records[] = [];
     return this.recordservice.getAll().subscribe(
       (result) => {
         result.forEach(asset => {
           tempList.push(asset);
         });
         this.allAssets = tempList;
         this.recordId = tempList.length + 1;
         for ( let i = 0; i < tempList.length; i++ ) {
            this.expandrecord[i] = false;
           /* this.allAssets[i].recordId =  this.allAssets[i].recordId.slice(this.allAssets[i].recordId.indexOf('_') + 1 );*/
            if ( this.allAssets[i].authorized ) {
              console.log('Record Authorization', this.allAssets[i].authorized[0], this.allAssets[i].recordId, i );
               this.authorize[i + 1] = this.allAssets[i].authorized[0].slice(this.allAssets[i].authorized[0].indexOf('#') + 1);
               console.log('Authorize', this.authorize[i + 1], i);
            }
            this.index1 = this.allAssets[i].summary.indexOf(':');
            this.index2 = this.allAssets[i].summary.indexOf(';');
            this.type = this.allAssets[i].summary.slice( this.index1 + 1, this.index2);
            console.log(this.type);
            if ( this.type.match('application/pdf') ) {
               this.pdfSummaryDisplay[i] = true;
               this.pdfSrc = this.allAssets[i].summary;
            }
            this.index1 = this.allAssets[i].diagnosis.indexOf(':');
            this.index2 = this.allAssets[i].diagnosis.indexOf(';');
            this.type = this.allAssets[i].diagnosis.slice( this.index1 + 1, this.index2);
            console.log(this.type);
            if ( this.type.match('application/pdf') ) {
               this.pdfDiagnosisDisplay[i] = true;
               this.pdfSrc = this.allAssets[i].diagnosis;
            }
            this.index1 = this.allAssets[i].labReports.indexOf(':');
            this.index2 = this.allAssets[i].labReports.indexOf(';');
            this.type = this.allAssets[i].labReports.slice( this.index1 + 1, this.index2);
            console.log(this.type);
            if ( this.type.match('application/pdf') ) {
               this.pdfLabReportsDisplay[i] = true;
               this.pdfSrc = this.allAssets[i].labReports;
            }
            if ( this.type.match('image/*') ) {
              this.imgLabReportsDisplay[i] = true;
              this.urls.push(this.allAssets[i].labReports);
            }
            this.index1 = this.allAssets[i].prescription.indexOf(':');
            this.index2 = this.allAssets[i].prescription.indexOf(';');
            this.type = this.allAssets[i].prescription.slice( this.index1 + 1, this.index2);
            console.log(this.type);
            if ( this.type.match('application/pdf') ) {
               this.pdfPrescriptionDisplay[i] = true;
               this.pdfSrc = this.allAssets[i].diagnosis;
            }
         }

       },
       error => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      }
     );
   }

   add() {
     this.showRecordTemplate = true;
   }

   addRecord() {
     this.showRecordTemplate = false;
     this.timestampRecordId = new Date().getUTCMilliseconds();
     this.userRecordId = this.recordForm.value.owner + '_' + this.timestampRecordId;
     this.recordForm.patchValue({
       recordId: this.userRecordId,
       createdOn: Date(),
       lastModified: Date()
      });
      this.recordId = this.recordId + 1;
      this.asset = {
        recordId: this.recordForm.value.recordId,
        owner: this.recordForm.value.owner,
        authorized: null,
        description: this.recordForm.value.description,
        hospital: this.recordForm.value.hospital,
        doctor: this.recordForm.value.doctor,
        createdOn: this.recordForm.value.createdOn,
        lastModified: this.recordForm.value.lastModified,
        summary: this.recordForm.value.summary,
        diagnosis: this.recordForm.value.diagnosis,
        labReports: this.recordForm.value.labReports,
        prescription: this.recordForm.value.prescription
      };
      this.recordForm.patchValue({
      recordId: null,
      owner: null,
      description: null,
      hospital: null,
      doctor: null,
      createdOn: null,
      lastModified: null,
      summary: null,
      diagnosis: null,
      labReports: null,
      prescription: null
      });

      this.recordservice.addAsset(this.asset).subscribe(
        (result: Records) => {
          this.asset = result;
          this.loadAll();
        },
        ((error) => {
          if (error === 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
          } else if (error === '404 - Not Found') {
            this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          } else {
            this.errorMessage = error;
          }
        })
      );
   }

   toggle(recordId) {
     console.log('record id', recordId);
       if ( this.expandrecord[recordId - 1] === false ) {
         this.expandrecord[recordId - 1] = true;
       } else {
         this.expandrecord[recordId - 1] = false;
       }
   }


   onchangeSummary(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
       this.file = event.target.files[0];
       console.log(this.file.type);
       const reader = new FileReader();
       reader.onload = this.summaryReaderLoaded.bind(this);
       console.log(this.file.type);
      switch (this.file.type ) {
          case 'text/plain': {
            reader.readAsBinaryString(this.file);
            break;
          }
          case 'application/pdf': {
            reader.readAsDataURL(this.file);
            this.pdfSummary = true;
            break;
          }
          default: {
            this.recordForm.patchValue({
              summary: 'Unsupported file format'
            });
            break;
          }
       }
     }
   }
   incrementSummaryPage(amount: number) {
    this.summaryPage += amount;
   }

    incrementSummaryZoom(amount: number) {
      this.summaryZoom += amount;
    }
    rotateSummary(angle: number) {
      this.summaryRotation += angle;
    }
    incrementDiagnosisPage(amount: number) {
      this.diagnosisPage += amount;
     }

      incrementDiagnosisZoom(amount: number) {
        this.diagnosisZoom += amount;
      }
      rotateDiagnosis(angle: number) {
        this.diagnosisRotation += angle;
      }
      incrementlabReportPage(amount: number) {
        this.labReportPage += amount;
       }

        incrementlabReportZoom(amount: number) {
          this.labReportZoom += amount;
        }
        rotatelabReport(angle: number) {
          this.labReportRotation += angle;
        }
        incrementprescriptionPage(amount: number) {
          this.prescriptionPage += amount;
         }

          incrementprescriptionZoom(amount: number) {
            this.prescriptionZoom += amount;
          }
          rotatePrescription(angle: number) {
            this.prescriptionRotation += angle;
          }


    summaryReaderLoaded(e) {
      const reader = e.target;
      /*this.fileText = reader.result;*/
      this.recordForm.patchValue({
        summary: reader.result
      });
      if ( this.pdfSummary ) {
        this.pdfSrc = reader.result;
      }
      this.loaded = true;
    }


   onchangeDiagnosis(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = this.diagnosisReaderLoaded.bind(this);
      switch (this.file.type ) {
        case 'text/plain': {
          reader.readAsBinaryString(this.file);
          break;
        }
        case 'application/pdf': {
          reader.readAsDataURL(this.file);
          this.pdfDiagnosis = true;
          break;
        }
        default: {
          this.recordForm.patchValue({
            summary: 'Unsupported file format'
          });
          break;
        }
     }
    }
  }
  diagnosisReaderLoaded(e) {
    const reader = e.target;
    this.fileText = reader.result;
    this.recordForm.patchValue({
      diagnosis: reader.result
    });
    if ( this.pdfDiagnosis ) {
      this.pdfSrc = reader.result;
    }
    this.loaded = true;
  }

  onchangeLabreports(event) {
    const files = event.target.files;
    this.urls = [];
    if (files) {
    for ( const file of files ) {
      const reader = new FileReader();
      reader.onload = this.labreportsReaderLoaded.bind(this);
      switch (file.type ) {
        case 'text/plain': {
          reader.readAsBinaryString(file);
          break;
        }
        case 'application/pdf': {
          reader.readAsDataURL(file);
          this.pdfLabReport = true;
          break;
        }
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          reader.readAsDataURL(file);
          this.imgLabReports = true;
          break;
        default: {
          this.recordForm.patchValue({
            summary: 'Unsupported file format'
          });
          break;
        }
     }
    }
  }
  }
  labreportsReaderLoaded(e) {
    const reader = e.target;
    this.fileText = reader.result;
    this.recordForm.patchValue({
      labReports: reader.result
    });
    if ( this.pdfLabReport ) {
      this.pdfSrc = reader.result;
    }
    if ( this.imgLabReports ) {
      this.urls.push(reader.result);
    }
    this.loaded = true;
  }
  onchangePrescription(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = this.prescriptionReaderLoaded.bind(this);
      switch (this.file.type ) {
        case 'text/plain': {
          reader.readAsBinaryString(this.file);
          break;
        }
        case 'application/pdf': {
          reader.readAsDataURL(this.file);
          this.pdfPrescription = true;
          break;
        }
        default: {
          this.recordForm.patchValue({
            summary: 'Unsupported file format'
          });
          break;
        }
     }
    }
  }
  prescriptionReaderLoaded(e) {
    const reader = e.target;
    this.fileText = reader.result;
    this.recordForm.patchValue({
      prescription: reader.result
    });
    if ( this.pdfPrescription ) {
      this.pdfSrc = reader.result;
    }
    this.loaded = true;
  }

  onchangeAuthorized(recordId) {
    const auth = ['resource:myhealth.digital.health.Professional#' + this.authorize[recordId]];
    /*const user = this.allAssets[recordId - 1].owner.slice(this.allAssets[recordId - 1].owner.indexOf('#') + 1 );
    this.userRecordId = user + '_' +  this.timestampRecordId;*/
     this.asset = {
      recordId: this.allAssets[recordId - 1].recordId,
      owner: this.allAssets[recordId - 1].owner,
      authorized: auth,
      description: this.allAssets[recordId - 1].description,
      hospital: this.allAssets[recordId - 1].hospital,
      doctor: this.allAssets[recordId - 1].doctor,
      createdOn: this.allAssets[recordId - 1].createdOn,
      lastModified: this.allAssets[recordId - 1].lastModified,
      summary: this.allAssets[recordId - 1].summary,
      diagnosis: this.allAssets[recordId - 1].diagnosis,
      labReports: this.allAssets[recordId - 1].labReports,
      prescription: this.allAssets[recordId - 1].prescription
     };
     return this.recordservice.updateAsset(this.allAssets[recordId - 1].recordId, this.asset).subscribe(
      (result: Records) => {
        this.asset = result;
        this.loadAll();
      },
      ((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      })
    );
  }

  /* checkFileType(file: File): string {
    let fType: string;
    const slice = file.slice(0, 4);      // Get the first 4 bytes of a file
    const reader = new FileReader();    // Create instance of file reader. It is asynchronous!
    reader.readAsArrayBuffer(slice);  // Read the chunk file and return to blob
    reader.onload = function(e) {
        const buffer = reader.result;          // The result ArrayBuffer
        const view = new DataView(buffer);      // Get access to the result bytes
        const signature = view.getUint32(0, false).toString(16);  // Read 4 bytes, big-endian，return hex string
        switch (signature) {                      // Every file has a unique signature, we can collect them and create a data lib.
          case '89504e47':
           fType = 'image/png';
           break;
          case '47494638':
           fType = 'image/gif';
            break;
          case '25504446':
           fType = 'application/pdf';
            break;
          case '504b0304':
           fType = 'application/zip';
            break;
          case '54686973':
            fType = 'text';
          break;

        }
        console.log(file.name, fType, signature);
   };
   return fType;
   }*/

}
