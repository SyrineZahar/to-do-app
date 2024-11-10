import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupEntity } from 'src/app/classe/GroupEntity';
import { AuthService } from 'src/app/service/Auth.service';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService, private groupService: GroupService) { }
  userName: String | undefined;
  userGroups: GroupEntity[] = [];

  ngOnInit(): void {
      const user = this.authService.getUser();
      if (user) {
        this.userName = user.name;
        this.loadGroups(user.id);
      }  
    }
  loadGroups(id: number): void {
    this.groupService.getGroupsByUser(id).subscribe({
      next: (groups: GroupEntity[]) => {
        this.userGroups = groups; 
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching groups:', err);
      }
    });
  }
  goToKanban(groupId: number | undefined): void {
    if (groupId !== undefined) {
      this.router.navigate(['/kanban', groupId]);
    } else {
      console.error('Group ID is undefined!');
    }
  }

}
