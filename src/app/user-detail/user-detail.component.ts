import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { collection, Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  
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
}
