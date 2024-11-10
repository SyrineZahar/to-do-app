import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/classe/Task';
import { taskService } from 'src/app/service/Task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },  
    private dialogRef: MatDialogRef<TaskDetailsComponent>,
   
    private router: Router,
    private taskService: taskService
) {}
  
}
