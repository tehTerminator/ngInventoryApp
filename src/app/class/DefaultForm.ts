import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormField } from "./FormField";

export class DefaultForm extends FormGroup {
    constructor() {
        super({
            id: new FormControl(0, [Validators.min(0)])
        })
    }

    addControls(fields: FormField | FormField) {
        const data = Array.isArray(fields) ? fields : [fields]
        data.forEach(control => {
            this.addControl(control.key, new FormControl<typeof control.type>(control.key, control.validators));
            this.createGetterForControl(control.key);
            return;
        });
    }

    get idFormControl(): FormControl<number> {
        return this.get('id') as FormControl<number>
    }

    get id(): number {
        return this.idFormControl.value;
    }

    get editMode(): boolean {
        return this.id > 0;
    }

    private createGetterForControl<T>(controlName: string): void {
        Object.defineProperty(this, controlName + 'FormControl', {
            get: function(this: DefaultForm): AbstractControl<T> {
                return this.get(controlName) as AbstractControl<T>;
            },
            enumerable: true,
            configurable: true,
        });
    }

}