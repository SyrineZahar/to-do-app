import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/classe/User';
import { taskService } from 'src/app/service/Task.service';
import { Task } from 'src/app/classe/Task';

@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit {
  filterForm: FormGroup;
  users!: User[];
  filteredTasks!: Task[]; // Holds the filtered tasks based on the selected user
  userForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupEntity },
    private formBuilder: FormBuilder,
    private taskService: taskService
  ) {
    this.filterForm = this.formBuilder.group({
      filter_user_id: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.users = this.data.group.users ?? []; // Assign an empty array if users is undefined
    this.filteredTasks = this.data.group.tasks ?? []; // Initially display all tasks
    this.userForm = new FormGroup({
      user_id: new FormControl(null)
    });
  }

  filterTasksByUser() {
    const selectedUserId = this.filterForm.value.filter_user_id;
    
    if (selectedUserId) {
      this.taskService.getTasksByUserId(Number(selectedUserId)).subscribe({
        next: (tasks) => {
          this.filteredTasks = tasks; // Update with filtered tasks from the response
        },
        error: (error) => {
          console.error('Error fetching tasks:', error);
        }
      });
    } else {
      this.filteredTasks = this.data.group.tasks?? []; // Reset to all tasks if no user is selected
    }
  }

  addUser(){

  }
}
