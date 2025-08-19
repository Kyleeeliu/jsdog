import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">🐕 Just Dogs</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Training Management for{' '}
            <span className="text-blue-600">Every Doggy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your dog training business with our comprehensive platform. 
            Manage bookings, track progress, and communicate seamlessly with trainers, 
            parents, and administrators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Successful Dog Training
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From scheduling to billing, we've got you covered with tools designed 
              specifically for dog training professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  Manage bookings, prevent double-booking, and keep track of recurring sessions with our intuitive calendar system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🐾</span>
                </div>
                <CardTitle>Dog Profiles</CardTitle>
                <CardDescription>
                  Comprehensive dog profiles with medical notes, behavioral history, vaccine records, and emergency contacts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <CardTitle>Session Feedback</CardTitle>
                <CardDescription>
                  Easy-to-use feedback system with progress tracking, photo uploads, and detailed session notes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <CardTitle>Billing & Invoicing</CardTitle>
                <CardDescription>
                  Generate invoices in South African Rands, track payments, and manage outstanding balances efficiently.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <CardTitle>Communication</CardTitle>
                <CardDescription>
                  Internal messaging system with role-based announcements and real-time notifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Role-specific dashboards with key metrics, revenue tracking, and business insights.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-Based Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Designed for Every Role
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a trainer, parent, or administrator, our platform adapts to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">🐕 Trainers</h3>
                <CardDescription className="text-blue-700">
                  Manage your sessions, track dog progress, and communicate with parents efficiently.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-800">
                  <li>• View today's sessions and upcoming bookings</li>
                  <li>• Record session feedback with photos</li>
                  <li>• Manage your availability and schedule</li>
                  <li>• Communicate with parents and admins</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <h3 className="text-2xl font-bold text-orange-800 mb-2">👨‍👩‍👧‍👦 Parents</h3>
                <CardDescription className="text-orange-700">
                  Stay connected with your dog's training progress and manage bookings easily.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-800">
                  <li>• View your dog's training progress</li>
                  <li>• Book and manage training sessions</li>
                  <li>• Track invoices and payments</li>
                  <li>• Receive updates and announcements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <h3 className="text-2xl font-bold text-green-800 mb-2">👨‍💼 Administrators</h3>
                <CardDescription className="text-green-700">
                  Oversee operations, manage users, and track business performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-800">
                  <li>• Monitor all bookings and sessions</li>
                  <li>• Manage trainers and parent accounts</li>
                  <li>• Track revenue and financial reports</li>
                  <li>• Send announcements and manage communications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Dog Training Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join Just Dogs and start managing your training sessions more efficiently today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🐕 Just Dogs</h3>
              <p className="text-gray-400">
                Making dog training management simple and efficient for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Scheduling & Bookings</li>
                <li>Dog Profiles</li>
                <li>Session Feedback</li>
                <li>Billing & Invoicing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Training</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Just Dogs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
