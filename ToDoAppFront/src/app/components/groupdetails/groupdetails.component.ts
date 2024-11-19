import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/classe/User';
import { Task } from 'src/app/classe/Task';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { taskService } from 'src/app/service/Task.service';
import { GroupService } from 'src/app/service/group.service';
import { userService } from 'src/app/service/User.service';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit {
  filterForm: FormGroup;
  userForm: FormGroup;
  users: User[] = [];
  groupUser: User[] = [];
  filteredTasks: Task[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupEntity },
    private formBuilder: FormBuilder,
    private taskService: taskService,
    private userService: userService,
    private groupService: GroupService,
    private dialog: MatDialog
  ) {
    this.filterForm = this.formBuilder.group({
      filter_user_id: new FormControl(''),
    });
    this.userForm = this.formBuilder.group({
      user_id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchGroupUsers();
    this.fetchUsers();
    this.users = this.data.group.users ?? [];
    console.log(this.users)
    this.filteredTasks = this.data.group.tasks ?? [];
  }

  fetchGroupUsers() {
    const groupId = this.data.group.id;  
    this.userService.getUsersbygroup(Number(groupId)).subscribe({
      next: (users) => {
        this.groupUser = users;
      },
      error: (error) => {
        console.error('Error fetching users in group:', error);
      },
    });
  }

  filterTasksByUser() {
    const selectedUserId = this.filterForm.value.filter_user_id;
    const selectedGroupId = this.data.group.id;
    if (selectedUserId) {
      this.taskService
        .getTasksByUserIdAndGroupId(Number(selectedUserId), Number(selectedGroupId))
        .subscribe({
          next: (tasks) => {
            this.filteredTasks = tasks;
          },
          error: (error) => {
            console.error('Error fetching tasks:', error);
          },
        });
    } else {
      this.filteredTasks = this.data.group.tasks ?? [];
    }
  }

  addUser() {
    const selectedUserId = Number(this.userForm.value.user_id);

    if (!selectedUserId) {
      console.error('No user selected for adding.');
      return;
    }

    const selectedUser = this.users.find((user) => user.id === selectedUserId);
    if (!selectedUser) {
      console.error('User not found in the list.');
      return;
    }
    this.groupService.addUserToGroup(Number(this.data.group.id), selectedUser).subscribe({
      next: (updatedGroup) => {
        //this.showPopup('User added successfully');
        this.data.group = updatedGroup;
      },
      error: (error) => {
        console.error('Error adding user to group:', error);
        if (error.status === 400 && error.error.includes('User is already in the group')) {
          this.showPopup('This user is already in the group.');
        } else {
          this.showPopup('An error occurred while adding the user to the group.');
        }
      },
    });
  }
  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
  showPopup(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px'
    });
  }
}
