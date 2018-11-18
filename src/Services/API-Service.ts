import { Injectable } from '@angular/core';
import * as unirest from 'unirest'
import { PHY_Profile } from '../models/phyProfile';

@Injectable()
export class APIService {

  constructor() {
    console.log('Hello ApiServiceProvider Provider');
  }

  getBMIResult(profileData : PHY_Profile)
  {
    return new Promise( (resolve,reject) => { 
    unirest.post("https://bmi.p.mashape.com/")
    .header("X-Mashape-Key", "tqp2aUUHx6mshBnbeq9h8TqRzxhFp1uZ3GjjsnvywQxSZvaWNs")
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .send({"weight":{"value":profileData.weight,"unit":"kg"},"height":{"value":profileData.height,"unit":"m"},"sex":profileData.gender,"age":profileData.age})
    .end(result => {
      //console.log(result.status, result.headers, result.body);
      if(result.status == 200 )
        resolve(result.body);
    });
});
  }

}
