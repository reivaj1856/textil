import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  toggleOpen: HTMLElement | null = null;
  toggleClose: HTMLElement | null = null;
  collapseMenu: HTMLElement | null = null;

  ngOnInit(): void {
    this.toggleOpen = document.getElementById('toggleOpen');
    this.toggleClose = document.getElementById('toggleClose');
    this.collapseMenu = document.getElementById('collapseMenu');

    const handleClick = () => {
      if (this.collapseMenu) {
        if (this.collapseMenu.style.display === 'block') {
          this.collapseMenu.style.display = 'none';
        } else {
          this.collapseMenu.style.display = 'block';
        }
      }
    };

    if (this.toggleOpen) {
      this.toggleOpen.addEventListener('click', handleClick);
    }

    if (this.toggleClose) {
      this.toggleClose.addEventListener('click', handleClick);
    }
  }
}
