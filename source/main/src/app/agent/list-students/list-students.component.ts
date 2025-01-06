import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { AgentService } from '../agent.service';
import { Student } from '../models/student.model';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

// import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';
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
      active: 'Students',
    },
  ];
  students$: Observable<Student[]>;
  totalStudents = 0;

  searchControl: FormControl = new FormControl('');
  sortField = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction
  currentPage = 1; // Default current page
  totalPages = 1; // Total number of pages
  pageSize: number = PAGE_SIZE_OPTIONS[0]; // Initialize with default value
  pageNumber:number
  searchText:string
   
  // BehaviorSubjects to manage the state
  private pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
  private currentPageSubject = new BehaviorSubject<number>(this.currentPage);
  private sortFieldSubject = new BehaviorSubject<string>(this.sortField);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>(this.sortDirection);
  private searchTermSubject = new BehaviorSubject<string>('');

  // setting flag for hiding buttons
  showOnlyApplyButton = false;

  constructor(
    private router: Router,
    private agentService: AgentService,
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar,
    private  consultancyService: ConsultancyService
  ) {
    this.pageSize = PAGE_SIZE_OPTIONS[0]; // Initialize here
    this.pageSizeSubject = new BehaviorSubject<number>(this.pageSize); // Then use it here
   
  }

  ngOnInit() {
     //delete
     this.consultancyService.sendDeleteIdtoPC.subscribe(res => {
      if (res) {
        this.agentService.deleteStudent(res).subscribe({
      next: () => {
        // this.deleteOperation = true
        this.refreshStudents();
        // this.snackBar.open('Role deleted successfully', 'Close', { duration: 3000 });
        this.consultancyService.sendDeleteIdtoPC.next(null);
      },
      error: () => {
        this.snackBar.open('Error deleting role', 'Close', { duration: 3000 });
      }
    });
      }
    })

// breadcrum
    this.route.queryParams.subscribe(params => {
      const origin = params['origin']; // Fetch the origin parameter

      if (origin === 'admission') {

        this.breadscrums = [
          {
            title: 'Students List',
            items: ['Search'],
            active: 'Students',
          },
        ];
      }
      else if (origin === 'application') {
      
        this.breadscrums = [
          {
            title: 'Students List',
            items: ['Applications'],
            active: 'Students',
          },
        ];
        this.agentService.setShowOnlyApplyButton(true);
      }
     
  });

 
    this.showOnlyApplyButton = this.agentService.getShowOnlyApplyButton();

    this.agentService.pagination.subscribe(res =>{
      if(res){
        this.agentService.studentPaginationState.subscribe(res =>{
          console.log("currentPage", res)
          this.currentPage = res;
          console.log(this.currentPage)
          this.currentPageSubject.next(this.currentPage)
        })
      }
    })
    // Combine search, pagination, and sorting
    this.students$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        throttleTime(60),
        distinctUntilChanged(),  
      ),
      this.pageSizeSubject,
      this.currentPageSubject,
      this.sortFieldSubject,
      this.sortDirectionSubject
    ]).pipe(
      switchMap(([searchTerm, pageSize, currentPage, sortField, sortDirection]) => {
        this.pageNumber = currentPage
        this.searchText = searchTerm
        console.log('Fetching data with', { searchTerm, pageSize, currentPage, sortField, sortDirection });
        return this.agentService.getStudentsList({
          isAdmin: false,
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm,
          isDeleted: false
        });
      }),
      tap(response => {
        console.log('Refreshed service response:', response);
        
        if(this.searchText){
          this.currentPage = 1;
          this.currentPageSubject.next(this.currentPage);
          this.searchText = ''
        }
        if(this.currentPage > 0 && (!response.data.length)){
          // this.currentPage = this.currentPage;
          console.log("currentPage", this.currentPage)
          this.currentPageSubject.next(this.currentPage)
        }
        this.totalStudents = response.pageInfo?.totalRecords || 0;
        this.totalPages = response.pageInfo?.totalPages || 1;
        this.currentPage = response.pageInfo?.currentPage || 1;

          // Check if no data is found, and handle accordingly
          if (this.totalStudents === 0) {
            console.log('No students  found.');
          }
      }),
      map(response => response.data || [] )

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
   
    this.consultancyService.deletePopUpState.subscribe(res => {
      console.log(res)
      if (res) {
        console.log(res)
        this.consultancyService.deleteId.next(studentId);
        this.consultancyService.deleteMessage.next("Are you sure you want to delete this Student?")
      }
    })
  }
  

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  
    // Navigate to the registration form
    editStudent(studentId: number) {
      // this.router.navigate(['/agent/register-student'], {
      //   queryParams: { id: studentId, origin: 'listStudents' } // Pass the origin as 'listStudents'
      // });
      console.log(this.pageNumber)
      this.agentService.studentPaginationState.next(this.pageNumber)
      this.router.navigate(['/agent/registerwizard'], {
        queryParams: { id: studentId, origin: 'listStudents' } // Pass the origin as 'listStudents'
      });

    }
    

  viewStudent(studentId: number) {
    this.agentService.studentPaginationState.next(this.pageNumber)
    this.router.navigate(['/agent/view-student'], {
      queryParams: { id: studentId }
    });
  }
  

  addStudentDocument(studentId: number) {
    this.agentService.studentPaginationState.next(this.pageNumber)
     this.router.navigate(['/agent/student-document'],
           {
          queryParams: { id: studentId, origin: 'listStudents' }
          
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

  applyStudent(id: any): void {
    this.agentService.setSelectedId(id);
    
    this.router.navigate(['/agent/applications']);
  }
  
  // applyStudentSearch(){
  //   this.router.navigate(['/agent/admission']);
  // }
  ngOnDestroy() {
    // Reset the flag when navigating away from this component
    this.agentService.setShowOnlyApplyButton(false);
    this.agentService.pagination.next(false)
   
}
}