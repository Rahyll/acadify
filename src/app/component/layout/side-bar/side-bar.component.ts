import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Menu } from 'primeng/menu';
import { slideInOut } from '../../../animation';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Menu, RouterModule, NgIf],
  animations: [slideInOut],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  _visible: boolean = false;
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(val: boolean) {
    this._visible = val;
    this.visibleChange.emit(this._visible);
  }

  @Output() visibleChange = new EventEmitter<boolean>();

  items = [
    {
      label: 'Manage Users',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Add User',
          route: '/add-user',
        },
        {
          label: 'View Users',
          route: '/users',
        },
      ],
    },
    {
      label: 'Student Management',
      icon: 'pi pi-id-card',
      items: [
        {
          label: 'Add New Student',
          route: '/add-student',
        },
        {
          label: 'View Students',
          route: '/students',
        },
      ],
    },
    {
      label: 'Course Management',
      icon: 'pi  pi-graduation-cap',
      items: [
        {
          label: 'Add Course',
          route: '',
        },
        {
          label: 'Courses List',
          route: '',
        },
      ],
    },
    {
      label: 'Book Management',
      icon: 'pi pi-book',
      items: [{ label: 'View Books', route: '/books' }, { label: 'Add Book' }],
    },
    // {
    //   label: 'Student Management',
    //   items: [
    //     {
    //       label: 'Add',
    //       route: '',
    //     },
    //     {
    //       label: 'List',
    //       route: '',
    //     },
    //   ],
    // },
    // {
    //   label: 'Student Management',
    //   items: [
    //     {
    //       label: 'Add',
    //     },
    //     {
    //       label: 'List',
    //     },
    //   ],
    // },
  ];
}
