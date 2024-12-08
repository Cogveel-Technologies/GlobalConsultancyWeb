import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 100]; // Define and export the array

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() length: number;
  @Input() pageSize: number = 5; // Default to the first value in pageSizeOptions
  @Input() pageIndex: number;
  @Output() pageChange = new EventEmitter<PageEvent>();

  pageSizeOptions = PAGE_SIZE_OPTIONS; // Use the exported array

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageIndex']) {
      console.log(changes['pageIndex'])
      console.log('Page index changed in PaginationComponent:', changes['pageIndex'].currentValue);
    }
    if (changes['length']) {
      console.log('Total length changed in PaginationComponent:', changes['length'].currentValue);
    }
  }

  onPageChange(event: PageEvent): void {
    console.log('Page change event triggered:', event);
    this.pageChange.emit(event);
  }
}
