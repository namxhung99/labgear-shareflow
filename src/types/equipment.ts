
export interface Equipment {
  id: number;
  name: string;
  category: string;
  image: string;
  status: 'available' | 'in-use' | 'maintenance';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}
