import { Entity } from "./entity.interface";
import { Product } from "./product.interface";

export interface StockInfo extends Entity {
  product: Product;
  product_id: number;
  quantity: number;
}
