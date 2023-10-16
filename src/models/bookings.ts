export interface Booking {
  id: number;
  user_id: number;
  package_id: number;
  date: Date;
  type: 'flight' | 'hotel' | 'car_rental';
  total_number_of_persons: number;
  pickup_location: string;
  total_cost: number;
  status: 'pending' | 'confirmed' | 'canceled';
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_date: string;
  created_at: string;
  updated_at: string;
}
