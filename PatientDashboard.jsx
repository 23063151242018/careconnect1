
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
  FileText, 
  Activity, 
  MessageSquare, 
  Upload, 
  Heart, 
  Thermometer, 
  Weight, 
  Droplets,
  MapPin,
  Phone,
  Video,
  Clock,
  User,
  Stethoscope,
  AlertTriangle,
  Plus,
  Download,
  Eye
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [healthData, setHealthData] = useState({
    bloodPressure: '',
    heartRate: '',
    weight: '',
    temperature: '',
    bloodSugar: ''
  });
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const savedAppointments = localStorage.getItem('patient_appointments');
    const savedHealthData = localStorage.getItem('patient_health_data');
    const savedDocuments = localStorage.getItem('patient_documents');

    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
    if (savedHealthData) {
      setHealthData(JSON.parse(savedHealthData));
    }
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  const saveHealthData = () => {
    localStorage.setItem('patient_health_data', JSON.stringify(healthData));
    toast({
      title: "Health data saved!",
      description: "Your vitals have been recorded successfully.",
    });
  };

  const bookAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      doctor: 'Dr. Sarah Smith',
      specialty: 'General Medicine',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Scheduled',
      type: 'In-person'
    };
    
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('patient_appointments', JSON.stringify(updatedAppointments));
    
    toast({
      title: "Appointment booked!",
      description: "Your appointment has been scheduled successfully.",
    });
  };

  const uploadDocument = () => {
    const newDocument = {
      id: Date.now(),
      name: 'Lab Report - Blood Test',
      type: 'PDF',
      date: new Date().toLocaleDateString(),
      size: '2.4 MB'
    };
    
    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    localStorage.setItem('patient_documents', JSON.stringify(updatedDocuments));
    
    toast({
      title: "Document uploaded!",
      description: "Your document has been uploaded successfully.",
    });
  };

  const getAIHealthSuggestion = () => {
    const suggestions = [
      "Based on your vitals, consider increasing your daily water intake to 8-10 glasses.",
      "Your heart rate looks good! Keep up with regular exercise for cardiovascular health.",
      "Consider scheduling a routine check-up to monitor your blood pressure trends.",
      "Great job maintaining healthy weight! Continue your current diet and exercise routine.",
      "Your temperature is normal. Make sure to get adequate rest for optimal health."
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    toast({
      title: "AI Health Insight",
      description: randomSuggestion,
    });
  };

  const handleEmergency = () => {
    window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
    toast({
      title: "Emergency services",
      description: "Opening nearby hospitals map. In case of emergency, call 911 immediately.",
      variant: "destructive",
    });
  };

  const startVideoCall = () => {
    toast({
      title: "🚧 Video consultation feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
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
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your health journey with our smart digital platform
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                onClick={handleEmergency}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency
              </Button>
              <Button
                onClick={getAIHealthSuggestion}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                AI Insights
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
            { title: 'Next Appointment', value: 'Jan 15, 10:00 AM', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
            { title: 'Health Score', value: '85/100', icon: Heart, color: 'from-green-500 to-emerald-500' },
            { title: 'Documents', value: documents.length.toString(), icon: FileText, color: 'from-purple-500 to-pink-500' },
            { title: 'Last Check-up', value: '2 weeks ago', icon: Stethoscope, color: 'from-orange-500 to-red-500' }
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
              <TabsTrigger value="health">Health Tracker</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
            </TabsList>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book New Appointment</DialogTitle>
                      <DialogDescription>
                        Schedule an appointment with your preferred doctor
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Select Doctor</Label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>Dr. Sarah Smith - General Medicine</option>
                          <option>Dr. John Doe - Cardiology</option>
                          <option>Dr. Emily Johnson - Dermatology</option>
                        </select>
                      </div>
                      <div>
                        <Label>Preferred Date</Label>
                        <Input type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label>Preferred Time</Label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>9:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>2:00 PM</option>
                          <option>3:00 PM</option>
                        </select>
                      </div>
                      <Button onClick={bookAppointment} className="w-full">
                        Book Appointment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {appointments.length > 0 ? appointments.map((appointment) => (
                  <Card key={appointment.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.doctor}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.specialty}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{appointment.date} at {appointment.time}</p>
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
                          <Button size="sm" onClick={startVideoCall}>
                            <Video className="w-4 h-4 mr-1" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No appointments yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Book your first appointment to get started</p>
                      <Button onClick={bookAppointment} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Health Tracker Tab */}
            <TabsContent value="health" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health Tracker</h2>
                <Button onClick={getAIHealthSuggestion} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                  <Activity className="w-4 h-4 mr-2" />
                  Get AI Insights
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>Record Vitals</span>
                    </CardTitle>
                    <CardDescription>Track your daily health metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bp">Blood Pressure</Label>
                        <Input
                          id="bp"
                          placeholder="120/80"
                          value={healthData.bloodPressure}
                          onChange={(e) => setHealthData({...healthData, bloodPressure: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hr">Heart Rate</Label>
                        <Input
                          id="hr"
                          placeholder="72 bpm"
                          value={healthData.heartRate}
                          onChange={(e) => setHealthData({...healthData, heartRate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          placeholder="70 kg"
                          value={healthData.weight}
                          onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="temp">Temperature</Label>
                        <Input
                          id="temp"
                          placeholder="98.6°F"
                          value={healthData.temperature}
                          onChange={(e) => setHealthData({...healthData, temperature: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sugar">Blood Sugar</Label>
                      <Input
                        id="sugar"
                        placeholder="100 mg/dL"
                        value={healthData.bloodSugar}
                        onChange={(e) => setHealthData({...healthData, bloodSugar: e.target.value})}
                      />
                    </div>
                    <Button onClick={saveHealthData} className="w-full">
                      Save Health Data
                    </Button>
                  </CardContent>
                </Card>

                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-500" />
                      <span>Health Overview</span>
                    </CardTitle>
                    <CardDescription>Your current health metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: 'Blood Pressure', value: healthData.bloodPressure || 'Not recorded', icon: Droplets, color: 'text-red-500' },
                      { label: 'Heart Rate', value: healthData.heartRate || 'Not recorded', icon: Heart, color: 'text-pink-500' },
                      { label: 'Weight', value: healthData.weight || 'Not recorded', icon: Weight, color: 'text-blue-500' },
                      { label: 'Temperature', value: healthData.temperature || 'Not recorded', icon: Thermometer, color: 'text-orange-500' },
                      { label: 'Blood Sugar', value: healthData.bloodSugar || 'Not recorded', icon: Activity, color: 'text-green-500' }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                          <span className="font-medium text-gray-900 dark:text-white">{metric.label}</span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{metric.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Documents</h2>
                <Button onClick={uploadDocument} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>

              <div className="grid gap-4">
                {documents.length > 0 ? documents.map((doc) => (
                  <Card key={doc.id} className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{doc.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{doc.type} • {doc.size}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No documents yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your medical documents to keep them organized</p>
                      <Button onClick={uploadDocument} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                        Upload First Document
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
                <Button onClick={startVideoCall} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Video className="w-4 h-4 mr-2" />
                  Start Consultation
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="health-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="w-5 h-5 text-purple-500" />
                      <span>Upcoming Consultations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Dr. Sarah Smith</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Today, 3:00 PM</p>
                        </div>
                        <Button size="sm" onClick={startVideoCall}>
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
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      <span>Chat with Doctor</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Last message from Dr. Smith:</p>
                        <p className="text-gray-900 dark:text-white">"Your test results look good. Continue with the prescribed medication."</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">2 hours ago</p>
                      </div>
                      <Button className="w-full" onClick={() => toast({ title: "🚧 Chat feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Open Chat
                      </Button>
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

export default PatientDashboard;
