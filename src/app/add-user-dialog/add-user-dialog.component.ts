import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MatDialogClose} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
// import { initializeApp, FirebaseApp } from 'firebase/app'; // Firebase-Initialisierung
// import { getFirestore } from 'firebase/firestore';  // Firestore holen
// import { Observable } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserComponent } from '../user/user.component';



@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {

  user = new User()
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor(public dialogRef: MatDialogRef<UserComponent>) {
    
    // // Firebase-Konfiguration
    // const firebaseConfig = {
    //   apiKey: "AIzaSyALTWvSEaoTNzpVpW8aFGVYbQpEzb0ap1M",
    //   authDomain: "simple-crm-d274f.firebaseapp.com",
    //   projectId: "simple-crm-d274f",
    //   storageBucket: "simple-crm-d274f.appspot.com",
    //   messagingSenderId: "465755090674",
    //   appId: "1:465755090674:web:1b802c5d96682a2f3baa6b"
    // };

    // // Firebase-App initialisieren (einmalig)
    // const app: FirebaseApp = initializeApp(firebaseConfig);
    // this.firestore = getFirestore(app);
  }


  async saveUser() {
    this.user.birthDate = this.birthDate.getTime()
    console.log('user created: ', this.user)
    this.loading = true;
      try {
        const userCollection = collection(this.firestore, 'users');
        await addDoc(userCollection, this.user.toJSON())
        console.log('user succesfully added to Firestore');
        this.loading = false;
        this.closeDialog()
      } catch (error) {
        console.log('Error add user to Firestore', error)
      }
    }
    
    closeDialog() {
      this.dialogRef.close();
  }
}

