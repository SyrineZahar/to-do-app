import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/service/group.service';
import { taskService } from 'src/app/service/Task.service';
import { userService } from 'src/app/service/User.service';
import { AlertsComponent } from '../alerts/alerts.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  groupCount!: number;
  taskCount!: number;
  userCount!: number;
  

  constructor(private groupService: GroupService, private taskService: taskService, private userService: userService, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.getGroupStat()
    this.getTaskStat()
    this.geUserStat()
  }

  // Méthode pour récupérer le nombre total de groupes
  getGroupStat(): void {
    this.groupService.getGroupStat().subscribe(
      (count) => {
        this.groupCount = count
      }
    );
  }

  // Méthode pour récupérer le nombre total de tâches
  getTaskStat(): void {
    this.taskService.getTaskstat().subscribe(
      (count) => {
        this.taskCount = count
      }
    );
  }

  // Méthode pour récupérer le nombre total d'utilisateurs
  geUserStat(): void {
    this.userService.getUserstat().subscribe(
      (count) => {
        this.userCount = count
      }
    );
  }

  // Méthode pour notifier les utilisateurs en envoyant des emails
  notifyUsers(){
    this.taskService.notifyUsers().subscribe(
      next=>{
        this.showPopup('Emails sent successfully.');
      },
      error=>{
        this.showPopup('An error occurred');
      }
    )
  }

  // Méthode pour afficher un message d'alert
  showPopup(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px'
    });
  }

}
