
import { useState } from 'react';
import { 
  PackageOpen, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  History, 
  Search, 
  Bell, 
  Settings, 
  Plus 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import FadeIn from '../components/animations/FadeIn';

// Mock data
const recentActivities = [
  { 
    id: 1, 
    action: 'Borrowed', 
    device: 'Oscilloscope XR-500', 
    time: '2 hours ago', 
    status: 'approved' 
  },
  { 
    id: 2, 
    action: 'Returned', 
    device: 'Digital Multimeter', 
    time: '1 day ago', 
    status: 'completed' 
  },
  { 
    id: 3, 
    action: 'Requested', 
    device: 'Spectrum Analyzer', 
    time: '2 days ago', 
    status: 'pending' 
  },
];

const deviceStatuses = [
  { id: 1, status: 'available', count: 124, label: 'Available', icon: CheckCircle },
  { id: 2, status: 'in-use', count: 45, label: 'In Use', icon: Clock },
  { id: 3, status: 'maintenance', count: 12, label: 'Maintenance', icon: AlertTriangle },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-amber-600 dark:text-amber-400';
      case 'completed':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 dark:bg-secondary/10">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <Container>
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, Alex
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Search size={20} />
                </button>
                <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Bell size={20} />
                </button>
                <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="glass-panel p-1 rounded-lg mb-8">
              <div className="flex">
                {[
                  { id: 'overview', label: 'Overview', icon: PackageOpen },
                  { id: 'borrowed', label: 'Borrowed', icon: Clock },
                  { id: 'history', label: 'History', icon: History },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-background text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
          
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deviceStatuses.map((item, index) => (
                  <FadeIn key={item.id} delay={index * 100}>
                    <div className="glass-panel p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm">{item.label}</p>
                          <h3 className="text-3xl font-bold mt-1">{item.count}</h3>
                        </div>
                        <div className={`p-3 rounded-full ${
                          item.status === 'available' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                            : item.status === 'in-use'
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          <item.icon size={24} />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn delay={300} className="md:col-span-2">
                  <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Recent Activity</h3>
                      <button className="text-sm text-primary">View All</button>
                    </div>
                    
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center p-3 hover:bg-secondary/50 rounded-lg transition-colors">
                          <div className="mr-4 bg-primary/10 p-3 rounded-full">
                            {activity.action === 'Borrowed' ? (
                              <Clock size={20} className="text-primary" />
                            ) : activity.action === 'Returned' ? (
                              <CheckCircle size={20} className="text-primary" />
                            ) : (
                              <AlertTriangle size={20} className="text-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline">
                              <h4 className="text-sm font-medium">{activity.device}</h4>
                              <span className={`ml-2 text-xs ${getStatusColor(activity.status)}`}>
                                {activity.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.action} {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn delay={400}>
                  <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Quick Actions</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <button className="w-full flex items-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                        <Plus size={18} className="mr-3 text-primary" />
                        <span className="text-sm font-medium">Borrow Equipment</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                        <CheckCircle size={18} className="mr-3 text-primary" />
                        <span className="text-sm font-medium">Return Equipment</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                        <AlertTriangle size={18} className="mr-3 text-primary" />
                        <span className="text-sm font-medium">Report Issue</span>
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}
          
          {activeTab === 'borrowed' && (
            <FadeIn>
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-6">Currently Borrowed Equipment</h3>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any borrowed equipment</p>
                </div>
              </div>
            </FadeIn>
          )}
          
          {activeTab === 'history' && (
            <FadeIn>
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-6">Borrowing History</h3>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No history found</p>
                </div>
              </div>
            </FadeIn>
          )}
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
