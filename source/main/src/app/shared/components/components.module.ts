import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { CustomSortComponent } from "./custom-sort/custom-sort.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { SortingComponent } from "./sorting/sorting.component";
import { SearchComponent } from "./search/search.component";


@NgModule({
  declarations: [
    FileUploadComponent,
     BreadcrumbComponent,
     PaginationComponent, 
     SortingComponent,
     CustomSortComponent,
     SearchComponent
    ],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent,CustomSortComponent, PaginationComponent, SortingComponent, SearchComponent],
})
export class ComponentsModule {}
