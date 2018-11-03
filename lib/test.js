'use strict';

/**
 * @param{*} authorized
 * @param{*} record
 * @returns{boolean} boolean true/false
 */

function permitted(authorized, record) {
   const auth = authorized.getIdentifier();
   
   if (!record.authorized) {
      return false;
   }else {
    for (let rec of record.authorized) {
       console.log("permitted  " + rec.getIdentifier() + "participant   " + auth );
       if(rec.getIdentifier() == auth){
         return true;
       }
    }   
 }
 return false;
}

/**
 * @param{*} participant
 * @param{*} record
 * @returns{boolean} boolean returns true/false
 */

function canSubmit(participant,record) {
    
    if(record.owner.authorized) {
       for( let list of record.owner.authorized ) { 
          if( list.getIdentifier() == participant.getIdentifier() ) { 
             return true;
          }
       }
    }   
    return false;
}

/**
 * @param{*} participant
 * @param{*} user
 * @returns{boolean} boolean returns true/false
 */

function canRead(participant,user) {
    if(user.authorized) {
      for ( let auth of user.authorized ) {
        if ( auth.getIdentifier() == participant.getIdentifier()) {
           return true;
        }
      }
    }
    return false;
}
