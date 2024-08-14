import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl,  } from '@angular/forms';
import { ConsultancyDetailsOptions } from 'app/consultancy/consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private consultancyService:ConsultancyService){}
  defaultData:ConsultancyDetailsOptions = this.consultancyService.defaultRenderData();
  searchText:FormControl = new FormControl(this.defaultData.searchText);
  @Output() sendSearchText:EventEmitter<string>= new EventEmitter<string>()

  ngOnInit(){
    this.searchText.valueChanges.subscribe(res=> {
      console.log(res)
      this.sendSearchText.emit(res)
    })
  }
}
