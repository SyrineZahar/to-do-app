import { Component, OnInit } from '@angular/core';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { GroupService } from 'src/app/service/group.service';
import { User } from 'src/app/classe/User';
import { userService } from 'src/app/service/User.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupFormComponent } from '../group-form/group-form.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupdetailsComponent } from '../groupdetails/groupdetails.component';
import { AlertsComponent } from '../alerts/alerts.component';

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
  filterForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private groupService: GroupService,
    private userService: userService,
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      user_id: new FormControl(null)
    });

    this.filterForm = new FormGroup({
      filter_user_id: new FormControl(null)
    });

    this.groupService.getGroups().subscribe({
      next: (data: GroupEntity[]) => {
        this.groups = data;
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      }
    });

    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  navigateToGroupForm(group?: GroupEntity, event?: MouseEvent) {
    event?.stopPropagation();
    
    const dialogRef = this.dialog.open(GroupFormComponent, {
      data: { group: group || null } 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit(); 
    });
  }

  selectGroup(event: MouseEvent, group: GroupEntity) {
    event.stopPropagation();

    this.selectedGroup = group;

    this.dialog.open(GroupdetailsComponent, {
      data: { group: this.selectedGroup }
    });
  }

  addUser() {
    const selectedUserId = this.userForm.value.user_id;

    if (this.selectedGroup && selectedUserId) {
      const selectedUser = this.users.find(user => user.id === selectedUserId);

      if (selectedUser) {
        this.groupService.addUserToGroup(Number(this.selectedGroup.id), selectedUser).subscribe({
          next: () => {
            console.log('Used added succesfuly and an email is sent');
          },
          error: (error) => {
            console.error("Erreur lors de l'ajout de l'utilisateur au groupe", error);
          }
        });
      }
    }
  }

  deleteGroup(groupId: number, event: MouseEvent) {
    event.stopPropagation();

    this.groupService.deleteGroup(groupId).subscribe({
      next: () => {
        this.groups = this.groups.filter(group => group.id !== groupId);
      },
      error: (error) => {
        console.error('Error deleting group:', error);
        this.showPopup('You cannot delete the group because it contains users.');
      }
    });
  }

  showPopup(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px'
    });
  }
}
