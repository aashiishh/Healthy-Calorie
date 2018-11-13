import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Credentials } from "../models/userCred";
import { PHY_Profile } from "../models/phyProfile";

@Injectable()
export class DatabaseService 
{
    private usersCredentialsListRef = this.afDB.list<Credentials>('SignUp Data');
    private usersPhysicalProfileListRef = this.afDB.list<PHY_Profile>('Users Physical Profile');
    constructor(private afDB:AngularFireDatabase)
    {
        
    }

    getUsersList()
    {
        return this.usersCredentialsListRef;
    }

    getUsersProfileList()
    {
        return this.usersPhysicalProfileListRef;
    }

    addUser(user : Credentials)
    {
        return new Promise((resolve,reject)=> {
            this.usersCredentialsListRef.push(user).then( () =>{
                console.log('3 DBS->Done Writing Data');
                resolve(true);
            });
        });
       
    }

    editUser(user : Credentials)
    {
        return new Promise<boolean>((resolve,reject)=> {  
            this.usersCredentialsListRef.update(user.key,user).then(() => {
                resolve(true);
        }).catch(() => {
                reject(true);
        });
     });
    }

    addPhysicalProfile(phyProfileData : PHY_Profile)
    {
        return new Promise<boolean>((resolve,reject) => {
            this.usersPhysicalProfileListRef.push(phyProfileData).then(() => {
                  resolve(true);
            })
        })
    }
}