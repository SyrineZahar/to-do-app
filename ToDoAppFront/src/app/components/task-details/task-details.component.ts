import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/classe/Task';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/service/Comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { taskService } from 'src/app/service/Task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from 'src/app/classe/Comment';
import { AuthService } from 'src/app/service/Auth.service';
import { userService } from 'src/app/service/User.service';
import { map, Observable, tap } from 'rxjs';
import { User } from 'src/app/classe/User';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  comments: Comment[] = [];
  summarizedText: string = ''; // Store the description summary
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
    private dialog: MatDialog, // Inject MatDialog service
    private router: Router, // Inject Router service here
    private dialogRef: MatDialogRef<TaskDetailsComponent>

  ) {
    this.commentForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      user: new FormControl('currentUser', Validators.required), // Replace with actual user data if needed
      task: new FormControl(this.data.task.id, Validators.required) // Assuming task has an id
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      commentData.task = this.data.task;
      commentData.user = this.authService.getUser();
  
      this.commentService.addComment(commentData).subscribe({
        next: (response) => {
          this.loadComments();  // Reload comments immediately
          this.commentForm.reset({ // Reset form with default values
            description: '',
            user: this.authService.getUser(), // Set the current user if needed
            task: this.data.task.id,
          });
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        }
      });
    }
  }
  
  loadComments(): void {
    this.commentService.getCommentsByTaskId(Number(this.data.task.id)).subscribe({
      next: (comments) => {
        this.comments = comments;
    
        // Check and load user details if `user` is an ID
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
  
  fetchSummary(): void {
    if (this.data.task.description) {  // Make sure there is a description
      this.taskService.getDescriptionSummary(this.data.task.description).subscribe({
        next: (response) => {
          this.summarizedText = response.summarized_text;  // Store the summarized text
          this.isSummaryVisible = true;  // Show the summary
        },
        error: (error) => {
          console.error('Error fetching summary:', error);  // Error handling
        }
      });
    }
  }
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
  
  deleteTask(taskId: number) {

    console.log('groupId'+taskId)
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.dialogRef.close(); // Close the popup after adding the group

      },
      error: (error) => {
        alert('Error while deleting');
      }
    });
}
navigateToUpdateTask(taskId: number){
  const dialogRef = this.dialog.open(TaskFormComponent, {
    width: '600px',
    
    data: {
      task: this.data.task, 
    },

  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadComments(); // Reload comments or other data as needed
    }
  });
}
}