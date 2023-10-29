export interface Animal {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  dateOfAdmission: Date;
  dateOfBirth: Date;
  type: string;
  breed: string;
  fed: boolean;
  played: boolean;
  fedBy?: string;
  playedBy?: string;
  medicatedBy?: string;
  medicated: boolean;
  requiresMedication: boolean
}
