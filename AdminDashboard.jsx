
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  UserPlus, 
  Activity, 
  BarChart3, 
  Settings, 
  Shield, 
  Stethoscope, 
  User, 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    activeAppointments: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const savedUsers = localStorage.getItem('admin_users');
    const savedDoctors = localStorage.getItem('admin_doctors');

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with sample data
      const sampleUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'patient',
          status: 'active',
          joinDate: '2024-01-01',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Dr. Sarah Smith',
          email: 'sarah@example.com',
          role: 'doctor',
          status: 'active',
          joinDate: '2024-01-01',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Jane Wilson',
          email: 'jane@example.com',
          role: 'patient',
          status: 'inactive',
          joinDate: '2024-01-05',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }
      ];
      setUsers(sampleUsers);
      localStorage.setItem('admin_users', JSON.stringify(sampleUsers));
    }

    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    } else {
      // Initialize with sample data
      const sampleDoctors = [
        {
          id: 1,
          name: 'Dr. Sarah Smith',
          specialty: 'General Medicine',
          patients: 25,
          status: 'active',
          rating: 4.8,
          experience: '8 years'
        },
        {
          id: 2,
          name: 'Dr. Michael Johnson',
          specialty: 'Cardiology',
          patients: 18,
          status: 'active',
          rating: 4.9,
          experience: '12 years'
        }
      ];
      setDoctors(sampleDoctors);
      localStorage.setItem('admin_doctors', JSON.stringify(sampleDoctors));
    }

    // Calculate stats
    const totalUsers = users.length;
    const totalDoctors = users.filter(u => u.role === 'doctor').length;
    const totalPatients = users.filter(u => u.role === 'patient').length;
    
    setSystemStats({
      totalUsers,
      totalDoctors,
      totalPatients,
      activeAppointments: 15
    });
  }, [users]);

  const addUser = () => {
    const newUser = {
      id: Date.now(),
      name: 'New User',
      email: 'newuser@example.com',
      role: 'patient',
      status: 'active',
      joinDate: new Date().toLocaleDateString(),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
    
    toast({
      title: "User added!",
      description: "New user has been added to the system.",
    });
  };

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
    
    toast({
      title: "User status updated!",
      description: "User status has been changed successfully.",
    });
  };

  const assignDoctor = () => {
    toast({
      title: "🚧 Doctor assignment feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const moderateContent = () => {
    toast({
      title: "🚧 Content moderation feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const generateReport = () => {
    toast({
      title: "🚧 Report generation feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage users, doctors, and system operations
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                onClick={generateReport}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button
                onClick={addUser}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Users', value: systemStats.totalUsers.toString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
            { title: 'Active Doctors', value: systemStats.totalDoctors.toString(), icon: Stethoscope, color: 'from-green-500 to-emerald-500' },
            { title: 'Patients', value: systemStats.totalPatients.toString(), icon: User, color: 'from-purple-500 to-pink-500' },
            { title: 'Active Appointments', value: systemStats.activeAppointments.toString(), icon: Calendar, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <Card key={index} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="doctors">Doctor Management</TabsTrigger>
              <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account in the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input placeholder="Enter full name" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="Enter email address" />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <Button onClick={addUser} className="w-full">
                        Create User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">Joined: {user.joinDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            user.role === 'doctor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {user.status === 'active' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />}
                            {user.status}
                          </span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Doctors Tab */}
            <TabsContent value="doctors" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Management</h2>
                <Button onClick={assignDoctor} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign Doctor
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                          <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">{doctor.experience} experience</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doctor.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {doctor.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Patients:</span>
                          <span className="text-gray-900 dark:text-white">{doctor.patients}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                          <span className="text-gray-900 dark:text-white">{doctor.rating}/5.0</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Moderation Tab */}
            <TabsContent value="moderation" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Moderation</h2>
                <Button onClick={moderateContent} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Review Content
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <span>Pending Reviews</span>
                    </CardTitle>
                    <CardDescription>Content awaiting moderation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Document Upload</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Patient: John Doe</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Uploaded 2 hours ago</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" onClick={moderateContent}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={moderateContent}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span>Recent Actions</span>
                    </CardTitle>
                    <CardDescription>Latest moderation activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Document approved</span>
                        <span className="text-green-600 dark:text-green-400">5 min ago</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">User account verified</span>
                        <span className="text-blue-600 dark:text-blue-400">1 hour ago</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Content flagged</span>
                        <span className="text-red-600 dark:text-red-400">3 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Analytics</h2>
                <Button onClick={generateReport} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-500" />
                      <span>User Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Daily Active Users</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Weekly Active Users</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">5,678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Active Users</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">12,345</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>Appointments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">312</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">1,456</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-purple-500" />
                      <span>System Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">120ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Error Rate</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">0.1%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
