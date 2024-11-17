import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  groupForm!: FormGroup;
  backgroundImageFile: File | null = null;
  profilePictureFile: File | null = null;
  backgroundImageUrl: string | null = null;
  profilePictureUrl: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private dialogRef: MatDialogRef<GroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupEntity | null }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data.group;
    this.createForm();

    if (this.isEditMode && this.data.group) {
      this.populateForm(this.data.group);
    }
  }

  private createForm(): void {
    this.groupForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      backgroundImage: [null],
      profilePicture: [null],
      users: [],
      tasks: []
    });
  }

  private populateForm(group: GroupEntity): void {
    this.groupForm.patchValue({
      nom: group.nom,
      description: group.description,
      backgroundImage: group.backgroundImage,
      profilePicture: group.profilePicture
    });

    if (group.backgroundImage) {
      this.backgroundImageUrl = group.backgroundImage;
    }
    if (group.profilePicture) {
      this.profilePictureUrl = group.profilePicture;
    }
  }

  onBackgroundImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.backgroundImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.backgroundImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.backgroundImageFile);
    } else {
      this.backgroundImageFile = null;
      this.backgroundImageUrl = null;
    }
  }

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profilePictureFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result as string;
      };
      reader.readAsDataURL(this.profilePictureFile);
    } else {
      this.profilePictureFile = null;
      this.profilePictureUrl = null;
    }
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData = new GroupEntity(
        this.backgroundImageFile?.name || this.data.group?.backgroundImage || '',
        this.profilePictureFile?.name || this.data.group?.profilePicture || '',
        this.groupForm.value.nom,
        this.groupForm.value.description
      );
  
      // Include the ID if we are editing an existing group
      if (this.isEditMode && this.data.group?.id) {
        groupData.id = this.data.group.id;
      }
  
      if (this.isEditMode) {
        this.groupService.editGroup(groupData).subscribe({
          next: () => {
            console.log('Group updated successfully');
            this.dialogRef.close();
          },
          error: (err) => {
            alert('error accured');
          }
        });
      } else {
        this.groupService.addGroup(groupData).subscribe({
          next: () => {
            console.log('Group added successfully');
            this.dialogRef.close();
          },
          error: (err) => {
            alert('Error accured');
          }
        });
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
