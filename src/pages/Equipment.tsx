
import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import EquipmentCard, { Equipment } from '../components/equipment/EquipmentCard';
import FadeIn from '../components/animations/FadeIn';

// Mock data
const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Digital Oscilloscope',
    category: 'Measurement',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1606323518228-9a677f75d864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    description: 'High-precision digital oscilloscope with 100MHz bandwidth and 1GSa/s sample rate.',
    location: 'Electronics Lab - Room 203',
  },
  {
    id: '2',
    name: 'Spectrum Analyzer',
    category: 'Analysis',
    status: 'in-use',
    imageUrl: 'https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    description: 'Advanced spectrum analyzer for frequency domain analysis with 3GHz range.',
    location: 'Communications Lab - Room 105',
  },
  {
    id: '3',
    name: 'Function Generator',
    category: 'Signal Generation',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-7d25c8e28d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    description: 'High-performance function generator with arbitrary waveform capabilities.',
    location: 'Electronics Lab - Room 204',
  },
  {
    id: '4',
    name: 'Digital Multimeter',
    category: 'Measurement',
    status: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1563770108809-94e1e6acea39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    description: 'Precision digital multimeter for measuring voltage, current, resistance, and more.',
    location: 'General Lab - Room 101',
  },
  {
    id: '5',
    name: 'Logic Analyzer',
    category: 'Analysis',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1581093196277-9f1f2f956302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    description: 'Digital logic analyzer with 16 channels and advanced triggering capabilities.',
    location: 'Digital Systems Lab - Room 305',
  },
  {
    id: '6',
    name: 'Power Supply',
    category: 'Power',
    status: 'in-use',
    imageUrl: 'https://images.unsplash.com/photo-1563770504246-8f4e88c15eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    description: 'Adjustable DC power supply with dual outputs and current limiting protection.',
    location: 'Electronics Lab - Room 203',
  },
];

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', 'Measurement', 'Analysis', 'Signal Generation', 'Power'];
  const statuses = ['All', 'Available', 'In Use', 'Maintenance'];
  
  const filteredEquipment = mockEquipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
                            selectedCategory === 'All' || 
                            item.category === selectedCategory;
    
    const matchesStatus = !selectedStatus || 
                          selectedStatus === 'All' || 
                          (selectedStatus === 'Available' && item.status === 'available') ||
                          (selectedStatus === 'In Use' && item.status === 'in-use') ||
                          (selectedStatus === 'Maintenance' && item.status === 'maintenance');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-secondary/30 dark:bg-secondary/10">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <Container>
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold">Equipment</h1>
                <p className="text-muted-foreground mt-1">
                  Browse and borrow available lab equipment
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <button 
                  className="p-3 rounded-lg text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/70 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <SlidersHorizontal size={20} /> : <Filter size={20} />}
                </button>
              </div>
            </div>
          </FadeIn>
          
          {showFilters && (
            <FadeIn>
              <div className="glass-panel p-4 mb-8 md:flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/70 text-foreground'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <p className="text-sm font-medium mb-2">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedStatus === status
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/70 text-foreground'
                        }`}
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
          
          {filteredEquipment.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map((equipment, index) => (
                <FadeIn key={equipment.id} delay={index * 100}>
                  <EquipmentCard equipment={equipment} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="glass-panel p-10 text-center">
                <h3 className="text-lg font-medium mb-2">No equipment found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            </FadeIn>
          )}
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Equipment;
