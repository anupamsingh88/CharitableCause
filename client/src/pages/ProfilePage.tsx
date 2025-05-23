import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRound, Package, LogOut, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>My Profile | E-Donation Portal</title>
        <meta name="description" content="Manage your profile on the E-Donation portal" />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarFallback className="bg-primary text-white text-lg">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">
                  <UserRound className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Package className="mr-2 h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={user.firstName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user.lastName} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Enter your city or neighborhood" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <textarea
                        id="about"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Tell us a bit about yourself"
                      />
                    </div>
                    
                    <Button 
                      className="bg-primary hover:bg-emerald-600"
                      onClick={handleSaveProfile}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "You created a new donation", item: "Wooden dining table", time: "2 days ago" },
                        { action: "You updated your profile", item: "", time: "1 week ago" },
                        { action: "You joined E-Donate", item: "", time: "2 weeks ago" },
                      ].map((activity, index) => (
                        <div key={index} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="w-2 h-2 mt-2 rounded-full bg-primary mr-3"></div>
                          <div>
                            <p className="text-gray-800">{activity.action} {activity.item && <span className="font-medium">{activity.item}</span>}</p>
                            <p className="text-gray-500 text-sm">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
