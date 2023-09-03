export interface DiscountCode {
  
    id: number;
  code: string;
  description: string;
  date_end?: Date;
  date_start?: Date;
  discont_percentual: Number;
  permitted_uses?: Number;
  uses_made?: Number;
  status: {
    message: string;
    status:boolean;
  
}
}
