import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { GroupService } from 'src/app/service/group.service';
import { AlertsComponent } from '../alerts/alerts.component';

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
    private dialog: MatDialog,
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

  // Crée un formulaire avec les champs nécessaires
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

  // Remplir le formulaire avec les données d'un groupe existant (mode édition)
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

  // Gère le changement de l'image de fond
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

  // Gère le changement de l'image de profil
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

  // Soumet le formulaire
  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData = new GroupEntity(
        this.backgroundImageFile?.name || this.data.group?.backgroundImage || '',
        this.profilePictureFile?.name || this.data.group?.profilePicture || '',
        this.groupForm.value.nom,
        this.groupForm.value.description
      );
  
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
            this.showPopup('error accured');
          }
        });
      } else {
        this.groupService.addGroup(groupData).subscribe({
          next: () => {
            console.log('Group added successfully');
            this.dialogRef.close();
          },
          error: (err) => {
            this.showPopup('error accured');
          }
        });
      }
    } else {
      this.showPopup('Please fill in all the required fields.');
    }
  }
  
  // Affiche une popup avec un message d'alerte
  showPopup(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px'
    });
  }

  // Ferme le formulaire sans enregistrer
  onCancel(): void {
    this.dialogRef.close();
  }
}
