import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnChanges, OnInit {
  @Input() title!: string;
  @Input() items!: string[];
  @Input() active_item!: string;
  @Input() activeRoute!: string;  // This will be set from the parent component

  constructor(private router: Router, private consultancyService:ConsultancyService) {}
  ngOnInit(): void {
    this.consultancyService.activeRoute.subscribe(res => this.activeRoute = res)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeRoute']) {
      console.log('Active route updated:', this.activeRoute);  // Shows the updated value
    }
  }

  navigate(): void {
    console.log('Navigating to:', this.activeRoute);
    if (this.activeRoute) {
      this.consultancyService.breadscrumState.next(true)
      this.router.navigate([this.activeRoute]);  // Perform navigation
    }
  }
}
