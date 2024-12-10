export interface ApplicationModel {
  applicationId: number;  // Added field
  id: number;
  studentId: number;
  programId: number;
  sessionId: number;
  createdBy: number;
  updatedBy: number;
  createdDate: string;  // Added field
  studentName: string;  // Added field
  intake: string;       // Added field
  instituteName: string; // Added field
  programName: string;  // Added field
  loggedBy: number;     // Added field
}
