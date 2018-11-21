//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Credentials } from '../models/userCred';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from './databaseService';
import { resolveDefinition } from '@angular/core/src/view/util';

@Injectable()
export class AuthService {

//  public myUser : Credentials = 
//   {
//       name : '',
//       email : '',
//       password : '',
//       phoneNo : undefined,
//       photoURL : ''
//   };

  private fUser: Observable<firebase.User>;
  constructor(public afauth: AngularFireAuth,private dbServe:DatabaseService) {
    
       
     this.fUser = this.afauth.authState;
    // this.fUser.subscribe(user => {
        // if(user)
        // {
        // console.log('Currents users email is '+user.email)
        // this.loggedInUser = user;
        // }
        // else
        // console.log('No User is connected yet');
    // })
    // firebase.auth().onAuthStateChanged(user => {
    //      console.log('Current user email is '+user.email)
    //      if(user)
    //      this.loggedInUser=user;
    //      else
    //      console.log('No User is connected yet');
    // })

  //console.log("firebase user "+this.fUser);

     }

     signUp(signUpCredentials : Credentials)
     {
        return new Promise<number>((resolve,reject) => {
          this.afauth.auth.createUserWithEmailAndPassword(signUpCredentials.email,signUpCredentials.password).then(() => {
          console.log("1. AS->Done with Signup");
          this.emailverification().then(res => {
                    if(res)
                    {
                      console.log('2. Email Verfication link has been sent to ',this.getCurrentUser().email);
                      signUpCredentials.password='';
                      this.dbServe.addUser(signUpCredentials).then(dbResult => {
                        if(dbResult)
                          resolve(1);
                       }).catch(error1 => {
                          if(error1)
                          {
                           console.log('4. AS->Got false from DB_Service')
                           reject(0);
                          }
                       });
                    }
        }).catch(error2 => {
               if(error2)
               {
                 console.log("AS-> error while sending email verfication");
                 reject(0);
               }
          });

         }).catch(error => {
          console.log("1. AS->Error generated while signup: "+error);
          var errorCode = error.code;
          //var errorMessage = error.message;
          if (errorCode == 'auth/weak-password')
          reject(2);
          else if(error.code == 'auth/email-already-in-use')
          reject(3);
          else if(error.code == 'auth/invalid-email')
          reject(4);
          else
          reject(0);
        });
      });

     }

  signIn(signInCredentials : Credentials)
  {
  //   this.myUser = signInCredentials;
  //  let result = await this.afauth.auth.signInWithEmailAndPassword(this.myUser.email,this.myUser.password).then(res => {
  //        //console.log('AS->SignIn successful with user'+res.user.email);
  //         return 1;
  //   }).catch(err => {
  //         console.log('AS->Error while signin : '+err);
  //         if(err.code=='auth/invalid-email')
  //         return 2;
  //         else if(err.code == 'auth/user-not-found')
  //         return 3;
  //         else if(err.code == 'auth/wrong-password')
  //         return 4;
  //         else
  //         return 0;
  //   });

  //   return result;

       return new Promise<number>((resolve , reject) =>
        {   
        this.afauth.auth.signInWithEmailAndPassword(signInCredentials.email,signInCredentials.password).then(res => {
        //console.log('AS->SignIn successful with user'+res.user.email);
            resolve(1);
        }).catch(err => {
         console.log('AS->Error while signin : '+err);
         if(err.code=='auth/invalid-email')
         reject(2);
         else if(err.code == 'auth/user-not-found')
         reject(3);
         else if(err.code == 'auth/wrong-password')
         reject(4);
         else
         reject(0);
   });
  });

  }

  emailverification(){
    return new Promise((resolve,reject) =>
    {
        if(this.fUser){
     
         this.getCurrentUser().sendEmailVerification().then(() => 
         {
             resolve(true);
         }).catch(() => {
             reject(true);
         });
      }
      else
      reject(true);
    });
  }

  getUID()
  {
        if(this.fUser)
        return this.afauth.auth.currentUser.uid;
        else
        return null;
  }

  getCurrentUser()
  {
      if(this.fUser)
      return this.afauth.auth.currentUser;
      else
      return null;
  }

  updateEmail(email : string)
  {
    return new Promise<number>((resolve,reject)=>{

      if(this.fUser)  
      {
        this.getCurrentUser().updateEmail(email).then(() =>
        {
           resolve(1);
        }).catch(error => {
          console.log('AS->Error while updating email : ',error.message);
          if(error.code == 'auth/email-already-in-use')
          reject(2);
          else if(error.code == 'auth/invalid-email')
          reject(3);
          else
          reject(0);       
        });
     }
      else
       reject(0);
    });
  }

  reauthenticateUser(password : string)
  {
    return new Promise((resolve,reject) => {
      if(this.fUser){
        const credentials = firebase.auth.EmailAuthProvider.credential(this.getCurrentUser().email,password);
         if(credentials)
         {
            this.getCurrentUser().reauthenticateAndRetrieveDataWithCredential(credentials).then(()=> {
                 resolve(1);
            }).catch(error => {
                 console.log(error.code,' ',error.message,);
                 if(error.code=="auth/wrong-password")
                 reject(2);
                 else
                 reject(0);
            });
         }
         else
         reject(0);
      }
    })
    
 }

sendPasswordResetLink(email : string)
 {  
   return new Promise<boolean>(async (resolve,reject) => {
    this.afauth.auth.sendPasswordResetEmail(email).then(() => resolve(true)).catch(() => resolve(false))
   })      
 }

 logout()
  {
     if(this.fUser)
    {
     return new Promise((resolve,reject) => {
        this.afauth.auth.signOut().then(() => {
           resolve(1);
        }).catch( () => {
            reject(2);
        });
      })
    }
}

}