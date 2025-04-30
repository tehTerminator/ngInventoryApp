import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './../../../../services/user/user.service';

@Component({
  selector: 'app-user-sales',
  standalone: false,
  templateUrl: './user-sales.component.html',
  styleUrl: './user-sales.component.scss'
})
export class UserSalesComponent implements OnInit {
  report = 
  constructor(private userStore: UserStoreService){}

  ngOnInit(): void {
    this.userStore.init();
  }

  get users() {
    return this.userStore.getAsObservable();
  }
}

interface DataRow {
  
}

