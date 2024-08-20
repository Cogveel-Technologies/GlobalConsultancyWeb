import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConsultancyDetailsOptions } from 'app/consultancy/consultancy-models/data.consultancy-get-options';
import { ConsultancyApi } from 'app/consultancy/consultancy-services/api.service';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}