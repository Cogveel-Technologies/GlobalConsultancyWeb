import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { AgentService } from '../agent.service';
import { ApplicationModel } from '../models/applicationModel';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit, OnDestroy {
  breadcrumbs = [
    {
      title: 'Applications List',
      items: ['Agent'],
      active: 'Applications',
    },
  ];

  applications$: Observable<ApplicationModel[]>; // Use ApplicationModel
  totalApplications = 0;
  showOnlyApplyButton = false;
  searchControl: FormControl = new FormControl('');
  sortField = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction
  currentPage = 1; // Default current page
  totalPages = 1; // Total number of pages
  pageSize: number = PAGE_SIZE_OPTIONS[0]; // Initialize with default value

  // BehaviorSubjects to manage the state
  private pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
  private currentPageSubject = new BehaviorSubject<number>(this.currentPage);
  private sortFieldSubject = new BehaviorSubject<string>(this.sortField);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>(this.sortDirection);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Combine search, pagination, and sorting
    this.applications$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''), // Ensure initial value is handled
        throttleTime(50), // Debounce user input
        distinctUntilChanged(), // Avoid duplicate API calls
        tap((term) => {
          console.log('Search term:', term); // Debug log
          this.currentPage = 1; // Reset current page to 1
          this.currentPageSubject.next(this.currentPage); // Emit the new current page
        })
      ),
      this.pageSizeSubject.asObservable(),
      this.currentPageSubject.asObservable(),
      this.sortFieldSubject.asObservable(),
      this.sortDirectionSubject.asObservable(),
    ]).pipe(
      switchMap(([searchTerm, pageSize, currentPage, sortField, sortDirection]) => {
        console.log('Fetching applications with:', {
          searchTerm,
          pageSize,
          currentPage,
          sortField,
          sortDirection,
        }); // Debug log
        return this.agentService.getApplications({
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm,
          isDeleted: false,
          isAdmin: false,
        });
      }),
      tap((response) => {
        this.totalApplications = response.pageInfo?.totalRecords || 0;
        this.totalPages = response.pageInfo?.totalPages || 1;
        this.currentPage = response.pageInfo?.currentPage || 1;
      }),
      map((response) => response.data as ApplicationModel[])
    );
  
    // Trigger initial refresh
    this.refreshApplications();
  }
  
  
  refreshApplications() {
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
    this.sortFieldSubject.next(this.sortField);
    this.sortDirectionSubject.next(this.sortDirection);
  
    // Trigger search term update explicitly
    this.searchTermSubject.next(this.searchControl.value || '');
  }
  
  deleteApplication(applicationId: number) {
    this.agentService.deleteApplication(applicationId).subscribe({
      next: () => {
        this.refreshApplications();
        this.snackBar.open('Application deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error deleting application', 'Close', { duration: 3000 });
      },
    });
  }

  editApplication(applicationId: number) {
    this.router.navigate(['/agent/edit-application'], {
      queryParams: { id: applicationId },
    });
  }

  viewApplication(applicationId: number) {
    this.router.navigate(['/agent/view-application'], {
      queryParams: { id: applicationId },
    });
  }

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1; // pageIndex is 0-based
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }

  onSortChange({ field, direction }: { field: string; direction: 'asc' | 'desc' }) {
    this.sortField = field;
    this.sortDirection = direction;
    this.refreshApplications();
  }
  
    // other properties and methods
    
    // Method for handling the "Add Application" button click
    addApplication(): void {
      // Implement logic to navigate to the add application page
      // or open a form for adding a new application
      this.router.navigate(['/agent/admission'])
      console.log('Add Application button clicked');
    }
    
  ngOnDestroy() {
    this.pageSizeSubject.complete();
    this.currentPageSubject.complete();
    this.sortFieldSubject.complete();
    this.sortDirectionSubject.complete();
    this.searchTermSubject.complete();
  }
}