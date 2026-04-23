export interface CreateObservationDTO {
  fieldId: string;
  note: string;
  // authorId will be taken from the JWT token, not the body
}