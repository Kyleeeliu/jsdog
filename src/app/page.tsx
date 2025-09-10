'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DogAssessmentBot from '@/components/DogAssessmentBot';

export default function Home() {
  const [showAssessmentBot, setShowAssessmentBot] = useState(false);

  const handleAssessmentComplete = (result: any) => {
    // Store the assessment result in localStorage for later use
    const existingAssessments = JSON.parse(localStorage.getItem('dogAssessments') || '[]');
    const newAssessment = {
      ...result,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending_login' // Will be completed when user logs in
    };
    existingAssessments.push(newAssessment);
    localStorage.setItem('dogAssessments', JSON.stringify(existingAssessments));
    setShowAssessmentBot(false);
    
    // Show success message
    alert('Assessment completed! Please log in to create your dog profile and view recommendations.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(0_32_96)] from-opacity-5 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                          <h1 className="text-2xl font-bold text-[rgb(0_32_96)] flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img 
                src="/images/icons/logo.png" 
                alt="Just Dogs Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span>Just Dogs</span>
          </h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#services" className="text-gray-600 hover:text-[rgb(0_32_96)] font-medium transition-colors">
                Services
              </Link>

              <Link href="#pricing" className="text-gray-600 hover:text-[rgb(0_32_96)] font-medium transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline" className="border-[rgb(0_32_96)] text-[rgb(0_32_96)] hover:bg-[rgb(0_32_96)] hover:text-white transition-colors">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[rgb(0_32_96)] hover:bg-[rgb(0_24_72)] transition-colors">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight text-center">
            Professional Dog Services for{' '}
            <span className="text-[rgb(0_32_96)] bg-gradient-to-r from-[rgb(0_32_96)] to-[rgb(0_24_96)] bg-clip-text text-transparent">
              Every Need
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            From pet care to specialized training, we provide comprehensive dog services 
            with professional management. Track progress, manage bookings, and ensure 
            the best care for every dog in your care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              onClick={() => setShowAssessmentBot(true)}
              size="lg" 
              className="text-lg px-8 py-4 bg-[rgb(0_32_96)] hover:bg-[rgb(0_24_72)] transition-colors shadow-lg hover:shadow-xl"
            >
              🐕 Get Personalized Recommendations
            </Button>
            <Link href="/register">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-[rgb(0_32_96)] text-[rgb(0_32_96)] hover:bg-[rgb(0_32_96)] hover:text-white transition-colors"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-[rgb(0_32_96)] mb-2">500+</div>
              <div className="text-sm text-gray-600">Happy Dogs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[rgb(0_32_96)] mb-2">50+</div>
              <div className="text-sm text-gray-600">Professional Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[rgb(0_32_96)] mb-2">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Professional Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive dog care and training services tailored to meet every need, 
              from basic pet care to specialized behavioral training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Private Training</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With one of our Registered Qualified Trainers AFTER a consultation or social assessment. Recommended after a complex or mini consultation, or a social assessment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R250 per 1 hr session</p>
                  <p className="text-sm text-gray-600">+ R150 per additional dog in the same session</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Held at varying locations or at home</li>
                    <li>• Focuses on empowering you to help your dog thrive</li>
                    <li>• Covers manners, basic training, social and life skills</li>
                    <li>• Any reactivity requires Complex Consultation first</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">📚</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Tutoring (Private training add on)</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With one of our passionate qualified trainers. For socialisation practice, manners, basic training, walking and life skills for any aged dog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R200 per session</p>
                  <p className="text-sm text-gray-600">R150 per additional dog within same time frame</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Your dog is worked with at your home, or collected</li>
                    <li>• Sessions are 40 minutes long (not including travel time)</li>
                    <li>• Feedback given after each session via WhatsApp group</li>
                    <li>• You will still be required to join some sessions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🎪</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Private Activity & Enrichment Service</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With a passionate, pet first aid trained handler or trainer. For additional exercise, stimulation and fun! Great for focus and confidence building.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R200 for a full 1.5 hour session</p>
                  <p className="text-sm text-gray-600">Handler brings their own equipment, treats and toys</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• A handler comes to your home and works in your yard</li>
                    <li>• Physical activities, mental stimulation activities included</li>
                    <li>• Educare brain training for self-control and lifestyle skills</li>
                    <li>• Tailored to your dog&apos;s needs and preferences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🏃</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">The Dog Jog Walking and Socialisation Service</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With a passionate, pet first aid trained handler or trainer. For exercise, outdoor stimulation and fun, social playdates with compatible friends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R100 per walk for one dog</p>
                  <p className="text-sm text-gray-600">+ R45 per additional dog</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Your dog/s are collected from your house</li>
                    <li>• Varying locations (beach, vlei, parks, residential)</li>
                    <li>• Walks are 40 minutes long (not including travel time)</li>
                    <li>• Social walks are popular, but private walks available</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🏠</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Pet Care & Sitting</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Professional pet care services including feeding, walking, and overnight care for your beloved pets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">Starting from R150/day</p>
                  <p className="text-sm text-gray-600">Flexible scheduling and personalized care</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Daily feeding and medication</li>
                    <li>• Regular exercise and playtime</li>
                    <li>• Overnight care available</li>
                    <li>• Photo updates included</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🎓</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Group Training Classes</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Structured group training sessions for socialization and basic obedience training in a controlled environment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R300 per 6-week course</p>
                  <p className="text-sm text-gray-600">Small group sizes for personalized attention</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Basic obedience commands</li>
                    <li>• Socialization with other dogs</li>
                    <li>• Professional trainer guidance</li>
                    <li>• Take-home training materials</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🏥</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Health & Wellness</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Comprehensive health monitoring and wellness programs to keep your dog in optimal condition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R200 per wellness check</p>
                  <p className="text-sm text-gray-600">Regular health assessments and care plans</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Weight and nutrition monitoring</li>
                    <li>• Exercise and activity tracking</li>
                    <li>• Health record maintenance</li>
                    <li>• Vet coordination services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Specialized Training</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Advanced training programs for specific needs including therapy dog preparation and specialized behavioral modification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R500 per specialized program</p>
                  <p className="text-sm text-gray-600">Customized training for specific requirements</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Therapy dog certification prep</li>
                    <li>• Service dog training basics</li>
                    <li>• Advanced behavioral modification</li>
                    <li>• Specialized skill development</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🐕</span>
                <span>Just Dogs</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Making dog care and training management simple and efficient for everyone. 
                Professional tools for professional results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Pet Care & Sitting</li>
                <li className="hover:text-white transition-colors cursor-pointer">Dog Training</li>
                <li className="hover:text-white transition-colors cursor-pointer">Private Training</li>
                <li className="hover:text-white transition-colors cursor-pointer">Consultations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Training</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Just Dogs. All rights reserved. Professional dog services management platform.</p>
          </div>
        </div>
      </footer>

      {/* Dog Assessment Bot */}
      <DogAssessmentBot
        isOpen={showAssessmentBot}
        onClose={() => setShowAssessmentBot(false)}
        onComplete={handleAssessmentComplete}
      />
    </div>
  );
}
