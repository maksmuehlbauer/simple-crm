import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { collection, Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { EditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}
  
  userId: any = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore);


  ngOnInit(): void {
    this.getUserId();
    this.showUserDetails();
  }

  
  getUserId() {
      this.route.paramMap.subscribe( paramMap => {
        this.userId = paramMap.get('id');
        // console.log('got ID: ', this.userId)
    })
  }


  getUserFromDB() {
    return doc(this.firestore, "users", this.userId);
  }


  showUserDetails() {
      const unsub = onSnapshot(this.getUserFromDB(), (doc) => {
        // console.log("Current data: ", doc.data());
        this.user = new User(doc.data())
    });
  }

  editUserDetail(): void {
    const dialog = this.dialog.open(EditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // new User(this.user....) creates a copy and didnt update it localy
    dialog.componentInstance.userId = this.userId;
  }


  editAdressDetail(): void {
    const dialog = this.dialog.open(EditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // new User(this.user....) creates a copy and didnt update it localy
    dialog.componentInstance.userId = this.userId;
  }
}
