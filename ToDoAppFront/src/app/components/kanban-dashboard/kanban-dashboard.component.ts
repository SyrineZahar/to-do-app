import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum';
import { Task } from 'src/app/classe/Task';
import { taskService } from 'src/app/service/Task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { userService } from 'src/app/service/User.service';


@Component({
  selector: 'app-kanban-dashboard', 
  templateUrl: './kanban-dashboard.component.html', 
  styleUrls: ['./kanban-dashboard.component.css'] 
})
export class KanbanDashboardComponent implements OnInit {
  assignedUser!: String;
  constructor(private taskService: taskService, private dialog: MatDialog, private route: ActivatedRoute, private UserService: userService) { }

  groupId!: number;
  TaskStatus = TaskStatus; 
  assignedUserName: { [key: number]: string } = {};
  tasks: Task[] = []; 
  todolist: Task[] = []; 
  inProgressList: Task[] = []; 
  doneList: Task[] = []; 
  currentTask!: Task;

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.groupId)
    this.loadTasks(); 
  }

  loadTasks(): void {
    this.taskService.getTasksByGroupId(this.groupId).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        console.log(this.tasks);
        this.updateTaskLists();

        this.tasks.forEach(task => {
          this.UserService.getUserByTaskId(task.id!).subscribe({
            next: (user) => {
              this.assignedUserName[task.id!] = user.name.substring(0, 2).toUpperCase(); 
            },
            error: (err) => {
              console.error('Error fetching user data for task:', task.id, err);
            }
          });
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching tasks:', err); 
      }
    });
  }

  updateTaskLists(): void {
    this.todolist = this.tasks.filter(task => task.status === TaskStatus.todo);
    this.inProgressList = this.tasks.filter(task => task.status === TaskStatus.inprogress);
    this.doneList = this.tasks.filter(task => task.status === TaskStatus.done);
  }

  onDragStart(task: Task): void {
    this.currentTask = task; 
    console.log('Dragging task: ', task); 
  }

  onDrop(event: DragEvent, status: TaskStatus): void {
    event.preventDefault(); 

    if (this.currentTask) {
      this.currentTask.status = status; 
      this.currentTask.updatedAt = new Date("yyyy-MM-dd'T'HH:mm:ss");
      console.log(this.currentTask.updatedAt )
      this.taskService.editTask(this.currentTask).subscribe({
        next: () => {
          this.loadTasks(); 
          console.log('Task dropped and updated'); 
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating task: ', err.message); 
        }
      });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); 
  }

  openTaskDetails(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks(); 
    });
  }
  

  openAddTask(event: MouseEvent): void {
    event.stopPropagation(); 
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { group_id: this.groupId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks();
    });
  }
  
  
  navigateToUpdateTask(taskId: number): void {
    const taskToUpdate = this.tasks.find(task => task.id === taskId);
  
    if (taskToUpdate) {
      console.log(taskToUpdate)
      const dialogRef = this.dialog.open(TaskFormComponent, {
        data: { task: taskToUpdate, group_id: this.groupId } 
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.loadTasks();
      });
    }
  }
  

}
