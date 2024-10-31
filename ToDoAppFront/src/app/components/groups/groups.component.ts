import { Component, OnInit } from '@angular/core';
import { GroupEntity } from 'src/app/classe/GroupEntity'; // Import de la classe GroupEntity
import { GroupService } from 'src/app/service/group.service'; // Import de votre service de groupe
import { Router } from '@angular/router'; // Import du Router
import { User } from 'src/app/classe/User';
import { userService } from 'src/app/service/User.service';
import { FormControl, FormGroup } from '@angular/forms';

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


  constructor(private groupService: GroupService, private router: Router, private userService: userService) {

  }

  ngOnInit() {

    this.userForm = new FormGroup({
      user_id: new FormControl(null) 
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
    this.router.navigate(['/groupForm']);
  }

  selectGroup(group: GroupEntity) {
    this.selectedGroup = group;
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
  }}
