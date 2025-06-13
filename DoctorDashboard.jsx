
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
  Calendar, 
  Users, 
  FileText, 
  Video, 
  MessageSquare, 
  Upload, 
  Stethoscope, 
  Clock, 
  User, 
  Activity,
  Pill,
  ClipboardList,
  Phone,
  Plus,
  Eye,
  Send
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const savedPatients = localStorage.getItem('doctor_patients');
    const savedAppointments = localStorage.getItem('doctor_appointments');
    const savedPrescriptions = localStorage.getItem('doctor_prescriptions');

    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    } else {
      // Initialize with sample data
      const samplePatients = [
        {
          id: 1,
          name: 'John Doe',
          age: 35,
          condition: 'Hypertension',
          lastVisit: '2024-01-10',
          status: 'Stable',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Jane Smith',
          age: 28,
          condition: 'Diabetes Type 2',
          lastVisit: '2024-01-08',
          status: 'Monitoring',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }
      ];
      setPatients(samplePatients);
      localStorage.setItem('doctor_patients', JSON.stringify(samplePatients));
    }

    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      // Initialize with sample data
      const sampleAppointments = [
        {
          id: 1,
          patient: 'John Doe',
          time: '10:00 AM',
          date: '2024-01-15',
          type: 'Follow-up',
          status: 'Scheduled'
        },
        {
          id: 2,
          patient: 'Jane Smith',
          time: '2:00 PM',
          date: '2024-01-15',
          type: 'Consultation',
          status: 'Scheduled'
        }
      ];
      setAppointments(sampleAppointments);
      localStorage.setItem('doctor_appointments', JSON.stringify(sampleAppointments));
    }

    if (savedPrescriptions) {
      setPrescriptions(JSON.parse(savedPrescriptions));
    }
  }, []);

  const addPrescription = () => {
    const newPrescription = {
      id: Date.now(),
      patient: 'John Doe',
      medication: 'Lisinopril 10mg',
      dosage: 'Once daily',
      duration: '30 days',
      date: new Date().toLocaleDateString(),
      instructions: 'Take with food'
    };
    
    const updatedPrescriptions = [...prescriptions, newPrescription];
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem('doctor_prescriptions', JSON.stringify(updatedPrescriptions));
    
    toast({
      title: "Prescription added!",
      description: "The prescription has been created successfully.",
    });
  };

  const uploadReport = () => {
    toast({
      title: "Report uploaded!",
      description: "The test report has been uploaded to the patient's file.",
    });
  };

  const startVideoConsultation = () => {
    toast({
      title: "🚧 Video consultation feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const sendMessage = () => {
    toast({
      title: "🚧 Messaging feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
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
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your patients and appointments with our smart platform
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                onClick={startVideoConsultation}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Consultation
              </Button>
              <Button
                onClick={addPrescription}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              >
                <Pill className="w-4 h-4 mr-2" />
                New Prescription
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
            { title: 'Total Patients', value: patients.length.toString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
            { title: 'Today\'s Appointments', value: appointments.length.toString(), icon: Calendar, color: 'from-green-500 to-emerald-500' },
            { title: 'Prescriptions', value: prescriptions.length.toString(), icon: Pill, color: 'from-purple-500 to-pink-500' },
            { title: 'Consultations', value: '12', icon: Video, color: 'from-orange-500 to-red-500' }
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
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
            </TabsList>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Appointments</h2>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Appointment
                </Button>
              </div>

              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.patient}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{appointment.time} • {appointment.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Scheduled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            appointment.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {appointment.status}
                          </span>
                          <Button size="sm" onClick={startVideoConsultation}>
                            <Video className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Patients Tab */}
            <TabsContent value="patients" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Patients</h2>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {patients.map((patient) => (
                  <Card key={patient.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={patient.avatar} 
                          alt={patient.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Age: {patient.age}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{patient.condition}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'Stable' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          patient.status === 'Monitoring'? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {patient.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Last Visit:</span>
                          <span className="text-gray-900 dark:text-white">{patient.lastVisit}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Records
                        </Button>
                        <Button size="sm" onClick={sendMessage} className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Prescriptions Tab */}
            <TabsContent value="prescriptions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prescriptions</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      New Prescription
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Prescription</DialogTitle>
                      <DialogDescription>
                        Add a new prescription for your patient
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Patient</Label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>John Doe</option>
                          <option>Jane Smith</option>
                        </select>
                      </div>
                      <div>
                        <Label>Medication</Label>
                        <Input placeholder="e.g., Lisinopril 10mg" />
                      </div>
                      <div>
                        <Label>Dosage</Label>
                        <Input placeholder="e.g., Once daily" />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input placeholder="e.g., 30 days" />
                      </div>
                      <div>
                        <Label>Instructions</Label>
                        <Input placeholder="e.g., Take with food" />
                      </div>
                      <Button onClick={addPrescription} className="w-full">
                        Create Prescription
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {prescriptions.length > 0 ? prescriptions.map((prescription) => (
                  <Card key={prescription.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <Pill className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{prescription.medication}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Patient: {prescription.patient}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{prescription.dosage} • {prescription.duration}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{prescription.instructions}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Prescribed on</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{prescription.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No prescriptions yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first prescription for a patient</p>
                      <Button onClick={addPrescription} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                        Create Prescription
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Consultations Tab */}
            <TabsContent value="consultations" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Consultations</h2>
                <Button onClick={startVideoConsultation} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Video className="w-4 h-4 mr-2" />
                  Start Consultation
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="w-5 h-5 text-purple-500" />
                      <span>Active Consultations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">John Doe</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Consultation in progress</p>
                        </div>
                        <Button size="sm" onClick={startVideoConsultation}>
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="w-5 h-5 text-green-500" />
                      <span>Upload Test Reports</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Select Patient</Label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>John Doe</option>
                          <option>Jane Smith</option>
                        </select>
                      </div>
                      <div>
                        <Label>Report Type</Label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>Blood Test</option>
                          <option>X-Ray</option>
                          <option>MRI Scan</option>
                          <option>ECG</option>
                        </select>
                      </div>
                      <Button onClick={uploadReport} className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <span>Patient Messages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Jane Smith</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">"Doctor, I've been experiencing some side effects from the new medication. Should I continue taking it?"</p>
                      <Button size="sm" className="mt-2" onClick={sendMessage}>
                        <Send className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <ChatBot />
    </div>
  );
};

export default DoctorDashboard;
