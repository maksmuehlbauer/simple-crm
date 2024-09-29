import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MatDialogClose} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Firestore, doc, collection, updateDoc, setDoc, addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class EditAddressComponent implements OnInit {

  loading = false;
  user: User = new User();
  userId: string = '';
  firestore: Firestore = inject(Firestore)

  constructor(private route: ActivatedRoute, public dialogRef: MatDialogRef<EditAddressComponent>) {

  }

  ngOnInit(): void {
    // this.getUserFromDB()
  }

  getUserFromDB() {
    return doc(this.firestore, 'users', this.userId)
  }


  async saveUser() {
    this.loading = true;
    await setDoc(this.getUserFromDB(), this.user.toJSON())
    this.loading = false;
    this.dialogRef.close()
  }

}
