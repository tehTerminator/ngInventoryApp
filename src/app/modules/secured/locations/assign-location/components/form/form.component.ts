import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from './../../../../../../services/user/user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { User } from '../../../../../../interface/user';
import { ApiService } from '../../../../../../services/api/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input('location') location = 0;
  userFormControl = new FormControl(0);

  constructor(private userStore: UserService, private api: ApiService) {}

  get users(): Observable<User[]> {
    return this.userStore.getAsObservable();
  }


  onSubmit() {
    this.api.create(['location', 'user'], {
      location: this.location, user: this.userFormControl.value
    }).subscribe({
      next: (value) => console.log(value)
    });
  }
}
