import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { DonationItem } from '@shared/schema';
import DonationCard from '@/components/browse/DonationCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Package } from 'lucide-react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const [_, setLocation] = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  // Fetch user's donations
  const { data: userDonations, isLoading } = useQuery<DonationItem[]>({ 
    queryKey: ['/api/users/me/donations'],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | E-Donation Portal</title>
        <meta name="description" content="Manage your donations and requests on the E-Donation portal" />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName}! Manage your donations and requests.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link href="/donate">
                <Button className="bg-primary hover:bg-emerald-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Donation
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userDonations?.length || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userDonations?.filter(d => d.status === 'available').length || 0}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Completed Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userDonations?.filter(d => d.status === 'completed').length || 0}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="my-donations">
            <TabsList className="mb-6">
              <TabsTrigger value="my-donations">My Donations</TabsTrigger>
              <TabsTrigger value="my-requests">My Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-donations">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-0">
                        <Skeleton className="h-48 rounded-t-lg" />
                        <div className="p-4 space-y-2">
                          <Skeleton className="h-6 w-2/3" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-10 w-full rounded" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : userDonations && userDonations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userDonations.map((donation) => (
                    <DonationCard key={donation.id} donation={donation} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No donations yet</h3>
                    <p className="text-gray-500 mb-4">You haven't created any donation listings yet.</p>
                    <Link href="/donate">
                      <Button className="bg-primary hover:bg-emerald-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Donation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="my-requests">
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No requests yet</h3>
                  <p className="text-gray-500 mb-4">You haven't requested any items yet.</p>
                  <Link href="/browse">
                    <Button className="bg-primary hover:bg-emerald-600">
                      Browse Available Donations
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
