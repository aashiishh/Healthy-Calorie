import { Injectable } from '@angular/core';
// import * as unirest from 'unirest'
import { PHY_Profile } from '../models/phyProfile';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class APIService {

  constructor(public httpClient: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');
  }

 /* getBMIResult(profileData : PHY_Profile)
  {
    return new Promise( (resolve,reject) => { 
    unirest.post("https://bmi.p.mashape.com/")
    .header("X-Mashape-Key", "tqp2aUUHx6mshBnbeq9h8TqRzxhFp1uZ3GjjsnvywQxSZvaWNs")
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .send({"weight":{"value":profileData.weight,"unit":"kg"},"height":{"value":profileData.height,"unit":"m"},"sex":profileData.gender,"age":profileData.age})
    .end(result => {
      console.log(result.status, result.headers, result.body);
      if(result.status == 200 && result.body)
        resolve(result.body);
       else 
       resolve(0) 
    });
});
  }*/

   sendPostRequest(profileData : PHY_Profile) {

    // const headers = new HttpHeaders({"X-Mashape-Key" : 'tqp2aUUHx6mshBnbeq9h8TqRzxhFp1uZ3GjjsnvywQxSZvaWNs',"Accept" : 'application/json','Content-Type' : 'application/json'})
    // const requestOptions = new HttpRequest({ headers: headers });
    return new Promise( (resolve,reject) => { 
    let postData = {"weight":{"value":profileData.weight,"unit":"kg"},"height":{"value":profileData.height,"unit":"m"},"sex":profileData.gender,"age":profileData.age}

    this.httpClient.post("https://bmi.p.mashape.com/", postData, { headers : new HttpHeaders({"X-Mashape-Key" : 'tqp2aUUHx6mshBnbeq9h8TqRzxhFp1uZ3GjjsnvywQxSZvaWNs',"Accept" : 'application/json','Content-Type' : 'application/json'})})
      .subscribe(data => {
        console.log("Got Data from BMI API->",data);
        if(data)
         resolve(data);
       }, error => {
        console.log('BMI API error->',error);
        resolve(false);
      });
   });
   
  }

}
