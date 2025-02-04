import { Component } from '@angular/core';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AddUserComponent, ListUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  addFormVisible = false;

  handleAddForm(isVisible: boolean) {
    this.addFormVisible = isVisible;
  }
}
