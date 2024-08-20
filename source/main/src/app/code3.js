// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
// import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
// import * as CryptoJS from 'crypto-js';
// import { AdminService } from '../admin.service';
// import { User } from './user.model';
// import { FormControl } from '@angular/forms';
// import { PageEvent } from '@angular/material/paginator';

// @Component({
//   selector: 'app-listusers',
//   templateUrl: './listusers.component.html',
//   styleUrls: ['./listusers.component.scss']
// })
// export class ListusersComponent implements OnInit {
//   breadscrums = [
//     {
//       title: 'Users List',
//       items: ['Tables'],
//       active: 'Admin Users',
//     },
//   ];
//   users$: Observable<User[]>;
//   totalUsers: number = 0;
  
//   searchControl: FormControl = new FormControl('');
//   sortField: string = 'id'; // Default sort field
//   sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction
//   pageSize: number = 10; // Default page size
//   currentPage: number = 1; // Default current page
//   totalPages: number = 1; // Total number of pages

//   pageSizeOptions = [5, 10, 25, 100]; // Dropdown options for page size

//   // BehaviorSubjects to manage the state
//   private pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
//   private currentPageSubject = new BehaviorSubject<number>(this.currentPage);
//   private sortFieldSubject = new BehaviorSubject<string>(this.sortField);
//   private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>(this.sortDirection);
//   private searchTermSubject = new BehaviorSubject<string>('');

//   constructor(
//     private router: Router,
//     private adminService: AdminService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit() {
//     // Combine search, pagination, and sorting
//     this.users$ = combineLatest([
//       this.searchControl.valueChanges.pipe(
//         startWith(''),
//         throttleTime(100),
//         distinctUntilChanged(),
//         tap(term => this.searchTermSubject.next(term))
//       ),
//       this.pageSizeSubject,
//       this.currentPageSubject,
//       this.sortFieldSubject,
//       this.sortDirectionSubject
//     ]).pipe(
//       switchMap(([searchTerm, pageSize, currentPage, sortField, sortDirection]) => {
//         console.log('Fetching data with', { searchTerm, pageSize, currentPage, sortField, sortDirection });
//         return this.adminService.getUsersList({
//           limit: pageSize,
//           orderBy: sortField,
//           sortExpression: sortDirection,
//           currentPage: currentPage,
//           searchTerm: searchTerm
//         });
//       }),
//       tap(response => {
//         console.log('Refreshed service response:', response);
//         this.totalUsers = response.pageInfo.totalRecords || 0;
//         this.totalPages = response.pageInfo.totalPages || 1;
//         this.currentPage = response.pageInfo.currentPage || 1;
        
//       }),
//       map(response => response.data)
//     );

//     // Trigger initial load
//     this.refreshUsers();
//   }

//   refreshUsers() {
//     // Trigger refresh by updating subjects
//     this.searchTermSubject.next(this.searchControl.value);
//     this.sortFieldSubject.next(this.sortField);
//     this.sortDirectionSubject.next(this.sortDirection);
//     this.pageSizeSubject.next(this.pageSize);
//     this.currentPageSubject.next(this.currentPage);
//   }

//   sort(field: string) {
//     const direction = this.sortField === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
//     this.sortField = field;
//     this.sortDirection = direction;
//     this.refreshUsers();
//   }

//   addUser() {
//     this.router.navigate(['/admin/adminusers']);
//   }

//   refreshPage() {
//     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//     this.router.navigate(['/admin/listusers']).then(() => {
//       window.location.reload();
//     });
//   }

//   deleteUser(userId: number) {
//     this.adminService.deleteUser(userId).subscribe({
//       next: () => {
//         this.refreshUsers();
//         this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
//       },
//       error: () => {
//         this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
//       }
//     });
//   }

//   encryptData(data: any): string {
//     const key = CryptoJS.enc.Utf8.parse('1234567890123456');
//     const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
//     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
//     return encrypted.toString();
//   }

//   editUser(userId: number) {
//     this.router.navigate(['/admin/adminusers'], {
//       queryParams: { id: userId }
//     });
//   }

//   viewUser(userId: number) {
//     this.router.navigate(['/admin/view-users'], {
//       queryParams: { id: userId }
//     });
//   }

