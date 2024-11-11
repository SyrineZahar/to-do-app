import { Component, OnInit } from '@angular/core';
import { GroupEntity } from 'src/app/classe/GroupEntity'; // Import de la classe GroupEntity
import { GroupService } from 'src/app/service/group.service'; // Import de votre service de groupe
import { Router } from '@angular/router'; // Import du Router
import { User } from 'src/app/classe/User';
import { userService } from 'src/app/service/User.service';
import { FormControl, FormGroup } from '@angular/forms';
import { taskService } from 'src/app/service/Task.service';
import { GroupFormComponent } from '../group-form/group-form.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupdetailsComponent } from '../groupdetails/groupdetails.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: GroupEntity[] = [];
  selectedGroup: GroupEntity | null = null;
  users!: User[];

  userForm!: FormGroup;
  filterForm!: FormGroup




  constructor(private dialog: MatDialog, private groupService: GroupService, private router: Router, private userService: userService, private taskService: taskService) {

  }

  ngOnInit() {

    this.userForm = new FormGroup({
      user_id: new FormControl(null) 
    });

    this.filterForm = new FormGroup({
      filter_user_id: new FormControl(null)
    });
    

    this.groupService.getGroups().subscribe((data: GroupEntity[]) => {
      console.log(data);
      this.groups = data;
    });

    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    }, (error: any) => {
      console.error('Error fetching users:', error);
    });
  }
  

  navigateToGroupForm() {
    if (this.dialog) {
      const dialogRef = this.dialog.open(GroupFormComponent, {
        data: { }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    } else {
      console.error('Dialog instance is undefined');
    }
  }
  

  selectGroup(group: GroupEntity) {
    this.selectedGroup = group;

    this.dialog.open(GroupdetailsComponent, {
      data: { group: this.selectedGroup }
    });
  }

  addTask() {
    this.router.navigate(['/taskForm']);
  }

  addUser(){
    console.log(this.selectedGroup);

    const selectedUserId = this.userForm.value.user_id;
  
    if (this.selectedGroup && selectedUserId) {
      console.log(selectedUserId);
      const selectedUser = this.users.find(user => user.id == selectedUserId);
      console.log(selectedUser);
      if (selectedUser) {
        this.groupService.addUserToGroup(Number(this.selectedGroup.id), selectedUser).subscribe({
          next: (response) => {
            console.log('Utilisateur ajouté avec succès au groupe', response);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur au groupe', error);
          }
        });
      }
}
  }

  

  


 
  
}
