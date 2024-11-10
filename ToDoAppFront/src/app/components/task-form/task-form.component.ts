import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  groupId: number;
  task!: Task;
  taskForm!: FormGroup;
  taskStatuses = Object.values(TaskStatus);
  users!: User[] ;
  groups!: GroupEntity[] ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private fb: FormBuilder,
    private taskService: taskService, 
    private userService: userService,
    private router: Router,
    private groupService: GroupService ,
    private authService: AuthService,
  ) { this.groupId = data.group_id; }

  ngOnInit(): void {
    this.createEmptyForm();
    //fetch users
    this.userService.getUsersbygroup(this.groupId).subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    }, (error: any) => {
      console.error('Error fetching users:', error);
    });
  }

  private createEmptyForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatus.todo, Validators.required],
      deadline: ['', [Validators.required, futureDateValidator()]],
      isDesactivated: [false],
      user_id: [null, Validators.required],
      group_id: []
    });
  }

  onSubmit(): void {
      if (this.taskForm.valid) {
        const taskData = new Task(
          this.taskForm.value.title,
          this.taskForm.value.description,
          this.taskForm.value.status,
          new Date(this.taskForm.value.deadline),
          Number(this.groupId),
          Number(this.taskForm.value.user_id),
          this.taskForm.value.isDesactivated,
        );
    
        // Appel du service pour ajouter la tâche
        this.taskService.addTask(taskData).subscribe(() => {
          const user=JSON.parse(sessionStorage['user']);
          this.userService.getUserData(user.email).subscribe({
            next: (user: User) => {
              this.authService.setUser(user); // Sauvegarde de l'utilisateur dans le localStorage
              this.dialogRef.close();            
            },
            error: (error: any) => {
              console.error('Login failed:', error);
            }
          });
        });
     } 
   else {
      console.log('Form is invalid'); // You can show this message in your UI as well
  }
  }


  navigateToTasks(): void {
    this.dialogRef.close(); // Redirect to task list
  }

  
}
