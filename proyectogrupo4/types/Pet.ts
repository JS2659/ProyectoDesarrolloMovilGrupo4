export interface Pet {
  id: number;
  name: string;
  type: string;
  owner: string;
  vaccinationHistory: Vaccination[];
}

export interface Vaccination {
  date: string;
  vaccine: string;
}