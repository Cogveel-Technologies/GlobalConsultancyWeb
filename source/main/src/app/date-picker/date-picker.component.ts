import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  readonly date = new FormControl(null);
  @Input() fromDateValue: string | null = null;
  @Output() sendFromDate = new EventEmitter<Moment>
  @Output() sendToDate = new EventEmitter<Moment>

  dateControl = new FormControl();

  ngOnInit(){

    console.log(this.fromDateValue)
    if (this.fromDateValue) {
      const dateParts = this.fromDateValue.split('/');
      const year = parseInt(dateParts[1], 10);
      const month = parseInt(dateParts[0], 10) - 1; // Month is 0-indexed in JavaScript
      const date = new Date(year, month); // Create a new Date object
      this.dateControl.setValue(date);
      // this.dateControl.setValue(this.fromDateValue);
      console.log('Initial fromDateValue:', this.fromDateValue);
    }

    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fromDateValue'] && changes['fromDateValue'].currentValue) {
      const dateString = changes['fromDateValue'].currentValue;
      console.log('Received date:', dateString);
  
      // Parse the date string to a Date object (adjust the format as per your input)
      const parsedDate = moment(dateString, 'MM/YYYY').toDate(); // Adjust the format if needed
  
      // Check if the parsed date is valid and update the date control
      if (moment(parsedDate).isValid()) {
        this.dateControl.setValue(parsedDate);
      } else {
        console.warn('Invalid date:', dateString);
      }
    }
  }
  

  
  // Disable past dates in the date picker
  dateFilter = (date: Moment | null): boolean => {
    return date ? moment(date).isSameOrAfter(moment().startOf('day')) : true;
  };

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.sendFromDate.next(normalizedMonthAndYear)
    this.sendToDate.next(normalizedMonthAndYear)
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
