'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  UserGroupIcon,
  CalendarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { getCurrentUser } from '@/lib/auth/auth';
import { User, Dog } from '@/types';

// Mock data for demonstration
const mockDogs: Dog[] = [
  {
    id: '1',
    name: 'Max',
    breed: 'Golden Retriever',
    age: 2,
    weight: 30,
    owner_id: '1',
    medical_notes: 'No known medical issues. Up to date on vaccinations.',
    behavioral_notes: 'Friendly and eager to learn. Responds well to positive reinforcement.',
    vaccine_records: 'All vaccinations up to date. Last rabies shot: 6 months ago.',
    preferences: 'Loves treats, especially chicken. Enjoys water activities.',
    emergency_contact: {
      name: 'Sarah Johnson',
      phone: '+27 82 123 4567',
      relationship: 'Owner'
    },
    photo_url: '/api/placeholder/150/150',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Border Collie',
    age: 1,
    weight: 20,
    owner_id: '2',
    medical_notes: 'Allergic to certain grains. Requires grain-free diet.',
    behavioral_notes: 'High energy, very intelligent. Needs mental stimulation.',
    vaccine_records: 'All vaccinations up to date. Last checkup: 3 months ago.',
    preferences: 'Enjoys agility training and puzzle toys.',
    emergency_contact: {
      name: 'Mike Smith',
      phone: '+27 83 987 6543',
      relationship: 'Owner'
    },
    photo_url: '/api/placeholder/150/150',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Buddy',
    breed: 'Labrador Retriever',
    age: 3,
    weight: 35,
    owner_id: '3',
    medical_notes: 'Hip dysplasia - requires gentle exercise.',
    behavioral_notes: 'Calm and patient. Great with children.',
    vaccine_records: 'All vaccinations up to date.',
    preferences: 'Gentle walks and swimming.',
    emergency_contact: {
      name: 'Lisa Brown',
      phone: '+27 84 555 1234',
      relationship: 'Owner'
    },
    photo_url: '/api/placeholder/150/150',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function DogsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [dogs, setDogs] = useState<Dog[]>(mockDogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Filter dogs based on user role
        if (currentUser?.role === 'parent') {
          // Parents only see their own dogs
          setDogs(mockDogs.filter(dog => dog.owner_id === currentUser.id));
        } else {
          // Admins and trainers see all dogs
          setDogs(mockDogs);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dogs</h1>
          <p className="text-gray-600">
            Manage dog profiles and training information
          </p>
        </div>
        {(user?.role === 'admin' || user?.role === 'parent') && (
          <Button className="mt-4 sm:mt-0">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Dog
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search dogs by name or breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dogs</CardTitle>
            <UserGroupIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dogs.length}</div>
            <p className="text-xs text-muted-foreground">
              Dogs in the system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dogs.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently in training
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Age</CardTitle>
            <HeartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(dogs.reduce((sum, dog) => sum + dog.age, 0) / dogs.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Years old
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDogs.map((dog) => (
          <Card key={dog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {dog.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-lg">{dog.name}</CardTitle>
                  <CardDescription>{dog.breed}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Age:</span> {dog.age} years
                </div>
                <div>
                  <span className="font-medium">Weight:</span> {dog.weight}kg
                </div>
              </div>
              
              {dog.behavioral_notes && (
                <div className="text-sm">
                  <span className="font-medium">Notes:</span>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {dog.behavioral_notes}
                  </p>
                </div>
              )}

              {dog.emergency_contact && (
                <div className="text-sm">
                  <span className="font-medium">Emergency Contact:</span>
                  <p className="text-gray-600 mt-1">
                    {dog.emergency_contact.name}
                  </p>
                  <p className="text-gray-600">
                    {dog.emergency_contact.phone}
                  </p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No dogs found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first dog.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
