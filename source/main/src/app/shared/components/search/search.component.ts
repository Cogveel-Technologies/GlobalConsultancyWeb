import { Component, Input } from '@angular/core';
import { FormControl  } from '@angular/forms';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() searchText:FormControl;
}
