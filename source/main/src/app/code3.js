{/* <nav #navbar class="navbar" [ngClass]="isNavbarShow ? 'active' : 'inactive'">
  <div class="container-fluid">
    <div class="navbar-header">
      <a href="#" onClick="return false;" class="navbar-toggle collapsed"
        (click)="isNavbarCollapsed = !isNavbarCollapsed" aria-expanded="false"></a>
      <!-- mobile menu bars -->
      <a href="#" onClick="return false;" class="bars" (click)="mobileMenuSidebarOpen($event,'overlay-open')"></a>
      <a class="navbar-brand" routerLink="dashboard/main">
        <img src="assets/images/user/COGVEEL.png" class="logo" alt="" />
        <!-- <span class="logo-name fs-5">Consultancy</span> -->
      </a>
      <!--  -->
    </div>
    <div class="collapse navbar-collapse" [ngClass]="isNavbarCollapsed ? '' : 'show'">
      <ul class="pull-left collapse-menu-icon">
        <li class="menuBtn ">
          <button mat-button (click)="callSidemenuCollapse()" class=" sidemenu-collapse nav-notification-icons">
            <app-feather-icons [icon]="'menu'" [class]="'header-icon'"></app-feather-icons>
          </button>
         
        </li>
      </ul>
     
      <ul class="nav navbar-nav navbar-right">
      
        <!-- Full Screen Button -->
        <!-- <li class="fullscreen">
          <button mat-button class="nav-notification-icons" (click)="callFullscreen()">
            <app-feather-icons [icon]="'maximize'" [class]="'header-icon'"></app-feather-icons>
          </button>
        </li> -->
        <!-- #END# Full Screen Button -->
        <!-- <li class="nav-item">
          <button mat-button [matMenuTriggerFor]="languagemenu" class="lang-dropdown nav-notification-icons"> <img
              *ngIf="flagvalue !== undefined" src="{{flagvalue}}" height="16">
            <img *ngIf="flagvalue === undefined" src="{{defaultFlag}}" height="16"></button>
          <mat-menu #languagemenu="matMenu" class="lang-item-menu">
            <div *ngFor="let item of listLang" class="lang-item">
              <button mat-menu-item class="dropdown-item lang-item-list"
                (click)="setLanguage(item.text, item.lang, item.flag)"
                [ngClass]="{'active': langStoreValue === item.lang}">
                <img src="{{item.flag}}" class="flag-img" height="12"> <span class="align-middle">{{item.text}}</span>
              </button>
            </div>
          </mat-menu>
        </li> -->
        <!-- #START# Notifications-->
        <!-- <li class="nav-item" ngbDropdown>
          <button mat-button [matMenuTriggerFor]="notificationMenu" class="nav-notification-icons">
            <app-feather-icons [icon]="'bell'" [class]="'header-icon'"></app-feather-icons>
            <span class="label-count bg-orange"></span>
          </button>
          <mat-menu #notificationMenu="matMenu" class="nfc-menu">
            <div class="nfc-header">
              <h5 class="mb-0">Notitications</h5>
              <a class="nfc-mark-as-read">Mark all as read</a>
            </div>
            <div class="nfc-dropdown">
              <ng-scrollbar style="height: 350px" visibility="hover">
                <div class="noti-list header-menu">
                  <div class="menu">
                    <div>
                      <button mat-menu-item *ngFor="let notification of notifications" onClick="return false;"
                        [ngClass]="[notification.status]">
                        <span class="table-img msg-user ">
                          <i class="material-icons-two-tone nfc-type-icon"
                            [ngClass]="[notification.color]">{{notification.icon}}</i>
                        </span>
                        <span class="menu-info">
                          <span class="menu-title">{{notification.message}}</span>
                          <span class="menu-desc mt-2">
                            <i class="material-icons">access_time</i> {{notification.time}}
                          </span>
                        </span>
                        <span class="nfc-close">
                          <app-feather-icons [icon]="'x'" [class]="'user-menu-icons'"></app-feather-icons>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </ng-scrollbar>
            </div>
            <div class="nfc-footer">
              <a class="nfc-read-all">Read
                All Notifications</a>
            </div>
          </mat-menu>
        </li> -->
        <!-- #END# Notifications-->
        <li class="nav-item user_profile">
          <button mat-button [matMenuTriggerFor]="profilemenu">
            <div class="chip dropdown-toggle" ngbDropdownToggle class="">
              <img src="assets/images/user.jpg" class="rounded-circle" width="32" height="32" alt="User">
            </div>
          </button>
          <!-- <mat-menu #profilemenu="matMenu" class="profile-menu">
            <div class="noti-list">
              <div class="menu ">
                <div class="user_dw_menu">
                  <button mat-menu-item>
                    <app-feather-icons [icon]="'user'" [class]="'user-menu-icons'"></app-feather-icons>Account
                  </button>
                  <button mat-menu-item>
                    <app-feather-icons [icon]="'mail'" [class]="'user-menu-icons'"></app-feather-icons>Inbox
                  </button>
                  <button mat-menu-item>
                    <app-feather-icons [icon]="'settings'" [class]="'user-menu-icons'"></app-feather-icons>Settings
                  </button>
                  <button mat-menu-item (click)="logout()">
                    <app-feather-icons [icon]="'log-out'" [class]="'user-menu-icons'"></app-feather-icons>Logout
                  </button>
                </div>
              </div>
            </div>
          </mat-menu> -->


          <mat-menu #profilemenu="matMenu" class="profile-menu">
            <div class="noti-list">
              <div class="menu">
          
                <!-- User Info Section -->
                <div class="user-info-container">
                  <div class="user-info">
                    <img src="assets/images/user/user.png" class="profile-pic" alt="Profile Picture" />
                    <div class="user-details">
                      <p class="user-name">{{user.firstName || user.studentName }}</p>
                      <p class="user-email">{{user.email || user.emailAddress}}</p>
                      <button mat-button class="manage-account-btn">Manage your Account</button>
                    </div>
                  </div>
                </div>
          
                <hr class="divider" />
          
                <!-- Menu Section -->
                <div class="user_dw_menu">
                  <!-- <button mat-menu-item>
                    <app-feather-icons [icon]="'user'" class="user-menu-icons"></app-feather-icons>Account
                  </button>
                  <button mat-menu-item>
                    <app-feather-icons [icon]="'mail'" class="user-menu-icons"></app-feather-icons>Inbox
                  </button>
                  <button mat-menu-item>
                    <app-feather-icons [icon]="'settings'" class="user-menu-icons"></app-feather-icons>Settings
                  </button> -->
                  <button class="ps-3" mat-menu-item (click)="logout()">
                    <app-feather-icons [icon]="'log-out'" class="user-menu-icons"></app-feather-icons>Logout
                  </button>
                </div>
          
              </div>
            </div>
          </mat-menu>
           */}










