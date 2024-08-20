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
  constructor(private consultancyService:ConsultancyService, private consultancyApiService:ConsultancyApi){}
  defaultData:ConsultancyDetailsOptions = this.consultancyService.defaultRenderData()
  pageSize:number;
  pageIndex:number;
  @Input() length:number;
  @Output() pageChange = new EventEmitter<PageEvent>()


  onPageChange($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.pageChange.emit($event)
  }
}
