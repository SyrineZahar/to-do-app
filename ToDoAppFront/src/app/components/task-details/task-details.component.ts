import { Component, Inject } from '@angular/core';
import { Task } from 'src/app/classe/Task';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/service/Comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { taskService } from 'src/app/service/Task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from 'src/app/classe/Comment';
import { AuthService } from 'src/app/service/Auth.service';
import { userService } from 'src/app/service/User.service';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  comments: Comment[] = [];
  summarizedText: string = '';
  isSummaryVisible: boolean = false;
  commentForm: FormGroup;
  assignedUser: String = ''; 
  groupId = this.data.task.group_id;

  ngOnInit(): void {
    this.loadComments();
    if (this.data.task.id !== undefined) {
      this.getUserByTaskId(Number(this.data.task.id));
    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private commentService: CommentService,
    private authService: AuthService,
    private UserService: userService,
    private taskService: taskService,
    private dialog: MatDialog, 
    private dialogRef: MatDialogRef<TaskDetailsComponent>

  ) {
    // Initialisation du formulaire de commentaire avec des contrôles de validation
    this.commentForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      user: new FormControl('currentUser', Validators.required), 
      task: new FormControl(this.data.task.id, Validators.required) 
    });
  }

  // Méthode pour soumettre un commentaire
  onSubmit() {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      commentData.task = this.data.task;
      commentData.user = this.authService.getUser();
  
      this.commentService.addComment(commentData).subscribe({
        next: (response) => {
          this.loadComments();  
          this.commentForm.reset({ 
            description: '',
            user: this.authService.getUser(), 
            task: this.data.task.id,
          });
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        }
      });
    }
  }
  
  // Méthode pour charger les commentaires associés à la tâche
  loadComments(): void {
    this.commentService.getCommentsByTaskId(Number(this.data.task.id)).subscribe({
      next: (comments) => {
        this.comments = comments;
    
        this.comments.forEach((comment, index) => {
          if (typeof comment.user === 'number') {
            this.UserService.getUserById(comment.user).subscribe(user => {
              this.comments[index].user = user;
            });
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load comments:', err);
      }
    });
  }
  
  // Méthode pour obtenir un résumé de la description de la tâche
  fetchSummary(): void {
    if (this.data.task.description) {  
      this.taskService.getDescriptionSummary(this.data.task.description).subscribe({
        next: (response) => {
          this.summarizedText = response.summarized_text;  
          this.isSummaryVisible = true;  
        },
        error: (error) => {
          console.error('Error fetching summary:', error);  
        }
      });
    }
  }

  // Méthode pour récupérer l'utilisateur assigné à la tâche
  getUserByTaskId(taskId: number): void {
    this.UserService.getUserByTaskId(taskId).subscribe({
      next: (data) => {
        this.assignedUser = data.name; 
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
  
  // Méthode pour supprimer une tâche
  deleteTask(taskId: number) {
    console.log('groupId'+taskId)
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.dialogRef.close(); 

      },
      error: (error) => {
        this.showPopup('Error while deleting');
      }
    });
  }

  // Méthode pour afficher une alerte popup
  showPopup(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px'
    });
  }
}