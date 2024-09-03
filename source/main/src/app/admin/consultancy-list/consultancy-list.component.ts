import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { AdminService } from '../admin.service';
// import { Consultancy } from './consultancy.model';  // Adjust the model import to Consultancy
import { Consultancy } from './consultancy.model';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';  // Ensure this is the correct import for your pagination options

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent implements OnInit {
  breadscrums = [
    {
      title: 'Consultancy List',
      items: ['Tables'],
      active: 'Consultancy List',
    },
  ];
  consultancies$: Observable<Consultancy[]>;
  totalConsultancies: number = 0;

  searchControl: FormControl = new FormControl('');
  sortField: string = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction
  pageSize: number = PAGE_SIZE_OPTIONS[0]; // Initialize with default value
  currentPage: number = 1; // Default current page
  totalPages: number = 1; // Total number of pages

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
    this.consultancies$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        throttleTime(100),
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
        return this.adminService.getConsultancyList({
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm
        });
      }),
      tap(response => {
        console.log('Refreshed service response:', response);
        this.totalConsultancies = response.pageInfo.totalRecords || 0;
        this.totalPages = response.pageInfo.totalPages || 1;
        this.currentPage = response.pageInfo.currentPage || 1;
      }),
      map(response => response.data)
    );

    // Trigger initial load
    this.refreshConsultancies();
  }

  refreshConsultancies() {
    // Trigger refresh by updating subjects
    this.searchTermSubject.next(this.searchControl.value);
    this.sortFieldSubject.next(this.sortField);
    this.sortDirectionSubject.next(this.sortDirection);
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }

  addConsultancy() {
    this.router.navigate(['/admin/consultancy']);
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/admin/consultancy-list']).then(() => {
      window.location.reload();
    });
  }

  deleteConsultancy(consultancyId: number) {
    this.adminService.deleteConsultancy(consultancyId).subscribe({
      next: () => {
        this.refreshConsultancies();
        this.snackBar.open('Consultancy deleted successfully', 'Close', { duration: 100 });
      },
      error: () => {
        this.snackBar.open('Error deleting consultancy', 'Close', { duration: 100 });
      }
    });
  }

  editConsultancy(consultancyId: number) {
    this.router.navigate(['/admin/consultancy'], {
      queryParams: { id: consultancyId }
    });
  }
  
  

  viewConsultancy(consultancyId: number) {
    this.router.navigate(['/admin/view-consultancy'], {
      queryParams: { id: consultancyId }
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
    this.refreshConsultancies();
  }
}
