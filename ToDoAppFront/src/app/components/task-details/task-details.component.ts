import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/classe/Task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/service/Comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { taskService } from 'src/app/service/Task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from 'src/app/classe/Comment';

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

  ngOnInit(): void {
    this.loadComments();
    console.log(Number(this.data.task.id))
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private dialogRef: MatDialogRef<TaskDetailsComponent>,
    private router: Router,
    private taskService: taskService,
    private commentService: CommentService
  ) {
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      user: new FormControl('currentUser', Validators.required), // Replace with actual user data if needed
      task: new FormControl(this.data.task.id, Validators.required) // Assuming task has an id
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      
      // Call the CommentService to add the comment
      this.commentService.addComment(commentData).subscribe(response => {
        this.dialogRef.close();
      }, error => {
        console.error('Error adding comment:', error);
      });
    }
  }

  loadComments(): void {
    // Charge les commentaires à partir du service
    this.commentService.getCommentsByTaskId(Number(this.data.task.id)).subscribe({
      next: (data) => {
        this.comments = data; // Stocke les commentaires récupérés
        console.log(this.comments); // Affiche les commentaires dans la console pour le débogage
        // Vous pouvez également ajouter des fonctions ici pour manipuler ou afficher les commentaires
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load comments:', err); // Gestion des erreurs
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

}
