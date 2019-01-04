import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Credentials } from "../models/userCred";
import { PHY_Profile } from "../models/phyProfile";
import { Food_Items } from "../models/foodModal";
import { SelectedFood } from "../models/selectedFoodModal";
import { TotalCaloriesData } from "../models/totalCaloriesModel";

@Injectable()
export class DatabaseService 
{
    private usersCredentialsListRef = this.afDB.list<Credentials>('SignUp Data');
    private usersPhysicalProfileListRef = this.afDB.list<PHY_Profile>('Users Physical Profile');
    private foodItemListRef = this.afDB.list<Food_Items>('Food Items');
    private lunchfoodItemListRef = this.afDB.list<Food_Items>('Food Items Lunch');
    private SnacksfoodItemListRef = this.afDB.list<Food_Items>('Food Items Snacks');
    // public UserListForConsumedFoodListRef = this.afDB.list<string>('Consumed Food List');
    // private TotalCaloriesRef = this.afDB.list<TotalCaloriesConsumed>('Calorie Counter');
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

    getFoodItemList()
    {
        return this.foodItemListRef;
    }
    getlunchFoodItemList()
    {
        return this.lunchfoodItemListRef;
    }

    getFoodItemListForSnacks()
    {
        return this.SnacksfoodItemListRef;
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

    editPhysicalProfile(editPHYProfileData : PHY_Profile)
    {
        return new Promise<boolean>((resolve,reject) => {
            this.usersPhysicalProfileListRef.update(editPHYProfileData.key,editPHYProfileData).then(() => {
                resolve(true);
            }).catch(() => {
                resolve(false);
            })
        })
    }

    addConsumedFood(selectedFoodData : SelectedFood,uid : string)
    {
        const addTo = this.afDB.list(`Consumed Food List/${uid}`);;
        return new Promise<boolean>((resolve,reject) => {
            addTo.push(selectedFoodData).then(() => {
                  resolve(true);
            })
        })
    }

    removeConsumedFoodList(uid : string)
    {
        const deleteFrom = this.afDB.list(`Consumed Food List/${uid}`);
        return new Promise<boolean>((resolve,reject) => {
            deleteFrom.remove().then(() => {
                  resolve(true);
            })
        })
    }

    deleteConsumedFood(selectedFoodData : SelectedFood,uid : string)
    {
        const deleteFrom = this.afDB.list(`Consumed Food List/${uid}/${selectedFoodData.key}`);   // to identify the food corresponding to the key
        return new Promise<boolean>((resolve,reject) => {
            deleteFrom.remove().then(() => {
                  resolve(true);
            })
        })
    }

    getConsumedFoodList(uid : string)
    {
        return this.afDB.list(`Consumed Food List/${uid}`);
    }   


}