import { Component } from '@angular/core';
import { NavController, AlertController, Item } from 'ionic-angular';
import { User } from '../../models/userModel';
import { DatabaseService } from '../../Services/databaseService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user : User = {
    name : '',
    age : 0,
    gender : ''
  }
  usersList$: Observable<User[]>;
  constructor(public navCtrl: NavController, public altCtrl:AlertController, private dbService: DatabaseService) {
      this.usersList$ = this.dbService
      .getUsersList()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
  }

  showPrompt()
  {
    const prompt = this.altCtrl.create({
      title: 'User Information',
      // message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'age',
          placeholder: 'Age'
        },
        {
          name: 'gen',
          placeholder: 'Gender'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked with name: ',data.name,' age: ',data.age,' gender: ',data.gen);
            this.user.name = data.name;
            this.user.age =  data.age;
            this.user.gender = data.gen;  
            console.log(this.user);
            this.dbService.addUser(this.user).then(ref => {
               console.log(ref.key);
            })
          }
        }
      ]
    });
    prompt.present();
  
  }



}