// <section class="content">
//     <div class="content-block">
//         <div class="block-header" *ngFor="let breadscrum of breadscrums">
//             <!-- breadcrumb -->
//             <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items" [active_item]="breadscrum.active"></app-breadcrumb>
//         </div>

//         <div class="row clearfix">
//             <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                 <div class="card">
//                     <div class="body">
//                         <form class="m-4" [formGroup]="dropdownForm" (ngSubmit)="onSubmit()">
//                             <div class="row">
//                                 <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
//                                     <mat-form-field class="example-full-width">
//                                         <mat-label>Dropdown List Name</mat-label>
//                                         <input matInput formControlName="dropDownListName" type="text" required>
//                                     </mat-form-field>
//                                 </div>

//                                 <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
//                                     <mat-form-field class="example-full-width">
//                                         <mat-label>Dropdown Values</mat-label>
//                                         <input matInput formControlName="dropDownValue" type="text" placeholder="Enter a value">
//                                     </mat-form-field>
//                                     <button type="button" mat-raised-button color="primary" (click)="addValue()">Add</button>
//                                     <mat-hint>Click 'Add' to add values one by one</mat-hint>
//                                 </div>
//                                 <!-- <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
//                                     <mat-form-field class="example-full-width">
//                                         <mat-label>Dropdown Values</mat-label>
//                                         <input matInput formControlName="dropDownValue" type="text" placeholder="Enter a value">
//                                         <button mat-icon-button matSuffix color="primary" (click)="addValue()" aria-label="Add Value">
//                                             <mat-icon>add</mat-icon>
//                                         </button>
//                                     </mat-form-field>
//                                     <mat-hint>Click 'Add' button to add values one by one</mat-hint>
//                                 </div>
//                              -->
//                             </div>

//                             <!-- Display added values in a box or list -->
//                             <div class="row">
//                                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                                     <div *ngIf="addedValues.length > 0" class="added-values-box">
//                                         <h5>Added Values:</h5>
//                                         <ul>
//                                             <li *ngFor="let value of addedValues; let i = index">
//                                                 {{ value }}
//                                                 <button type="button" (click)="removeValue(i)" class="remove-btn">Remove</button>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div class="row">
//                                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                                     <button class="btn-space" mat-raised-button color="primary" [disabled]="addedValues.length === 0 || !dropdownForm.get('dropDownListName')?.valid" type="submit">Submit</button>
//                                     <button type="button" mat-raised-button color="warn" (click)="onCancel()">Cancel</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>


