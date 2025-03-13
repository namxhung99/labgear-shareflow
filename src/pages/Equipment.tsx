
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
    name: 'Máy hiện sóng',
    category: 'Thiết bị đo lường',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    location: 'Phòng 101',
    status: 'available',
    condition: 'good',
    description: 'Máy hiện sóng kỹ thuật số với băng thông 100MHz và tốc độ lấy mẫu 1GSa/s.'
  },
  {
    id: 2,
    name: 'Đồng hồ vạn năng',
    category: 'Thiết bị đo lường',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    location: 'Phòng 102',
    status: 'in-use',
    condition: 'excellent',
    description: 'Đồng hồ vạn năng chính xác để đo điện áp, dòng điện, điện trở, điện dung và nhiệt độ.'
  },
  {
    id: 3,
    name: 'Máy phát tín hiệu',
    category: 'Tín hiệu',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    location: 'Phòng 103',
    status: 'maintenance',
    condition: 'fair',
    description: 'Thiết bị tạo ra các dạng sóng khác nhau với tần số và biên độ có thể điều chỉnh.'
  },
  {
    id: 4,
    name: 'Nguồn DC',
    category: 'Nguồn điện',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    location: 'Phòng 101',
    status: 'available',
    condition: 'good',
    description: 'Nguồn DC ổn định với điện áp và giới hạn dòng điện có thể điều chỉnh.'
  },
  {
    id: 5,
    name: 'Máy phân tích logic',
    category: 'Kỹ thuật số',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    location: 'Phòng 104',
    status: 'available',
    condition: 'excellent',
    description: 'Máy phân tích logic 16 kênh để gỡ lỗi và phân tích mạch kỹ thuật số.'
  },
  {
    id: 6,
    name: 'Trạm hàn',
    category: 'Công cụ',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    location: 'Phòng 105',
    status: 'in-use',
    condition: 'good',
    description: 'Trạm hàn có kiểm soát nhiệt độ với màn hình hiển thị kỹ thuật số và nhiều đầu hàn khác nhau.'
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
            Quay lại Bảng điều khiển
          </Link>
          
          <FadeIn>
            <h1 className="text-3xl font-bold mt-4 mb-2">Thiết Bị Phòng Thí Nghiệm</h1>
            <p className="text-muted-foreground">
              Duyệt và yêu cầu thiết bị cho các dự án phòng thí nghiệm của bạn
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
