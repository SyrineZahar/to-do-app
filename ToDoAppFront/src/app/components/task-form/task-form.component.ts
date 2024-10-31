import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { Task } from 'src/app/classe/Task';
import { User } from 'src/app/classe/User';
import { GroupService } from 'src/app/service/group.service';
import { taskService } from 'src/app/service/Task.service';
import { userService } from 'src/app/service/User.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task!: Task;
  taskForm!: FormGroup;
  taskStatuses = Object.values(TaskStatus);
  users!: User[] ;
  groups!: GroupEntity[] ;

  constructor(
    private fb: FormBuilder,
    private taskService: taskService, 
    private userService: userService,
    private router: Router,
    private groupService: GroupService ,
  ) {}

  ngOnInit(): void {
    this.createEmptyForm();

    //fetch groups
    this.groupService.getGroups().subscribe((data: GroupEntity[]) => {
      this.groups = data;
      console.log(this.groups);
    }, (error: any) => {
      console.error('Error fetching users:', error);
    });

    //fetch users
    this.userService.getUsers().subscribe((data: User[]) => {
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
      deadline: ['', Validators.required],
      isDesactivated: [false],
      user_id: [null, Validators.required],
      group_id: [null, Validators.required]
    });
  }

  onSubmit(): void {
      if (this.taskForm.valid) {
        const taskData = new Task(
          this.taskForm.value.title,
          this.taskForm.value.description,
          this.taskForm.value.status,
          new Date(this.taskForm.value.deadline),
          Number(this.taskForm.value.group_id),
          Number(this.taskForm.value.user_id),
          this.taskForm.value.isDesactivated,
        );

        console.log(taskData);
    
        // Appel du service pour ajouter la tâche
        this.taskService.addTask(taskData).subscribe(() => {
          this.router.navigate([""]); // Redirection vers la liste des tâches
        });
     } 
   else {
      console.log('Form is invalid'); // You can show this message in your UI as well
  }
  }

  onGroupChange() {
    const groupId = this.taskForm.get('group_id')?.value; 
    if (groupId) {
      this.userService.getUsersbygroup(groupId).subscribe(
        (users) => {
          this.users = users; // Met à jour la liste des utilisateurs
          // Ne réinitialisez pas le champ utilisateur pour garder la sélection actuelle
        },
        (error) => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
      );
    } 
    // Si aucun groupe n'est sélectionné, vous pouvez garder la liste actuelle des utilisateurs
  }
  
  onUserChange() {
    const userId = this.taskForm.get('user_id')?.value; // Récupère l'ID de l'utilisateur sélectionné
    if (userId) {
      this.groupService.getGroupsByUser(userId).subscribe(
        (groups) => {
          this.groups = groups; // Met à jour la liste des groupes
          // Ne réinitialisez pas le champ groupe pour garder la sélection actuelle
        },
        (error) => {
          console.error('Erreur lors de la récupération des groupes:', error);
        }
      );
    } 
    // Si aucun utilisateur n'est sélectionné, vous pouvez garder la liste actuelle des groupes
  }
  
  


  navigateToTasks(): void {
    this.router.navigate([""]); // Redirect to task list
  }

  
}
