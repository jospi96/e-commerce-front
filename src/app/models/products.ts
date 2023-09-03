import { Category } from "./category";

export interface product{
    id: Number;
    title: string;
    description: string;
    list_price:Number;
    discount_price:Number;
    quantity:Number;
    
    cartQty:Number;
    categories:Category[];
    meta_description:string;
    meta_title:string;
    brand:{
        id: number;
        url: string;
    };
    img_url:[{
        
        url:string,
        cover:string
    }];
}