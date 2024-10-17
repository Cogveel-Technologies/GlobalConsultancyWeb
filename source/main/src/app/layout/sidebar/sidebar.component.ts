import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '@core';
import { RouteInfo } from './sidebar.metadata';
import { loginService } from 'app/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  public roleName: string;
  listMaxHeight?: string;
  listMaxWidth?: string;
  headerHeight = 60;
  routerObj;
  menu: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private loginService: loginService
  ) {
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }

  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }

  ngOnInit() {
    this.menu = JSON.parse(localStorage.getItem('menu'))
   

    console.log(this.menu)
    const accessiblePaths = this.extractPaths(this.menu);
    localStorage.setItem('accessiblePaths', JSON.stringify(accessiblePaths));
    console.log(this.menu);

    this.sidebarItems = this.menu.filter((sidebarItem) => {
      return sidebarItem;
    });

    this.bodyTag = this.document.body;
    this.setMenuHeight(); // Set the height for the sidebar
  }

  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }

  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }

  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1170) {
      // Collapse the sidebar on smaller screens
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      // Keep the sidebar expanded on larger screens
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }

  mouseHover() {
    // Remove this logic to prevent the sidebar from collapsing on hover
  }

  mouseOut() {
    // Remove this logic to prevent the sidebar from collapsing on mouse out
  }

  extractPaths(menu: any[]): string[] {
    let paths: string[] = [];
    menu.forEach((item) => {
      if (item.path) {
        paths.push(item.path);
      }
      if (item.submenu && item.submenu.length > 0) {
        paths = paths.concat(this.extractPaths(item.submenu));
      }
    });
    return paths;
  }

}
