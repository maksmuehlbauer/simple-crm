import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MatDialogClose} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  
  loading = false;
  userId: string = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore)

  constructor(public dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    this.getUserFromDB();
  }

  getUserFromDB() {
    return doc(this.firestore, 'users', this.userId)
  }

  async saveUser() {
    this.loading = true;
    await setDoc(this.getUserFromDB(), this.user.toJSON())
    this.loading = false;
    this.dialogRef.close();
  }

}
