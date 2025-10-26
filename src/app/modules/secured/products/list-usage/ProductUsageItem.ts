import { StoreLocation } from '../../../../interface/location.interface';
import { UserData } from '../../../../services/authentication/user.model';


export interface ProductUsageItem {
  id: number;
  product_id: number;
  from_location_id: number | null;
  to_location_id: number | null;
  narration: string;
  quantity: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  from_location: StoreLocation | null;
  to_location: StoreLocation | null;
  user: UserData;
}
