import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanDashboardComponent } from './components/kanban-dashboard/kanban-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { GroupdetailsComponent } from './components/groupdetails/groupdetails.component';
import { AlertsComponent } from './components/alerts/alerts.component';



@NgModule({
  declarations: [
    AppComponent,          
    KanbanDashboardComponent, 
    FooterComponent,       
    NavbarComponent,      
    TaskFormComponent, 
    SignupComponent, 
    GroupFormComponent, 
    GroupsComponent, 
    LoginComponent,  
    TaskDetailsComponent,
    TaskFormComponent, 
    DashboardUserComponent, 
    DashboardAdminComponent, 
    GroupdetailsComponent, AlertsComponent  
  ],
  imports: [
    BrowserModule,         
    MatIconModule,
    AppRoutingModule,      
    HttpClientModule,    
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    MatDialogModule,  

  ],
  providers: [],           
  bootstrap: [AppComponent]
})
export class AppModule { }