import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, SearchComponent, PaginationComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent,SearchComponent,PaginationComponent],
})
export class ComponentsModule {}
