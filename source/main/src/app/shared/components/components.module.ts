import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { CustomSortComponent } from "./custom-sort/custom-sort.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { SortingComponent } from "./sorting/sorting.component";


@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent,
     PaginationComponent, SortingComponent,
    CustomSortComponent
    ],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent,CustomSortComponent, PaginationComponent, SortingComponent],
})
export class ComponentsModule {}
