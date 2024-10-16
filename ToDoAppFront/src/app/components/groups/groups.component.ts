import { Component, OnInit } from '@angular/core';
import { GroupEntity } from 'src/app/classe/GroupEntity'; // Import de la classe GroupEntity
import { GroupService } from 'src/app/service/group.service'; // Import de votre service de groupe

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: GroupEntity[] = [];
  selectedGroup: GroupEntity | null = null;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getGroups().subscribe((data: GroupEntity[]) => {
      this.groups = data;
    });
  }

  navigateToGroupForm() {
    // Logic to navigate to the group form
    console.log("Navigating to group form...");
  }

  selectGroup(group: GroupEntity) {
    this.selectedGroup = group;
  }
}
