{/* <section class="content">
  <div class="content-block">
    <div class="block-header" *ngFor="let breadscrum of breadscrums">
      <!-- breadcrumb -->
      <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items"
        [active_item]="breadscrum.active">
      </app-breadcrumb>
    </div>
    <div class="row clearfix">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
          <!-- <div class="header">
              <h2>
                <strong>Student Wizard</strong>
              </h2>
            </div> -->
          <div class="body">
            <mat-horizontal-stepper [linear]="isLinear" #stepper>
              <mat-step [stepControl]="HFormGroup1!">
                <form [formGroup]="HFormGroup1!">
                  <ng-template matStepLabel>Program Description</ng-template>
                  <div class="program-info-container">
                    <h2>Program Information</h2>

                    <div class="program-info">
                      <div class="info-field">
                        <label>Institution</label>
                        <p>{{selectedRecord?.instituteName}}</p>
                      </div>
                      <div class="info-field">
                        <label>Program</label>
                        <p>{{selectedRecord?.programName}}</p>
                      </div>

                      <div class="info-field">
                        <label>Province</label>
                        <p>{{selectedRecord?.province}}</p>
                      </div>
                      <div class="info-field">
                        <label>Applocation Fee</label>
                        <p>{{selectedRecord?.applicationFee}}</p>
                      </div>
                      <div class="info-field">
                        <label>Year Established</label>
                        <p>{{ selectedRecord?.yearEstablished | date: 'yyyy'
                          }}</p>
                      </div>
                      <div class="info-field full-width">
                        <label>About Institute</label>
                        <p>{{ selectedRecord?.aboutInstitute }}</p>
                      </div>
                    </div>

                    <div class="program-summary">
                      <div class="program-title">
                        <h3>Master in Business Administration - MBA</h3>
                        <span class="duration-badge">24 Months</span>
                      </div>
                      <div class="program-details">
                        <div>
                          <label>Average Processing Time</label>
                          <p>48 Hrs</p>
                        </div>
                        <div>
                          <label>Tuition Fee</label>
                          <p>USD 25860 per year</p>
                        </div>
                        <div>
                          <label>SEVIS Fee</label>
                          <p>USD 350 one-time</p>
                        </div>
                      </div>
                    </div>
                    <div class="button-container">
                      <button mat-raised-button matStepperNext
                        color="primary">Next</button>
                    </div>
                  </div>

                </form>
              </mat-step>

              <!-- documents -->
              <mat-step [stepControl]="documentForm!">
                <form [formGroup]="documentForm!"
                  (ngSubmit)="onDocumentFormSubmit()">
                  <ng-template matStepLabel>Documents</ng-template>
                  <div class="program-info-container">
                    <h2>Document Upload</h2>

                    <div class="program-info">
                      <!-- <form class="m-4" [formGroup]="documentForm" (ngSubmit)="onDocumentFormSubmit()"> -->
                      <div class="row">

                        <!-- Student Name Field -->
                        <div
                          class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
                          <mat-form-field class="example-full-width">
                            <mat-label>Student Name</mat-label>
                            <input matInput formControlName="studentName"
                              readonly>
                            <mat-icon
                              class="material-icons-two-tone color-icon p-3"
                              matSuffix>person</mat-icon>
                          </mat-form-field>
                        </div>

                        <!-- Student Phone Number Field -->
                        <div
                          class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
                          <mat-form-field class="example-full-width">
                            <mat-label>Student Phone Number</mat-label>
                            <input matInput formControlName="contactNo"
                              readonly>
                            <mat-icon
                              class="material-icons-two-tone color-icon p-3"
                              matSuffix>phone</mat-icon>
                          </mat-form-field>
                        </div>

                        <!-- Document Type Dropdown -->
                        <mat-form-field class="example-full-width">
                          <mat-label>Document Type</mat-label>
                          <mat-select formControlName="documentType" required>
                            <mat-option *ngFor="let type of documentTypes"
                              [value]="type.id">
                              {{ type.documentType }}
                            </mat-option>
                          </mat-select>
                          <mat-icon
                            class="material-icons-two-tone color-icon p-3"
                            matSuffix>description</mat-icon>
                        </mat-form-field>

                        <!-- File Upload Component -->
                        <div
                          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
                          <label>Upload</label>
                          <app-file-upload
                            formControlName="file"></app-file-upload>
                        </div>

                      </div>

                      <!-- Remarks Textarea -->

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                        <mat-form-field class="example-full-width">
                          <mat-label>Remarks</mat-label>
                          <textarea matInput formControlName="remarks"
                            required></textarea>
                          <mat-icon
                            class="material-icons-two-tone color-icon p-3"
                            matSuffix>note</mat-icon>
                        </mat-form-field>
                      </div>

                      <!-- Submit and Cancel Buttons -->

                      <div class="button-container">
                        <button class="btn-space"
                          [disabled]="!documentForm.valid" mat-raised-button
                          color="primary">
                          {{ isEditMode ? 'Update' : 'Submit' }}
                        </button>

                        <!-- <button type="button" mat-raised-button color="warn" (click)="onCancel()">Back</button> -->
                      </div>

                      <!-- </form> -->
                    </div>
                    <div class="button-container">
                      <button mat-raised-button matStepperPrevious color="warn"
                        class="msr-2">Back</button>
                      <button mat-raised-button matStepperNext
                        color="primary">Next</button>
                    </div>
                  </div>

                </form>
                <!-- Display uploaded documents -->
                <div class="row mt-4"
                  *ngIf="uploadedDocument$ | async as response">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                      <div class="header mb-3">
                        <h2>Uploaded Documents</h2>
                      </div>

                      <!-- Uploaded Document Table -->
                      <table class="table table-hover table-responsive">
                        <thead class="thead-light">
                          <tr>

                            <th>Document Type</th>
                            <th>Remarks</th>
                            <!-- <th>Uploaded By</th> -->
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            *ngFor="let document of response.data; let i = index">

                            <td data-label="Document Type">{{
                              getDocumentTypeName(document.documentTypeId)
                              }}</td>
                            <td data-label="Remarks">{{ document.remarks }}</td>
                            <!-- <td data-label="Uploaded By">{{ document.uploadedBy }}</td> -->
                            <td data-label="Actions">
                              <button mat-icon-button color="primary"
                                (click)="viewDocument(document.file)">
                                <mat-icon>visibility</mat-icon>
                              </button>
                              <button mat-icon-button color="warn"
                                (click)="deleteDocument(document.id)">
                                <!-- <mat-icon>delete</mat-icon> -->
                                <app-feather-icons [icon]="'trash-2'"
                                  [class]="'tbl-fav-delete'"></app-feather-icons>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </mat-step>
              <!-- personal info -->
              <mat-step [stepControl]="HFormGroup2!">
                <form [formGroup]="HFormGroup2!">
                  <ng-template matStepLabel>Personal Info</ng-template>

                  <div class="program-info-container">
                    <h2>Personal Information</h2>

                    <!-- Edit Button positioned at the top-right -->

                    <button mat-raised-button color="accent" class="edit-btn"
                      (click)="toggleEdit()">
                      {{ iseditingmode ? 'Update' : 'Edit' }}
                    </button>
                    <div class="program-info">
                      <div class="info-field">
                        <label>Student Name</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.studentName
                          }}</p>
                        <input *ngIf="iseditingmode" class="form-control"
                          formControlName="studentName" />
                      </div>

                      <div class="info-field">
                        <label>Date of Birth</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.dob | date:
                          'yyyy-MM-dd' }}</p>
                        <input *ngIf="iseditingmode" type="date"
                          class="form-control" formControlName="dob" />
                      </div>

                         
                      <div class="info-field">
                        <label>Citizenship</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.citizenship }}</p>
                        <mat-form-field *ngIf="iseditingmode" appearance="fill" class="full-width">
                          <mat-label>Citizenship</mat-label>
                          <mat-select formControlName="citizenship">
                            <mat-option *ngFor="let country of countries" [value]="country.countryName">
                              {{ country.countryName }}
                            </mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>   
                





                      <!-- <div class="info-field">
                        <label>Citizenship</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.citizenship
                          }}</p>
                        <div *ngIf="iseditingmode">
                          <select class="form-control"
                            formControlName="citizenship">
                            <option *ngFor="let country of countries"
                              [value]="country.countryName">
                              {{ country.countryName }}
                            </option>
                          </select>
                        </div>
                      </div> -->

                      <div class="info-field">
                        <label>Language</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.language
                          }}</p>
                        <input *ngIf="iseditingmode" class="form-control"
                          formControlName="language" />
                      </div>

                      <div class="info-field">
                        <label>Passport Expiry</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.passportExpiry
                          | date: 'yyyy-MM-dd' }}</p>
                        <input *ngIf="iseditingmode" type="date"
                          class="form-control"
                          formControlName="passportExpiry" />
                      </div>

                      <div class="info-field">
                        <label>Email Address</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.emailAddress
                          }}</p>
                        <input *ngIf="iseditingmode" type="email"
                          class="form-control" formControlName="emailAddress" />
                      </div>

                      <div class="info-field">
                        <label>Contact Number</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.contactNo
                          }}</p>
                        <input *ngIf="iseditingmode" class="form-control"
                          formControlName="contactNo" />
                      </div>

                      <div class="info-field">
                        <label>Residential Address</label>
                        <p *ngIf="!iseditingmode">{{
                          studentData?.residentialAddress }}</p>
                        <input *ngIf="iseditingmode" class="form-control"
                          formControlName="residentialAddress" />
                      </div>

                      <div class="info-field">
                        <label>Mailing Address</label>
                        <p *ngIf="!iseditingmode">{{ studentData?.mailingAddress
                          }}</p>
                        <input *ngIf="iseditingmode" class="form-control"
                          formControlName="mailingAddress" />
                      </div>
                    </div>

                    <div class="button-container">
                      <button mat-raised-button matStepperPrevious color="warn"
                        class="msr-2">Back</button>
                      <button mat-raised-button matStepperNext color="primary"
                        >
                        Next
                      </button>
                    </div>
                  </div>

                </form>
              </mat-step>

              <!-- Contact Info -->
              <mat-step [stepControl]="ContactForm!">
                <form [formGroup]="ContactForm!">
                  <ng-template matStepLabel>Contact Info</ng-template>

                  <div class="program-info-container">
                    <h2>Contact Info</h2>

                    <div class="program-info">
                      <div class="info-field">
                        <mat-form-field appearance="fill" class="full-width">
                          <mat-label>Email Address</mat-label>
                          <input matInput type="email"
                            formControlName="emailAddress"
                            placeholder="Enter student email" required />
                        </mat-form-field>
                      </div>

                      <div class="info-field">
                        <mat-form-field appearance="fill" class="full-width">
                          <mat-label>Contact Number</mat-label>
                          <input matInput type="tel" formControlName="contactNo"
                            placeholder="Enter contact number" required />
                        </mat-form-field>
                      </div>

                      <div class="info-field">
                        <mat-form-field appearance="fill" class="full-width">
                          <mat-label>Residential Address</mat-label>
                          <input matInput formControlName="residentialAddress"
                            placeholder="Enter residential address" required />
                        </mat-form-field>
                      </div>

                      <div class="info-field">
                        <mat-form-field appearance="fill" class="full-width">
                          <mat-label>Mailing Address</mat-label>
                          <input matInput formControlName="mailingAddress"
                            placeholder="Enter mailing address" required />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="button-container">
                      <button mat-raised-button matStepperPrevious color="warn"
                        class="msr-2">Back</button>
                      <button mat-raised-button matStepperNext color="primary"
                        [disabled]="!ContactForm.valid">Next</button>
                    </div>
                  </div>
                </form>
              </mat-step>

              <!-- education -->
              <mat-step>
                <ng-template matStepLabel> Education </ng-template>
                <div class="program-info-container">
                  <h2>
                    <strong>Add Education</strong>
                  </h2>

                  <div class="program-info">

                    <div class="body">
                      <div class="example-container">
                        <div class="row">
                          <!-- Country of Education -->
                          <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                            <mat-form-field class="example-full-width"
                              appearance="fill">
                              <mat-label>Country of Education</mat-label>
                              <input matInput>
                              <mat-icon matSuffix>public</mat-icon>
                            </mat-form-field>
                          </div>

                          <!-- Highest Level of Education -->
                          <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                            <mat-form-field class="example-full-width"
                              appearance="fill">
                              <mat-label>Highest Level of Education</mat-label>
                              <input matInput>
                              <mat-icon matSuffix>school</mat-icon>
                            </mat-form-field>
                          </div>

                          <!-- Grading Scheme -->
                          <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                            <mat-form-field class="example-full-width"
                              appearance="fill">
                              <mat-label>Grading Scheme</mat-label>
                              <input matInput>
                              <mat-icon matSuffix>assignment</mat-icon>
                            </mat-form-field>
                          </div>

                          <!-- Grade Average -->
                          <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                            <mat-form-field class="example-full-width"
                              appearance="fill">
                              <mat-label>Grade Average</mat-label>
                              <input matInput>
                              <mat-icon matSuffix>bar_chart</mat-icon>
                            </mat-form-field>
                          </div>
                        </div>

                        <p class="text-muted">*10th and 12* Grade details are
                          mandatory</p>

                        <div class="col-md-12">
                          <button mat-raised-button matStepperPrevious
                            color="warn" class="me-2">Back</button>
                          <button mat-raised-button matStepperNext
                            color="primary">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </mat-step>

              <mat-step>
                <ng-template matStepLabel>Done</ng-template>
                <p>You are now done.</p>
                <div>
                  <button mat-raised-button matStepperPrevious color="warn"
                    class="msr-2">Back</button>
                  <button mat-raised-button color="primary"
                    (click)="stepper.reset()">Reset</button>
                </div>
              </mat-step>

            </mat-horizontal-stepper>
          </div>
        </div>
      </div>
    </div>

  </div>
</section> */}
