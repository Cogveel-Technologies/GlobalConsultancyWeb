import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
@Component({
  selector: 'app-custom-sort',
  templateUrl: './custom-sort.component.html',
  styleUrls: ['./custom-sort.component.scss']
})
export class CustomSortComponent {
  @Input() sortField: string;
  @Input() sortDirection: 'asc' | 'desc';
  @Input() sortFields: string[] = [];

  @Output() sortChange = new EventEmitter<{ field: string, direction: 'asc' | 'desc' }>();

  sort(field: string) {
    const direction = this.sortField === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ field, direction });
  }
}


