import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 100]; // Define and export the array

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  
  @Input() length: number;
  @Input() pageSize: number = 5; // Default to the first value in pageSizeOptions
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Input() pageIndex: number;

  pageSizeOptions = PAGE_SIZE_OPTIONS; // Use the exported array

  onPageChange(event: PageEvent) {
    console.log(event)
    this.pageChange.emit(event);
  }
}
