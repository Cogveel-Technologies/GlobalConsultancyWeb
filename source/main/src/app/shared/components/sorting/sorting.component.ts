
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

