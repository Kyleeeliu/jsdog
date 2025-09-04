import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
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
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            From pet care to specialized training, we provide comprehensive dog services 
            with professional management. Track progress, manage bookings, and ensure 
            the best care for every dog in your care.
          </p>

          
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
                  <span className="text-2xl text-white">🧠</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Behavioral Consultation (Mini)</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With one of our Registered Qualified Trainers or a Behaviourist. Covers basic behavior issues and life skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R450 per dog</p>
                  <p className="text-sm text-gray-600">1-1.5hrs session with practical advice</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Home or office location</li>
                    <li>• Mini summary report via WhatsApp</li>
                    <li>• Action plan included</li>
                    <li>• Extra dog: R150 additional</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🐕</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Social Assessment</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With an allocated Registered Qualified trainer or Behaviourist for dogs with social anxiety, reactivity, or antisocial behaviour.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R550 per dog</p>
                  <p className="text-sm text-gray-600">1-1.5hrs session with on/off lead assessments</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Office or local enclosed park location</li>
                    <li>• On lead and off lead assessments</li>
                    <li>• Summary report included</li>
                    <li>• Extra dog: R150 additional</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🔧</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Behavioral Consultation (Complex)</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With our Registered Canine Behaviour Practitioner (behaviourist) for complex problem behaviours in the home.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R800 per dog</p>
                  <p className="text-sm text-gray-600">1.5hrs home session with full assessment</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Home location only</li>
                    <li>• Full summary report via email</li>
                    <li>• Comprehensive action plan</li>
                    <li>• Follow-up sessions: R300 each</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[rgb(0_32_96)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <CardTitle className="text-xl text-[rgb(0_32_96)]">Introductions</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  With one of our experienced senior trainers for new furry family members or blended family packs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[rgb(0_32_96)]">R400 initial session</p>
                  <p className="text-sm text-gray-600">1 hour session with practical training and advice</p>
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    <li>• Neutral space or enclosed park location</li>
                    <li>• Follow-up lessons: R200 per hour</li>
                    <li>• Additional dogs: R100 if input required</li>
                    <li>• Action plan included</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[rgb(0_32_96)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Dog Services Business?
          </h2>
          <p className="text-lg sm:text-xl text-white text-opacity-90 mb-10 leading-relaxed">
            Join Just Dogs and start managing your dog care and training services more efficiently today. 
            Experience the difference professional management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-[rgb(0_32_96)] hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                Get Started Now
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[rgb(0_32_96)] transition-colors">
                Try Demo
              </Button>
            </Link>
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
    </div>
  );
}
