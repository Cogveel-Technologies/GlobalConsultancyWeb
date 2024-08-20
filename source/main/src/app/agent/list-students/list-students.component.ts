import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { AgentService } from '../agent.service';
import { Student } from '../models/student.model';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
// import { PaginationComponent } from '@shared/components/pagination/pagination.component';
@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListstudentsComponent implements OnInit {
  breadscrums = [
    {
      title: 'Students List',
      items: ['Agent'],
      active: 'Students List',
    },
  ];
  students$: Observable<Student[]>;
  totalStudents: number = 0;

  searchControl: FormControl = new FormControl('');
  sortField: string = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction
  pageSize: number = 10; // Default page size
  currentPage: number = 1; // Default current page
  totalPages: number = 1; // Total number of pages

  pageSizeOptions = [5, 10, 25, 100]; // Dropdown options for page size

  // BehaviorSubjects to manage the state
  private pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
  private currentPageSubject = new BehaviorSubject<number>(this.currentPage);
  private sortFieldSubject = new BehaviorSubject<string>(this.sortField);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>(this.sortDirection);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private agentService: AgentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Combine search, pagination, and sorting
    this.students$ = combineLatest([
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
        return this.agentService.getStudentsList({
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm
        });
      }),
      tap(response => {
        console.log('Refreshed service response:', response);
        this.totalStudents = response.pageInfo.totalRecords || 0;
        this.totalPages = response.pageInfo.totalPages || 1;
        this.currentPage = response.pageInfo.currentPage || 1;
      }),
      map(response => response.data)
    );

    // Trigger initial load
    this.refreshStudents();
  }

  refreshStudents() {
    // Trigger refresh by updating subjects
    this.searchTermSubject.next(this.searchControl.value);
    this.sortFieldSubject.next(this.sortField);
    this.sortDirectionSubject.next(this.sortDirection);
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }

  addStudent() {
    this.router.navigate(['/agent/register-student']);
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/agent/list-students']).then(() => {
      window.location.reload();
    });
  }

  deleteStudent(studentId: number) {
    this.agentService.deleteStudent(studentId).subscribe({
      next: () => {
        this.refreshStudents();
        this.snackBar.open('Student deleted successfully', 'Close', { duration: 100 });
      },
      error: () => {
        this.snackBar.open('Error deleting student', 'Close', { duration: 100 });
      }
    });
  }

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  editStudent(studentId: number) {
    this.router.navigate(['/agent/register-student'], {
      queryParams: { id: studentId }
    });
  }

  viewStudent(studentId: number) {
    this.router.navigate(['/agent/view-student'], {
      queryParams: { id: studentId }
    });
  }

  addStudentDocument(studentId: number) {
    
        this.router.navigate(['/agent/student-document'],
           {
          queryParams: { id: studentId }
          
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
    this.refreshStudents();
  }
}