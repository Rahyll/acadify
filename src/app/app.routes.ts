import { Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { AdminDashboardComponent } from './component/dashboard/admin/admin-dashboard.component';
import { AddStudentsComponent } from './component/students/add-students/add-students.component';
import { ListStudentComponent } from './component/students/list-student/list-student.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'students',
    component: ListStudentComponent,
  },
  {
    path: 'add-student',
    component: AddStudentsComponent,
  },
];
