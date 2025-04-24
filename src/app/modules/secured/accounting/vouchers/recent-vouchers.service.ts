import { computed, Inject, signal } from "@angular/core";
import { Voucher } from "../../../../interface/voucher.interface";

@Inject({})
export class RecentVouchersService {
    #vouchers = signal<Voucher[]>([]);
    #max = 10;
    voucher = computed(this.#vouchers);

    insert(voucher: Voucher) {
        this.#vouchers.update(list => {
            if (list.length >= this.#max) {
                list.shift();
            }
            return [...list, voucher];
        });
    }
}