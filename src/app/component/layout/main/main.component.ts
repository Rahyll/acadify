import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { fadeInOut, slideMain } from '../../../animation';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeInOut, slideMain],
})
export class MainComponent {
  @Input() isSideBarVisible = false;
  @Output() closeSidebar = new EventEmitter<void>();
  isMdScreen = window.innerWidth >= 768; // Check screen size on load

  constructor() {
    this.updateScreenSize(); // Initialize the screen size check
  }
  @HostListener('window:resize', [])
  onResize() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    this.isMdScreen = window.innerWidth >= 768;
  }
}
