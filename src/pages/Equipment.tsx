
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import EquipmentCard from '../components/equipment/EquipmentCard';
import type { Equipment as EquipmentType } from '../types/equipment';
import FadeIn from '../components/animations/FadeIn';
import Container from '../components/ui/Container';

// Placeholder equipment data - this would typically come from an API
const equipmentData: EquipmentType[] = [
  {
    id: 1,
    name: 'Oscilloscope',
    category: 'Measurement',
    image: '/placeholder.svg',
    status: 'available',
    condition: 'good',
    description: 'Digital storage oscilloscope with 100MHz bandwidth and 1GSa/s sample rate.'
  },
  {
    id: 2,
    name: 'Digital Multimeter',
    category: 'Measurement',
    image: '/placeholder.svg',
    status: 'in-use',
    condition: 'excellent',
    description: 'Precision multimeter for voltage, current, resistance, capacitance, and temperature measurement.'
  },
  {
    id: 3,
    name: 'Function Generator',
    category: 'Signal',
    image: '/placeholder.svg',
    status: 'maintenance',
    condition: 'fair',
    description: 'Generates various waveforms with adjustable frequency and amplitude.'
  },
  {
    id: 4,
    name: 'DC Power Supply',
    category: 'Power',
    image: '/placeholder.svg',
    status: 'available',
    condition: 'good',
    description: 'Regulated DC power supply with adjustable voltage and current limits.'
  },
  {
    id: 5,
    name: 'Logic Analyzer',
    category: 'Digital',
    image: '/placeholder.svg',
    status: 'available',
    condition: 'excellent',
    description: '16-channel logic analyzer for digital circuit debugging and analysis.'
  },
  {
    id: 6,
    name: 'Soldering Station',
    category: 'Tools',
    image: '/placeholder.svg',
    status: 'in-use',
    condition: 'good',
    description: 'Temperature-controlled soldering station with digital display and various tips.'
  },
];

const Equipment = () => {
  // Categories for filtering
  const categories = [...new Set(equipmentData.map(item => item.category))];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <Container className="pt-32 pb-16">
        <div className="mb-8">
          <Link 
            to="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
          
          <FadeIn>
            <h1 className="text-3xl font-bold mt-4 mb-2">Lab Equipment</h1>
            <p className="text-muted-foreground">
              Browse and request equipment for your lab projects
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentData.map((item, index) => (
            <FadeIn key={item.id} delay={index * 50}>
              <EquipmentCard equipment={item} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Equipment;
