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
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { UserComponent } from '../user/user.component';



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

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) { } // gives access to dialogRef in the AddUserDialogComponent
  // constructor(public dialogRef: MatDialogRef<UserComponent>) { } --> in UserComponent doesnt exist MatdialogRef it works but make no sense


  async saveUser() {
    this.user.birthDate = this.birthDate.getTime()
    this.loading = true;
      try {
        await addDoc(this.getUsersFromDB(), this.user.toJSON())
        this.loading = false;
        this.closeDialog()
        // console.log('user succesfully added to Firestore');
      } catch (error) {
        console.log('Error add user to Firestore', error)
      }
    }
    

    closeDialog() {
      this.dialogRef.close();
  }

  getUsersFromDB() {
    return collection(this.firestore, 'users');
  }
}

