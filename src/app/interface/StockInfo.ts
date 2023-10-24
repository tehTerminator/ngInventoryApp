import { Entity } from "./entity.interface";
import { Product } from "./product";

export interface StockInfo extends Entity {
  product: Product;
  product_id: number;
  quantity: number;
}
