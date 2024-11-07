import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { AdminService } from '../admin.service';
import { User } from './user.model';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';


@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {
  breadscrums = [
    {
      title: 'Users',
      items: ['Superadmin'],
      active: 'Users',
    },
  ];
  users$: Observable<User[]>;
  totalUsers = 0;
  
  searchControl: FormControl = new FormControl('');
  sortField = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction
  pageSize: number = PAGE_SIZE_OPTIONS[0]; // Initialize with default value
  currentPage = 1; // Default current page
  totalPages = 1; // Total number of pages

  // BehaviorSubjects to manage the state
  private pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
  private currentPageSubject = new BehaviorSubject<number>(this.currentPage);
  private sortFieldSubject = new BehaviorSubject<string>(this.sortField);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>(this.sortDirection);
  private searchTermSubject = new BehaviorSubject<string>('');
  
  constructor(
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.pageSize = PAGE_SIZE_OPTIONS[0]; // Initialize here
    this.pageSizeSubject = new BehaviorSubject<number>(this.pageSize); // Then use it here
  }
  
  ngOnInit() {
    // Combine search, pagination, and sorting
    this.users$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        throttleTime(60),
        distinctUntilChanged(),
        tap(term => this.searchTermSubject.next(term))
      ),
      this.pageSizeSubject,
      this.currentPageSubject,
      this.sortFieldSubject,
      this.sortDirectionSubject
    ]).pipe(
      switchMap(([searchTerm, pageSize, currentPage, sortField, sortDirection]) => {
        console.log('Fetching data with', { searchTerm, pageSize, currentPage, sortField, sortDirection });
        return this.adminService.getUsersList({
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm
        });
      }),
      tap(response => {
        console.log('Refreshed service response:', response);
        this.totalUsers = response.pageInfo?.totalRecords || 0;
        this.totalPages = response.pageInfo?.totalPages || 1;
        this.currentPage = response.pageInfo?.currentPage || 1;
         // Check if no data is found, and handle accordingly
         if (this.totalUsers === 0) {
          console.log('No Users found.');
        }
      }),
      map(response => response.data)
    );

    // Trigger initial load
    this.refreshUsers();
  }

  refreshUsers() {
    // Trigger refresh by updating subjects
    this.searchTermSubject.next(this.searchControl.value);
    this.sortFieldSubject.next(this.sortField);
    this.sortDirectionSubject.next(this.sortDirection);
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }

 

  addUser() {
    this.router.navigate(['/admin/adminusers']);
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/admin/listusers']).then(() => {
      window.location.reload();
    });
  }

  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.refreshUsers();
        this.snackBar.open('User deleted successfully', 'Close', { duration: 100 });
      },
      error: () => {
        this.snackBar.open('Error deleting user', 'Close', { duration: 100 });
      }
    });
  }

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  editUser(userId: number) {
    this.router.navigate(['/admin/adminusers'], {
      queryParams: { id: userId }
    });
  }

  viewUser(userId: number) {
    this.router.navigate(['/admin/view-users'], {
      queryParams: { id: userId }
    });
  }

  addUserDocument(userId: number) {
    this.users$.subscribe(users => {
      const view = users.find(el => el.id === userId);
      if (view) {
        const encryptedData = this.encryptData(view);
        this.router.navigate(['/admin/user-document'], {
          queryParams: { data: encryptedData }
        });
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1; // pageIndex is 0-based
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' }) {
    this.sortField = field;
    this.sortDirection = direction;
    this.refreshUsers();
  }
}
