export interface StudentDocument {
    id: number;
    documentTypeId: number;
    remarks: string;
    dateUploaded: Date | null;
    uploadedBy: string;
    file: string;
    createdBy: number;
    updatedBy: number;
    studentId: number;
  }
  