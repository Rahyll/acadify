import { Component, Input } from '@angular/core';
import { NavBarComponent } from './component/layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './component/layout/side-bar/side-bar.component';
import { MainComponent } from './component/layout/main/main.component';
import { NgClass } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { fadeInOut, slideInOut } from './animation';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, MainComponent],
  animations: [slideInOut],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  _isSideBarVisible!: boolean;
  @Input()
  get isSideBarVisible(): boolean {
    return this._isSideBarVisible;
  }
  set isSideBarVisible(val: boolean) {
    this._isSideBarVisible = val;
  }
}
