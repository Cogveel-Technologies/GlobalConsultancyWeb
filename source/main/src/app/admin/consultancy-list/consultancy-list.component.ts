import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ConsultancyDetailsOptions } from 'app/consultancy/consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent implements OnInit, OnDestroy {
  breadscrums = [
    {
      title: 'Consultancy List',
      items: ['Admin'],
      active: 'Consultancy List',
    },
  ];
  consultancies$: Observable<Consultancy[]>;
  totalConsultancies: number = 0;
  // users:Observable<[{firstName:string,id:number}]>;
  users: any
  roleName = localStorage.getItem("roleName")
  userList = new FormControl(0);
  searchControl: FormControl = new FormControl('');
  sortField: string = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction
  pageSize: number = PAGE_SIZE_OPTIONS[0]; // Initialize with default value
  currentPage: number = 1; // Default current page
  totalPages: number = 1; // Total number of pages
  defaultData: ConsultancyDetailsOptions = this.consultancyService.defaultRenderData()
  pageNumber: number;
  previousPage: number

  // BehaviorSubjects to manage the state
  private pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
  private currentPageSubject = new BehaviorSubject<number>(this.currentPage);
  private sortFieldSubject = new BehaviorSubject<string>(this.sortField);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>(this.sortDirection);
  private searchTermSubject = new BehaviorSubject<string>('');
  private userSubject: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  private searchSubject: BehaviorSubject<boolean | string> = new BehaviorSubject<boolean | string>('');

  constructor(
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private consultancyService: ConsultancyService
  ) {
    this.pageSize = PAGE_SIZE_OPTIONS[0]; // Initialize here
    this.pageSizeSubject = new BehaviorSubject<number>(this.pageSize); // Then use it here
  }

  ngOnInit() {

    // delete
    this.consultancyService.sendDeleteIdtoPC.subscribe(res => {
      if (res) {
        this.adminService.deleteConsultancy(res).subscribe(res => {
          if (res) {
            this.adminService.consultancyPaginationState.subscribe(res => {
              this.currentPage = res;
              this.currentPageSubject.next(this.currentPage)
              this.consultancyService.sendDeleteIdtoPC.next(null)
            })
          }
        })
      }
    })

    this.adminService.consultancyPageState.subscribe(res => {
      if (res) {
        this.adminService.consultancyPaginationState.subscribe(res => {
          this.currentPage = res
          this.currentPageSubject.next(this.currentPage)
        })
      }
    })

    this.adminService.consultancyInstituteState.subscribe(res => {
      console.log(res)
      if (res) {
        this.adminService.consultancyPaginationState.subscribe(res => {
          console.log(res)
          this.currentPage = res
          this.currentPageSubject.next(res)
        })
      }
    })

    this.adminService.consultancyProgramState.subscribe(res => {
      console.log(res)
      if (res) {
        this.adminService.consultancyPaginationState.subscribe(res => {
          this.currentPage = res
          this.currentPageSubject.next(this.currentPage)
        })
      }
    })

    // if super admin logs in
    if (this.roleName === 'superadmin') {
      console.log(this.roleName)
      this.adminService.getAllUsers().subscribe(res => this.users = res)
    }

    // Combine search, pagination, and sorting
    this.consultancies$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        throttleTime(60),
        distinctUntilChanged(),
        tap(term => this.searchTermSubject.next(term))  // Capture the search term
      ),
      this.pageSizeSubject,
      this.currentPageSubject,
      this.sortFieldSubject,
      this.sortDirectionSubject,
      this.userSubject,
      this.searchSubject
    ]).pipe(
      switchMap(([searchTerm, pageSize, currentPage, sortField, sortDirection, userId, search]) => {
        console.log(currentPage)
        this.pageNumber = currentPage
        console.log(this.pageNumber)
        console.log('Fetching data with', { searchTerm, pageSize, currentPage, sortField, sortDirection, userId });
        return this.adminService.getConsultancyList({
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm,
          userId: +userId,
          isAdmin: this.roleName === 'superadmin' ? true : false
        });
      }),
      tap(response => {
        console.log(response)
        console.log('Refreshed service response:', response);
        this.totalConsultancies = response.pageInfo?.totalRecords || 0;
        this.totalPages = response.pageInfo?.totalPages || 1;
        this.currentPage = response.pageInfo?.currentPage + 1 || 1;

        // Check if no data is found, and handle accordingly
        if (this.totalConsultancies === 0) {
          console.log('No consultancies found.');
        }
      }),
      map(response => response.data || [])  // Ensure an empty array is returned if no data
    );

    // Trigger initial load
    this.refreshConsultancies();
  }



  refreshConsultancies() {
    // Trigger refresh by updating subjects
    this.searchTermSubject.next(this.searchControl.value || '');  // Ensure empty string is passed
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
    this.adminService.consultancyPaginationState.next(this.pageNumber)
    this.router.navigate(['/admin/consultancy'], {
      queryParams: { id: consultancyId }
    });
  }


  viewConsultancy(consultancyId: number) {
    this.adminService.consultancyPaginationState.next(this.pageNumber)
    this.router.navigate(['/admin/view-consultancy'], {
      queryParams: { id: consultancyId }
    });
  }

  consultancyPrograms(id: number, consultancyName: string) {
    this.adminService.consultancyPaginationState.next(this.pageNumber)
    this.adminService.consultancyProgramPaginationState.next(true)
    this.adminService.consultancyProgram.next({ id, consultancyName })
    this.router.navigate(['/consultancy/program-list'])
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1; // pageIndex is 0-based
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }

  getInstitutes(countryName: string, consultancyName: string, consultancyId: number) {
    this.adminService.consultancyPaginationState.next(this.pageNumber)
    this.adminService.consultancyInstitutePaginationState.next(true)
    this.consultancyService.consultancyInstitutes.next({ countryName, consultancyName, consultancyId })
    this.router.navigate([`/consultancy/institution-list`])
  }

  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' }) {
    this.sortField = field;
    this.sortDirection = direction;
    this.refreshConsultancies();
  }

  onUserChange(event: any) {
    this.userSubject.next(event)
  }

  selectAdmin(event: any) {
    this.userSubject.next(event.value)
  }

  ngOnDestroy() {
    this.adminService.consultancyInstituteState.next(false)
    this.adminService.consultancyProgramState.next(false)
    this.adminService.consultancyPageState.next(false)
    
  }
}
