import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-vouchers',
    templateUrl: './vouchers.component.html',
    styles: [],
    standalone: false
}) export class VouchersComponent {
    voucherId = '';
    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe({
            next: (value => {
                this.voucherId = value.get('id') || '';
                console.log('this.voucherId', this.voucherId);
            })
        })
    }
}