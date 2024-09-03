import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, map, throttleTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Role } from './role.model';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {
  breadscrums = [
    {
      title: 'Roles List',
      items: ['Tables'],
      active: 'Admin Roles',
    },
  ];
  roles$: Observable<Role[]>;
  totalRoles: number = 0;

  searchControl: FormControl = new FormControl('');
  sortField: string = 'id'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction
  pageSize: number = PAGE_SIZE_OPTIONS[0]; // Initialize with default value
  currentPage: number = 1; // Default current page
  totalPages: number = 1; // Total number of pages

  // Inline editing variables
  editingRoleId: number | null = null;
  editingRoleName: string = '';

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
    this.pageSize = PAGE_SIZE_OPTIONS[0];
    this.pageSizeSubject = new BehaviorSubject<number>(this.pageSize);
  }

  ngOnInit() {
    // Combine search, pagination, and sorting
    this.roles$ = combineLatest([
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
        return this.adminService.getRolesList({
          limit: pageSize,
          orderBy: sortField,
          sortExpression: sortDirection,
          currentPage: currentPage,
          searchTerm: searchTerm
        });
      }),
      tap(response => {
        console.log('Refreshed service response:', response);
        this.totalRoles = response.pageInfo.totalRecords || 0;
        this.totalPages = response.pageInfo.totalPages || 1;
        this.currentPage = response.pageInfo.currentPage || 1;
      }),
      map(response => response.data)
    );

    // Trigger initial load
    this.refreshRoles();
  }

  refreshRoles() {
    // Trigger refresh by updating subjects
    this.searchTermSubject.next(this.searchControl.value);
    this.sortFieldSubject.next(this.sortField);
    this.sortDirectionSubject.next(this.sortDirection);
    this.pageSizeSubject.next(this.pageSize);
    this.currentPageSubject.next(this.currentPage);
  }

  addRole() {
    this.router.navigate(['/admin/listroles']);
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/admin/listroles']).then(() => {
      window.location.reload();
    });
  }

  deleteRole(roleId: number) {
    this.adminService.deleteRole(roleId).subscribe({
      next: () => {
        this.refreshRoles();
        // this.snackBar.open('Role deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error deleting role', 'Close', { duration: 3000 });
      }
    });
  }

  // Inline editing methods
  editRole(roleId: number, roleName: string) {
    this.editingRoleId = roleId;
    this.editingRoleName = roleName;
  }

  cancelEdit() {
    this.editingRoleId = null;
    this.editingRoleName = '';
  }

  updateRole(roleId: number) {
    if (this.editingRoleId !== null) {
      // Create the updated data object
      const updatedRoleName = this.editingRoleName;

      // Call the service to update the role with the given ID and updated name
      this.adminService.updateRole(roleId, updatedRoleName).subscribe({
        next: () => {
          // this.snackBar.open('Role updated successfully', 'Close', { duration: 3000 });
          this.refreshRoles(); // Refresh the list after update
          this.cancelEdit(); // Exit edit mode
        },
        error: () => {
          this.snackBar.open('Error updating role', 'Close', { duration: 3000 });
        }
      });
    }


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
    this.refreshRoles();
  }
}
