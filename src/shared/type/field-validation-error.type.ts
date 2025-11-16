export type FieldValidationError = {
  field: string;
  value: unknown;
  errors: string[];
};
