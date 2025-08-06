import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from 'src/app/services/api/api.service';
import { TaskFormGroup } from './TaskFormGroup';

@Component({
  selector: 'app-create-task',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  standalone: true
})
export class CreateTaskComponent {
  taskFormGroup = new TaskFormGroup();
  constructor(private api: ApiService) {}
}
