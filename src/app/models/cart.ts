import { DiscountCode } from "./DiscountCode";
import { product } from "./products";

export interface Cart{
    products:product[],
    shipping:string,
    total:Number,
    discount:DiscountCode[]
    id:number,
    id_user:Number

}