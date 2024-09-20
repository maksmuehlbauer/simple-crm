import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
// import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule,
    FormsModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
  user = new User()
  birthDate: Date = new Date();

  saveUser() {
    this.user.birthDate = this.birthDate.getTime()
    console.log('user created: ', this.user)
  }
}
