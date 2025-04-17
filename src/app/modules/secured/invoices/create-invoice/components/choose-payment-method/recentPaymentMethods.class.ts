import { Ledger } from "../../../../../../interface/ledger.interface";

export class RecentPaymentMethods {
    private paymentMethods: Ledger[] = [];

    constructor() {
        if (localStorage.getItem('recentPaymentMethods')) {
            this.paymentMethods = JSON.parse(localStorage.getItem('recentPaymentMethods') || '[]');
        }
    }

    savePaymentMethod(paymentMethod: Ledger): void {
        if (this.hasPaymentMethod(paymentMethod)) {
            return;
        }

        if (this.paymentMethods.length >= 2) {
            this.paymentMethods.splice(1, 1, paymentMethod);
            localStorage.setItem('recentPaymentMethods', JSON.stringify(this.paymentMethods));
            return;
        }

        if (this.paymentMethods.length < 2){
            this.paymentMethods.push(paymentMethod);
            localStorage.setItem('recentPaymentMethods', JSON.stringify(this.paymentMethods));
            return;      
        }
    }

    getPaymentMethods(): Ledger[] {
        return this.paymentMethods;
    }

    
    private hasPaymentMethod(paymentMethod: Ledger): boolean {
        return this.paymentMethods.some((method) => method.id === paymentMethod.id);
    }

}