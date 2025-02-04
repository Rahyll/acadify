import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { NgFor } from '@angular/common';

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ChartModule,
    TableModule,
    PanelModule,
    ToastModule,
    TabViewModule,
    InputTextModule,
    NgFor,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  sidebarVisible: boolean = false;
  sidebarItems: string[] = [
    'Dashboard',
    'Manage Users',
    'Manage Students',
    'Manage Faculty',
    'Manage Courses',
    'Attendance',
    'Fees Management',
    'Library Management',
    'Reports & Analytics',
    'Settings',
  ];

  totalUsers: number = 150;
  totalStudents: number = 120;
  totalFaculty: number = 30;
  coursesOffered: number = 25;
  recentActivities: string[] = [
    'John Smith (Faculty) added a new course: "Physics"',
    'Student Adam Lee paid tuition fees',
    'Library issued "Introduction to AI" to Jane Doe',
  ];
  notifications: string[] = [
    '3 New Student Registration Requests Pending',
    'Fee Payment Deadline Approaching',
    'System Update Scheduled for Maintenance',
  ];

  studentEnrollmentData: any = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Enrollments',
        data: [100, 200, 300, 400, 500],
        borderColor: '#42A5F5',
        fill: false,
      },
    ],
  };

  feeCollectionData: any = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Fee Collected',
        data: [50, 100, 150, 200, 250],
        backgroundColor: '#66BB6A',
      },
    ],
  };

  facultyWorkloadData: any = {
    labels: ['Math', 'Physics', 'Chemistry', 'Biology'],
    datasets: [
      {
        data: [4, 6, 5, 7],
        backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB', '#4BC0C0'],
      },
    ],
  };

  coursePopularityData: any = {
    labels: ['Math', 'Physics', 'Chemistry', 'Biology'],
    datasets: [
      {
        data: [30, 50, 40, 60],
        backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB', '#4BC0C0'],
      },
    ],
  };

  userGrowthData: any = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Users Growth',
        data: [150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 550, 600],
        borderColor: '#42A5F5',
        fill: false,
      },
    ],
  };

  // Monthly Attendance Data
  attendanceData: any = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Attendance',
        data: [88, 90, 85, 92, 95, 93, 90, 89, 91, 94, 96, 92],
        backgroundColor: '#66BB6A',
        borderColor: '#66BB6A',
        fill: false,
      },
    ],
  };

  // Financial Overview Data
  financialOverviewData: any = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Fee Collection',
        data: [
          5000, 7000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000,
          15000, 16000,
        ],
        borderColor: '#FF5722',
        fill: false,
      },
    ],
  };

  // Course Enrollment Trends Data
  courseEnrollmentTrendsData: any = {
    labels: [
      'Math',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Economics',
    ],
    datasets: [
      {
        label: 'Course Enrollment Trends',
        data: [120, 150, 110, 180, 200, 160],
        backgroundColor: '#FFEB3B',
      },
    ],
  };

  // Faculty Performance Data
  facultyPerformanceData: any = {
    labels: [
      'Dr. Smith',
      'Dr. Johnson',
      'Prof. Lee',
      'Dr. Brown',
      'Prof. Davis',
    ],
    datasets: [
      {
        data: [80, 95, 90, 88, 85],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#F44336',
        ],
      },
    ],
  };

  // Course Completion Rates Data
  courseCompletionData: any = {
    labels: [
      'Math',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Economics',
    ],
    datasets: [
      {
        data: [75, 85, 65, 90, 80, 70],
        backgroundColor: [
          '#FFEB3B',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#F44336',
        ],
      },
    ],
  };

  constructor() {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  addNewUser() {
    console.log('Add New User');
  }
  manageUsers() {
    console.log('Manage Users');
  }
  generateReports() {
    console.log('Generate Reports');
  }
}
