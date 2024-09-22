import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, doc, onSnapshot, snapToData } from '@angular/fire/firestore';
import { OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule, 
    MatCardModule,
    CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy{

  firestore: Firestore = inject(Firestore)
  allUsers: any[] = [];
  unsub: (() => void) | undefined;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userSnapshotWithId();
  }


  ngOnDestroy(): void {
    this.unsubscribeFromSnapshot()
  }


  unsubscribeFromSnapshot() {
    if(this.unsub) {
      this.unsub();
      console.log('Unsubscribed from Firestore onSnapshot');
    }
  }


  // read Data from Backend as a snapshot
  userSnapshotWithId() {
    this.unsub = onSnapshot(this.getUsersFromDB(), (users) => {
      this.allUsers = users.docs.map(doc => {
        return { id: doc.id, ...doc.data() }; // gather Data and ID
      });
      // console.log('All users with IDs:', this.allUsers); 
    }, (error) => {
      // console.log("Error fetching documents", error);
    });
  }

  
  getUsersFromDB() {
    return collection(this.firestore, 'users')
  }

  openDialog(): void {
    this.dialog.open(AddUserDialogComponent)
  }
}


  // return the Backend without Ids
  // userSnapshot() {
  //   const unsub = onSnapshot(this.getUsers(), (user) => {
  //     this.allUsers = user.docs.map(doc => doc.data());
  //     console.log('All users:', this.allUsers);

  //   }, (error) => {
  //     console.log('error fetching documents', error)
  //   });
  // }
