import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, 
    MatToolbarModule, 
    MatButtonModule, 
    MatSidenavModule,
    MatIconModule,
    RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore)

  constructor() {

  }

  // https://github.com/angular/angularfire/blob/main/docs/install-and-setup.md

}
