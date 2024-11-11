import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { Task } from 'src/app/classe/Task';
import { User } from 'src/app/classe/User';
import { AuthService } from 'src/app/service/Auth.service';
import { GroupService } from 'src/app/service/group.service';
import { taskService } from 'src/app/service/Task.service';
import { userService } from 'src/app/service/User.service';
import { futureDateValidator } from './future-date.validator';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  groupId: number;
  task!: Task;
  taskForm!: FormGroup;
  taskStatuses = Object.values(TaskStatus);
  users: User[] = []; // Initialize users as an empty array
  groups!: GroupEntity[]; // Initialize groups
  isUpdate: boolean = false; // Flag to check if it's an update

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private fb: FormBuilder,
    private taskService: taskService, 
    private userService: userService,
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService,
  ) {
    this.groupId = data.group_id; // Extract group_id from dialog data
    this.task = data.task || null; // Initialize task for update or new task
    this.isUpdate = !!this.task; // Check if it's an update
  }

  ngOnInit(): void {
    this.createForm(); // Initialize the form
    this.fetchUsers(); // Fetch users based on groupId
  }

  // Method to create the task form with appropriate validators
  private createForm(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || '', Validators.required],
      status: [this.task?.status || TaskStatus.todo, Validators.required],
      deadline: [
        this.task?.deadline ? this.formatDate(this.task.deadline) : '', 
        [Validators.required, futureDateValidator()]
      ],
      isDesactivated: [this.task?.isDestactive || false],
      user_id: [this.task?.user_id || null, Validators.required],
      group_id: [this.groupId]
    });
  }

  // Method to format the deadline into the desired format "yyyy-MM-ddTHH:mm:ss"
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error("Invalid date:", date);
      return ''; // Return an empty string if date is invalid
    }
    d.setHours(23, 59, 59, 999); // Set time to 23:59:59

    // Manually format the date to "yyyy-MM-ddTHH:mm:ss"
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(d.getDate()).padStart(2, '0'); // Ensure two digits
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; // Return formatted string
  }

  // Method to fetch users for the given groupId
  private fetchUsers(): void {
    this.userService.getUsersbygroup(this.groupId).subscribe(
      (data: User[]) => {
        this.users = data; // Store users fetched for the group
      },
      (error: any) => {
        console.error('Error fetching users:', error);
        // You can show a message to the user or handle error in UI
      }
    );
  }

  // Submit form data to create or update a task
  onSubmit(): void {
    if (this.taskForm.valid) {
      // Log form value to check the data before submission
      console.log('Form Data:', this.taskForm.value);

      let taskDeadline = this.taskForm.value.deadline;
      
      // Check if deadline is a valid Date and convert to custom formatted string
      if (!(taskDeadline instanceof Date)) {
        taskDeadline = new Date(taskDeadline);
      }

      if (isNaN(taskDeadline.getTime())) {
        console.error("Invalid deadline:", taskDeadline);
        return; // Exit if the deadline is invalid
      }

      taskDeadline.setHours(23, 59, 59, 999); // Set the time to 23:59:59

      // Format the deadline manually as "yyyy-MM-ddTHH:mm:ss"
      const formattedDeadline = this.formatDate(taskDeadline);

      const taskData = new Task(
        this.taskForm.value.title,
        this.taskForm.value.description,
        this.taskForm.value.status,
        new Date(formattedDeadline), // Submit the manually formatted deadline
        Number(this.taskForm.value.group_id),
        Number(this.taskForm.value.user_id),
        this.taskForm.value.isDesactivated
      );

      if (this.isUpdate && this.task) {
        // If it's an update, call updateTask
        this.taskService.updateTask(Number(this.task.id), taskData).subscribe(() => {
          this.dialogRef.close(); // Close dialog after updating
        }, (error) => {
          console.error('Error updating task:', error);
        });
      } else {
        // If it's a new task, call addTask
        this.taskService.addTask(taskData).subscribe(() => {
          console.log(taskData)
          this.dialogRef.close(); // Close dialog after adding
        }, (error) => {
          console.error('Error adding task:', error);
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to navigate back to the task list view
  navigateToTasks(): void {
    this.dialogRef.close(); // Close the dialog to return to task list
  }
}
