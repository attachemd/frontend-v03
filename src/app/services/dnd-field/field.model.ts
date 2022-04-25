export interface Validation {
  name: string;
  pattern?: any;
  message: string;
}
export interface FieldConfig {
  tracked_id?: number;
  id?: number;
  name: string;
  type: string;
  validations: Validation[];
  label?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  value?: any;
  description?: string;
}

export interface ActionAndField {
  action: string;
  fieldElement: any;
}
