import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    standalone: false,
})
export class TaskListComponent {
    constructor(private matDialog: MatDialog){}

    onAddButtonPress() {
        this.matDialog.open(CreateTaskComponent);
    }
}