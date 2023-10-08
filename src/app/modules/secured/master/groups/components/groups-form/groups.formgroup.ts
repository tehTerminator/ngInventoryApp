import { FormControl, FormGroup, Validators } from "@angular/forms";

export class GroupsForm extends FormGroup {
    constructor() {
        super({
            id: new FormControl({value: null, disabled: true}, {validators: [Validators.min(1)]}),
            title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)]}),
            kind: new FormControl(null, {validators: [Validators.required]})
        })
    }

    get idField(): FormControl {
        return this.get('id') as FormControl;
    }

    get titleField(): FormControl {
        return this.get('title') as FormControl;
    }
    
    get kindField(): FormControl {
        return this.get('kind') as FormControl;
    }

    get id(): number {
        return parseInt(this.idField.value);
    }

    get title(): string {
        return this.titleField.value;
    }

    get kind(): string {
        return this.kindField.value;
    }
}