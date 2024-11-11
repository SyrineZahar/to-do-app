import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/service/group.service';
import { taskService } from 'src/app/service/Task.service';
import { userService } from 'src/app/service/User.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  groupCount!: number;
  taskCount!: number;
  userCount!: number;
  

  constructor(private groupService: GroupService, private taskService: taskService, private userService: userService ) {}

  ngOnInit(): void {
    this.getGroupStat()
    this.getTaskStat()
    this.geUserStat()
  }

  getGroupStat(): void {
    this.groupService.getGroupStat().subscribe(
      (count) => {
        this.groupCount = count
      }
    );
  }

  getTaskStat(): void {
    this.taskService.getTaskstat().subscribe(
      (count) => {
        this.taskCount = count
      }
    );
  }

  geUserStat(): void {
    this.userService.getUserstat().subscribe(
      (count) => {
        this.userCount = count
      }
    );
  }


}
