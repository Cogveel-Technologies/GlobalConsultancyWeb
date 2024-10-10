import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { InConfiguration, AuthService, WINDOW, LanguageService } from '@core';
import { AgentService } from 'app/agent/agent.service';
import { AdminService } from 'app/admin/admin.service';
import { ConsultancyApi } from 'app/consultancy/consultancy-services/api.service';
import { StudentService } from 'app/student/student.service';

interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public config!: InConfiguration;
  isNavbarCollapsed = true;
  isNavbarShow = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement: HTMLElement | undefined;
  isFullScreen = false;
  user: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private adminService: AdminService,
    private agentService: AgentService,
    private studentService: StudentService,
    private consultancyApi: ConsultancyApi 
  ) {
    super();
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
  ];
  notifications: Notifications[] = [
    {
      message: 'Please check your mail',
      time: '14 mins ago',
      icon: 'mail',
      color: 'nfc-green',
      status: 'msg-unread',
    },
    {
      message: 'New Patient Added..',
      time: '22 mins ago',
      icon: 'person_add',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Your leave is approved!! ',
      time: '3 hours ago',
      icon: 'event_available',
      color: 'nfc-orange',
      status: 'msg-read',
    },
    {
      message: 'Lets break for lunch...',
      time: '5 hours ago',
      icon: 'lunch_dining',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Patient report generated',
      time: '14 mins ago',
      icon: 'description',
      color: 'nfc-green',
      status: 'msg-read',
    },
    {
      message: 'Please check your mail',
      time: '22 mins ago',
      icon: 'mail',
      color: 'nfc-red',
      status: 'msg-read',
    },
    {
      message: 'Salary credited...',
      time: '3 hours ago',
      icon: 'paid',
      color: 'nfc-purple',
      status: 'msg-read',
    },
  ];
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    // if (offset > 50) {
    //   this.isNavbarShow = true;
    // } else {
    //   this.isNavbarShow = false;
    // }
  }
  ngOnInit() {
    const loginId = localStorage.getItem('id');
    const roleName = localStorage.getItem('roleName');

    this.config = this.configService.configData;

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.jpg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
     // Role-based API calls with id
     switch (roleName) {
      case 'Admin':
        this.fetchUserById(loginId);
        break;

      case 'Student':
        this.fetchStudentData(loginId);
        break;

      case 'Agent':
        this.fetchAgentDetails(loginId);
        break;

      case 'Consultancy':
        this.fetchConsultancyDetails(loginId);
        break;

      default:
        console.error('Role not recognized');
        break;
    }
  }

  fetchUserById(userId: string) {
    // Ensure that the userId is converted to a number using parseInt
    const numericUserId = parseInt(userId, 10);
  
    if (!isNaN(numericUserId)) {
      this.adminService.getUserById(numericUserId).subscribe(
        user => {
          this.user = user;  // Assign the user data to the user variable
          console.log(user);  // Log the user data for debugging
        },
        error => {
          console.error('Error fetching user data:', error);  // Handle the error
        }
      );
    } else {
      console.error('Invalid user ID:', userId);  // Handle invalid user ID case
    }
  }

  fetchStudentData(userId: string) {
    const numericUserId = parseInt(userId, 10);
  
    if (!isNaN(numericUserId)) {
      this.agentService.getStudentById(numericUserId).subscribe(
         user => {
          this.user = user;
          console.log('Fetched student:', this.user);
         
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    } else {
      console.error('No valid student ID found in localStorage');
    }
  }
  
  fetchAgentDetails(userId: string) {
    const numericUserId = parseInt(userId, 10);
  
    if (!isNaN(numericUserId)) {
      this.consultancyApi.getAgentDetails(numericUserId).subscribe(
        user => {
          this.user = user;
          console.log('Fetched agent:', this.user);
        },
        (error) => {
          console.error('Error fetching agent details:', error);
        }
      );
    } else {
      console.error('No valid agent ID found');
    }
  }
  
  fetchConsultancyDetails(userId: string) {
    const numericUserId = parseInt(userId, 10);
  
    if (!isNaN(numericUserId)) {
      this.adminService.getConsultancyById(numericUserId).subscribe(
        user => {
          this.user = user;
          console.log('Fetched consultancy details:', this.user);
        },
        (error) => {
          console.error('Error fetching consultancy details:', error);
        }
      );
    } else {
      console.error('No valid consultancy ID found');
    }
  }
  
  

  callFullscreen() {
    if (!this.isFullScreen) {
      this.docElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
