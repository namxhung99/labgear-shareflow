
export interface Equipment {
  id: number;
  name: string;
  category: string;
  image: string;
  imageUrl?: string;
  location?: string;
  status: 'available' | 'in-use' | 'maintenance';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}
