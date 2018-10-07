import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "../models/userModel";

@Injectable()
export class DatabaseService 
{
    private usersListRef = this.afDB.list<User>('persons');
    constructor(private afDB:AngularFireDatabase)
    {
    
    }

    getUsersList()
    {
        return this.usersListRef;
    }

    addUser(user : User)
    {
        return this.usersListRef.push(user);
    }

}