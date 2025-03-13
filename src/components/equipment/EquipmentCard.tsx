
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'available' | 'in-use' | 'maintenance';
  imageUrl: string;
  description: string;
  location: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-use':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'maintenance':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle size={14} className="mr-1" />;
      case 'in-use':
        return <Clock size={14} className="mr-1" />;
      case 'maintenance':
        return <AlertTriangle size={14} className="mr-1" />;
      default:
        return <Info size={14} className="mr-1" />;
    }
  };

  return (
    <div 
      className="glass-panel overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video bg-secondary">
        <img
          src={equipment.imageUrl || '/placeholder.svg'}
          alt={equipment.name}
          className="object-cover w-full h-full transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
            {getStatusIcon(equipment.status)}
            {equipment.status === 'available' ? 'Available' : 
             equipment.status === 'in-use' ? 'In Use' : 'Maintenance'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{equipment.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{equipment.category}</p>
          </div>
        </div>
        
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {equipment.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {equipment.location}
          </span>
          
          <Link
            to={`/equipment/${equipment.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
