{/* <section class="content">
    <div class="content-block">
        <div class="block-header" *ngFor="let breadscrum of breadscrums">
            <!-- breadcrumb -->
            <app-breadcrumb 
                [title]="breadscrum.title" 
                [items]="breadscrum.items" 
                [active_item]="breadscrum.active">
            </app-breadcrumb>
        </div>

        <div class="row clearfix">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="body">
                        <form class="m-4" [formGroup]="searchForm" (ngSubmit)="onSubmit()">
                            <div class="row">
                                <!-- Country Autocomplete -->
                                <div class="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <mat-form-field class="example-full-width">
                                        <mat-icon matPrefix>public</mat-icon>
                                        <input 
                                            matInput 
                                            placeholder="Country" 
                                            aria-label="Country"
                                            [matAutocomplete]="countryAuto" 
                                            [formControl]="countryCtrl" 
                                            required
                                            style="font-weight: bold; color: black;" />
                                        <mat-autocomplete #countryAuto="matAutocomplete">
                                            <mat-option 
                                                *ngFor="let country of filteredCountryOptions | async"
                                                [value]="country.countryName">
                                                <span>{{ country.countryName }}</span>
                                            </mat-option>
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </div>
                                <!-- Institutes Autocomplete -->
                                <div class="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <mat-form-field class="example-full-width">
                                        <mat-icon matPrefix>school</mat-icon>
                                        <input 
                                            matInput 
                                            placeholder="Institutes" 
                                            aria-label="Institutes"
                                            [matAutocomplete]="instituteAuto" 
                                            [formControl]="instituteCtrl" 
                                            required
                                            style="font-weight: bold; color: black;" />
                                        <mat-autocomplete #instituteAuto="matAutocomplete">
                                            <mat-option 
                                                *ngFor="let institute of filteredInstituteOptions | async"
                                                [value]="institute.name">
                                                {{ institute.name }}
                                            </mat-option>
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </div>
                                <!-- Program ID Autocomplete -->
                                <div class="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <mat-form-field class="example-full-width">
                                        <mat-icon matPrefix>menu_book</mat-icon>
                                        <input 
                                            matInput 
                                            placeholder="Program" 
                                            aria-label="Program"
                                            [matAutocomplete]="programAuto" 
                                            [formControl]="programCtrl" 
                                            required
                                            style="font-weight: bold; color: black;" />
                                        <mat-autocomplete #programAuto="matAutocomplete">
                                            <mat-option 
                                                *ngFor="let program of filteredProgramOptions | async"
                                                [value]="program.name">
                                                {{ program.name }}
                                            </mat-option>
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </div>
                                <!-- Session ID Autocomplete -->
                                <div class="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <mat-form-field class="example-full-width">
                                        <mat-icon matPrefix>schedule</mat-icon>
                                        <input 
                                            matInput 
                                            placeholder="Session" 
                                            aria-label="Session"
                                            [matAutocomplete]="sessionAuto" 
                                            [formControl]="sessionCtrl" 
                                            required
                                            style="font-weight: bold; color: black;" />
                                        <mat-autocomplete #sessionAuto="matAutocomplete">
                                            <mat-option 
                                                *ngFor="let session of filteredSessionOptions | async"
                                                [value]="session.sessionName">
                                                {{ session.sessionName }}
                                            </mat-option>
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </div>
                                <!-- Program Category Autocomplete -->
                                <div class="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <mat-form-field class="example-full-width">
                                        <mat-icon matPrefix>category</mat-icon>
                                        <input 
                                            matInput 
                                            placeholder="Program Category" 
                                            aria-label="Program Category"
                                            [matAutocomplete]="programCategoryAuto" 
                                            [formControl]="programCategoryCtrl"
                                            required 
                                            style="font-weight: bold; color: black;" />
                                        <mat-autocomplete #programCategoryAuto="matAutocomplete">
                                            <mat-option 
                                                *ngFor="let category of filteredProgramCategoryOptions | async"
                                                [value]="category.name">
                                                {{ category.name }}
                                            </mat-option>
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </div>
                                <!-- Course Type Autocomplete -->
                                <div class="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <mat-form-field class="example-full-width">
                                        <mat-icon matPrefix>book</mat-icon>
                                        <input 
                                            matInput 
                                            placeholder="Course Type" 
                                            aria-label="Course Type"
                                            [matAutocomplete]="courseTypeAuto" 
                                            [formControl]="courseTypeCtrl"
                                            required 
                                            style="font-weight: bold; color: black;" />
                                        <mat-autocomplete #courseTypeAuto="matAutocomplete">
                                            <mat-option 
                                                *ngFor="let type of filteredCourseTypeOptions | async"
                                                [value]="type.name">
                                                {{ type.name }}
                                            </mat-option>
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                                    <button class="btn-space" type="button" mat-raised-button color="warn" (click)="onCancel()">Cancel</button>

                                    <button 
                                         
                                        mat-raised-button 
                                        color="primary" 
                                        type="submit">
                                        Search
                                    </button>
                                   
                                </div>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
     <!-- Box-like structure to show results -->

     <div class="result-container">
        <div class="result-card" *ngFor="let element of data">
            <mat-card class="mat-elevation-z8 full-width-card">
                <mat-card-header class="header">
                    <mat-icon class="icon">school</mat-icon>
                    <div>
                        <mat-card-title class="title">{{ element.instituteName }}</mat-card-title>
                        <mat-card-subtitle class="subtitle">{{ element.programName }}</mat-card-subtitle>
                    

                    </div>
                    <button mat-button color="primary" (click)="onApply(element)">Apply</button>

                </mat-card-header>
                <mat-card-content class="content">
                    <div class="fees-container">
                        <p><strong>Program Description:</strong> {{ element.programDescription }}</p>
                    </div>
                    <div class="fees-container">
                        <p><strong>Level of Education:</strong> {{ element.levelOfEducation }}</p>
                        <p><strong>Province:</strong> {{ element.province }}</p>
                        <p><strong>Year Established:</strong> {{ element.yearEstablished | date:'yyyy' }}</p>
                    </div>
                    <div class="fees-container">
                        <p><strong>Duration:</strong> {{ element.duration }}</p>
                        <p><strong>Application Fee:</strong> ${{ element.applicationFee }}</p>
                        <p><strong>Tuition Fee:</strong> ${{ element.tutionFee }}</p>
                        <!-- <p><strong>Intakes:</strong> {{ element.noOfIntake }}</p> -->
                    </div>
                </mat-card-content>
                <mat-card-footer class="footer">
                    <small><strong>About Institute:</strong> {{ element.aboutInstitute }}</small>
                   
                </mat-card-footer>
            </mat-card>
            
        </div>     

      <div *ngIf="data.length === 0" class="text-center mt-4">
  <p>No results found.</p>
</div>

<!-- Display paginator only when there are items in the data array -->
<mat-paginator *ngIf="data.length > 0"
               [length]="totalItems"
               [pageSize]="itemsPerPage"
               [pageSizeOptions]="[5, 10, 25, 100]"
               (page)="onPageChange($event)"
               aria-label="Select page">
</mat-paginator>

    
    



    </div>
     
    </div>
</section> */}
