import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { CustomSortComponent } from "./custom-sort/custom-sort.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { SortingComponent } from "./sorting/sorting.component";
import { SearchComponent } from "./search/search.component";
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { ModelComponent } from './model/model.component';




@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    PaginationComponent,
    SortingComponent,
    CustomSortComponent,
    SearchComponent,
    NoDataFoundComponent,
    ModelComponent,
  ],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, CustomSortComponent, PaginationComponent, SortingComponent, SearchComponent, ModelComponent, NoDataFoundComponent],
})
export class ComponentsModule { }