//   addUserDocument(userId: number) {
//     this.users$.subscribe(users => {
//       const view = users.find(el => el.id === userId);
//       if (view) {
//         const encryptedData = this.encryptData(view);
//         this.router.navigate(['/admin/user-document'], {
//           queryParams: { data: encryptedData }
//         });
//       }
//     });
//   }

//   onPageChange(event: PageEvent) {
//     this.pageSize = event.pageSize;
//     this.currentPage = event.pageIndex + 1; // pageIndex is 0-based
//     this.pageSizeSubject.next(this.pageSize);
//     this.currentPageSubject.next(this.currentPage);
//   }
// }




{/* <section class="content">
  <div class="container-fluid">
    <div class="block-header" *ngFor="let breadscrum of breadscrums">
      <!-- breadcrumb -->
      <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items"
        [active_item]="breadscrum.active"></app-breadcrumb>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
          <div class="materialTableHeader">
            <div class="left">
              <ul class="header-buttons-left ms-0">
                <li class="tbl-title me-2">
                  <h2>Users List</h2>
                </li>
                <li class="tbl-search-box">
                  <label for="search-input"><i class="material-icons search-icon">search</i></label>
                  <input placeholder="Search" type="text" [formControl]="searchControl"
                    class="browser-default search-field" aria-label="Search box">
                </li>
              </ul>
            </div>
            <div class="right">
              <ul class="tbl-export-btn">
                <li class="tbl-header-btn">
                  <div class="m-l-10" matTooltip="ADD">
                    <button mat-mini-fab color="primary" (click)="addUser()">
                      <mat-icon class="col-white">add</mat-icon>
                    </button>
                  </div>
                </li>
                <li class="tbl-header-btn">
                  <div class="m-l-10" matTooltip="REFRESH">
                    <button mat-mini-fab color="primary" (click)="refreshPage()">
                      <mat-icon class="col-white">refresh</mat-icon>
                    </button>
                  </div>
                </li>
                <li class="tbl-header-btn">
                  <div class="export-button m-l-10" matTooltip="XLSX">
                    <img src="assets/images/icons/xlsx.png" alt="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row clearfix">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
          <div class="header">
            <h2>Users Details</h2>
          </div>
          <div class="body  table-responsive">
            <table class="table table-hover table-responsive">
              <thead>
                <tr>
                  <th (click)="sort('id')" class="text-nowrap">S No.
                    <mat-icon *ngIf="sortField === 'id' && sortDirection === 'asc'"
                      class="allign">arrow_upward</mat-icon>
                    <mat-icon *ngIf="sortField === 'id' && sortDirection === 'desc'"
                      class="allign">arrow_downward</mat-icon>
                    <mat-icon *ngIf="sortField !== 'id'" class="allign">arrow_upward</mat-icon> <!-- Default icon -->
                  </th>
                  <th (click)="sort('firstName')" class="text-nowrap">First Name
                    <mat-icon *ngIf="sortField === 'firstName' && sortDirection === 'asc'"
                      class="allign">arrow_upward</mat-icon>
                    <mat-icon *ngIf="sortField === 'firstName' && sortDirection === 'desc'"
                      class="allign">arrow_downward</mat-icon>
                    <mat-icon *ngIf="sortField !== 'firstName'" class="allign">arrow_upward</mat-icon>
                    <!-- Default icon -->
                  </th>
                  <th (click)="sort('middleName')" class="text-nowrap">Middle Name
                    <mat-icon *ngIf="sortField === 'middleName' && sortDirection === 'asc'"
                      class="allign">arrow_upward</mat-icon>
                    <mat-icon *ngIf="sortField === 'middleName' && sortDirection === 'desc'"
                      class="allign">arrow_downward</mat-icon>
                    <mat-icon *ngIf="sortField !== 'middleName'" class="allign">arrow_upward</mat-icon>
                    <!-- Default icon -->
                  </th>
                  <th (click)="sort('lastName')" class="text-nowrap">Last Name
                    <mat-icon *ngIf="sortField === 'lastName' && sortDirection === 'asc'"
                      class="allign">arrow_upward</mat-icon>
                    <mat-icon *ngIf="sortField === 'lastName' && sortDirection === 'desc'"
                      class="allign">arrow_downward</mat-icon>
                    <mat-icon *ngIf="sortField !== 'lastName'" class="allign">arrow_upward</mat-icon>
                    <!-- Default icon -->
                  </th>
                  <th (click)="sort('email')" class="text-nowrap">Email
                    <mat-icon *ngIf="sortField === 'email' && sortDirection === 'asc'"
                      class="allign">arrow_upward</mat-icon>
                    <mat-icon *ngIf="sortField === 'email' && sortDirection === 'desc'"
                      class="allign">arrow_downward</mat-icon>
                    <mat-icon *ngIf="sortField !== 'email'" class="allign">arrow_upward</mat-icon> <!-- Default icon -->
                  </th>
                  <th (click)="sort('gender')" class="text-nowrap">Gender
                    <mat-icon *ngIf="sortField === 'gender' && sortDirection === 'asc'"
                      class="allign">arrow_upward</mat-icon>
                    <mat-icon *ngIf="sortField === 'gender' && sortDirection === 'desc'"
                      class="allign">arrow_downward</mat-icon>
                    <mat-icon *ngIf="sortField !== 'gender'" class="allign">arrow_upward</mat-icon>
                    <!-- Default icon -->
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users$ | async; let i = index">
                  <td data-label="S No.">{{ i + 1 }}</td>
                  <td data-label="First Name">{{ user.firstName }}</td>
                  <td data-label="Middle Name">{{ user.middleName }}</td>
                  <td data-label="Last Name">{{ user.lastName }}</td>
                  <td data-label="Email">{{ user.email }}</td>
                  <td data-label="Gender">{{ user.gender }}</td>
                  <td data-label="Actions">
                    <button mat-icon-button color="primary" (click)="editUser(user.id)" matTooltip="Edit">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteUser(user.id)" matTooltip="Delete">
                      <mat-icon>delete</mat-icon>
                    </button>
                    <button mat-icon-button color="success" (click)="viewUser(user.id)" matTooltip="View">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Other HTML code for the component -->

            <app-pagination [length]="totalUsers" [pageSize]="pageSize" [pageSizeOptions]="pageSizeOptions"
              (pageChange)="onPageChange($event)">
            </app-pagination>


          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}





{/* <div>
    <span *ngFor="let field of sortFields" (click)="sort(field)" class="sortable-header" class="text-nowrap">
      {{ field }}
      <mat-icon *ngIf="sortField === field && sortDirection === 'asc'"  class="allign">arrow_upward</mat-icon>
      <mat-icon *ngIf="sortField === field && sortDirection === 'desc'"  class="allign">arrow_downward</mat-icon>
      <mat-icon *ngIf="sortField !== field"  class="allign">arrow_upward</mat-icon> <!-- Default icon -->
    </span>
  </div>
  



  import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  @Input() sortField: string;
  @Input() sortDirection: 'asc' | 'desc';
  @Input() sortFields: string[] = [];

  @Output() sortChange = new EventEmitter<{ field: string, direction: 'asc' | 'desc' }>();

  sort(field: string) {
    const direction = this.sortField === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ field, direction });
  }
}



.sortable-header {
  // cursor: pointer;
  // display: inline-flex;
  // align-items: center;
 
}
.allign{
  vertical-align:middle;
  font-size: 1.1rem;
  color: #ccc;
  cursor: pointer;
} */}








// <mat-paginator [length]="length"
//                [pageSize]="pageSize"
//                [pageSizeOptions]="pageSizeOptions"
//                (page)="onPageChange($event)">
// </mat-paginator>





// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { PageEvent } from '@angular/material/paginator';

// @Component({
//   selector: 'app-pagination',
//   templateUrl: './pagination.component.html',
//   styleUrls: ['./pagination.component.scss']
// })
// export class PaginationComponent {
//   @Input() length: number;
//   @Input() pageSize: number;
//   @Input() pageSizeOptions: number[];
//   @Output() pageChange = new EventEmitter<PageEvent>();

//   onPageChange(event: PageEvent) {
//     this.pageChange.emit(event);
//   }
// }



// mat-paginator{
//   background-color:  #F1F2F7;
//   width: 100%;

// }