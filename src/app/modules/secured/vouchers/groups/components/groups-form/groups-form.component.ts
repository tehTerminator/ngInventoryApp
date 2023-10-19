import { Component, OnInit } from '@angular/core';
import { GroupsForm } from './groups.formgroup';
import { ApiService } from './../../../../../../services/api/api.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.scss']
})
export class GroupsFormComponent implements OnInit {
  
  form = new GroupsForm();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.value) {
      return;
    }
  }

  get editMode(): boolean {
    return this.form.id > 0;
  }

  get title(): string {
    return this.editMode ? 'Edit Group' : 'Create New Group';
  }
}
