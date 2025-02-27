import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    ButtonModule,
    Avatar,
    BadgeModule,
    OverlayBadgeModule,
    LogoComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() isSideBarVisible = false;
  @Output() isSideBarVisibleChange = new EventEmitter<boolean>();
  ngOnInit() {}
  handleSideBar() {
    this.isSideBarVisible = !this.isSideBarVisible;
    this.isSideBarVisibleChange.emit(this.isSideBarVisible);
  }
}
