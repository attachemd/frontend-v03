export interface Validation {
  name: string;
  pattern?: any;
  message: string;
}
export interface FieldConfig {
  tracked_id?: number;
  id?: number;
  label?: string;
  name: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  description?: string;
  validations: Validation[];
}
