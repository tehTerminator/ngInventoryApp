import { Injectable } from "@angular/core";



@Injectable({})
export class FormState {
    private _state = {
        'id': 0,
        'title': '',
        'kind': ''
    }

    constructor() {}
}