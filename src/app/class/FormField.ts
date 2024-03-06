import { Validators } from "@angular/forms";
import { SplitCamelCase, ToTitleCase } from "../shared/functions";

export class FormField {
    value: string | number;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    validators: Validators;
    options: {key: string, value: string}[];
  
    constructor(options: FieldOptions) {
      this.value = options.value || '';
      this.key = options.key || '';
      this.label = options.label || ToTitleCase(SplitCamelCase(options.key));
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
      if (options.validators === undefined) {
        this.validators = [];
      } else {
        this.validators = Array.isArray(options.validators) ? options.validators : [options.validators];
      }
    }
  }

  export interface FieldOptions {
    value?: string | number;
    key: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: {key: string, value: string}[];
    validators?: Validators | Validators[];
  }