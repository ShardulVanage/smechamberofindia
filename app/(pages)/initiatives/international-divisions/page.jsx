import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Building2, Handshake, MapPin, Users, ArrowRight } from 'lucide-react';

const BusinessCouncilsPage = () => {
  const councils = [
    "India – Japan SME Business Council",
    "Europe – India SME Business Council", 
    "India – China Business Council",
    "India – US SME Business Council",
    "India – UK SME Business Council",
    "India – GCC SME Business Council",
    "India – Canada SME Business Council",
    "India – Poland SME Business Council",
    "India – Netherlands SME Business Council",
    "India – Africa SME Chamber of Industries",
    "India – Hungary Business Council",
    "India – Germany SME Business Council",
    "India – Korea SME Business Council",
    "India – Bulgaria Business Council",
    "India – Italy SME Business Council",
    "India – Romania Business Council",
    "India – ASEAN SME Business Council",
    "India – Australia SME Business Council",
    "India – Brazil SME Business Council",
    "India – France SME Business Council",
    "India – Israel SME Business Council",
    "India – Qatar SME Business Council",
    "India – Russia SME Business Council",
    "India – Saudi Arabia SME Business Council",
    "India – Turkey SME Business Council"
  ];

  const getRegionColor = (council) => {
    if (council.includes('Europe') || council.includes('UK') || council.includes('Germany') || 
        council.includes('France') || council.includes('Italy') || council.includes('Netherlands') ||
        council.includes('Poland') || council.includes('Hungary') || council.includes('Bulgaria') ||
        council.includes('Romania')) return 'bg-blue-50 border-l-blue-500';
    if (council.includes('Asia') || council.includes('Japan') || council.includes('China') || 
        council.includes('Korea') || council.includes('ASEAN')) return 'bg-blue-50 border-l-blue-500';
    if (council.includes('US') || council.includes('Canada') || council.includes('Brazil')) return 'bg-blue-50 border-l-blue-500';
    if (council.includes('GCC') || council.includes('Qatar') || council.includes('Saudi')) return 'bg-blue-50 border-l-blue-500';
    if (council.includes('Africa')) return 'bg-blue-50 border-l-blue-500';
    if (council.includes('Australia')) return 'bg-blue-50 border-l-blue-500';
    return 'bg-blue-50 border-l-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#29688A] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Global SME Business Councils</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Connecting Indian SMEs with global markets through strategic bilateral business councils
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Introduction Section */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="text-center">
                <Building2 className="w-12 h-12 text-[#29688A] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">25+</p>
                <p className="text-gray-600">Business Councils</p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#29688A] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">Global</p>
                <p className="text-gray-600">Reach</p>
              </div>
              <div className="text-center">
                <Handshake className="w-12 h-12 text-[#29688A] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">Bilateral</p>
                <p className="text-gray-600">Partnerships</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#29688A] mb-4">Expanding Horizons Through Strategic Partnerships</h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Our extensive network of SME Business Councils facilitates cross-border trade, investment opportunities, 
              and knowledge exchange between Indian SMEs and their global counterparts. Each council serves as a bridge 
              for bilateral economic cooperation and business development.
            </p>
          </CardContent>
        </Card>

        {/* Business Councils Grid */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-[#29688A] mb-8 text-center">Our Global Network</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {councils.map((council, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${getRegionColor(council)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-[#29688A]" />
                      <span className="font-medium text-gray-800 text-sm">{council}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-[#29688A] rounded"></div>
                <h3 className="text-lg font-semibold text-gray-800">Europe</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Comprehensive coverage across European markets including UK, Germany, France, Italy, and Eastern European nations.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-[#29688A] rounded"></div>
                <h3 className="text-lg font-semibold text-gray-800">Asia-Pacific</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Strategic partnerships with Japan, China, Korea, ASEAN nations, and Australia for regional trade enhancement.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-[#29688A] rounded"></div>
                <h3 className="text-lg font-semibold text-gray-800">Americas</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Strong bilateral relationships with United States, Canada, and Brazil for cross-continental business growth.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-[#29688A] rounded"></div>
                <h3 className="text-lg font-semibold text-gray-800">Middle East</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Focused engagement with GCC countries, Qatar, Saudi Arabia, and Israel for energy and technology sectors.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-[#29688A] rounded"></div>
                <h3 className="text-lg font-semibold text-gray-800">Africa</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Dedicated chamber for Africa-India business collaboration across diverse industrial sectors.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-[#29688A] rounded"></div>
                <h3 className="text-lg font-semibold text-gray-800">Other Regions</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Additional partnerships with Russia, Turkey, and other emerging markets for diversified global reach.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-[#29688A] mb-8 text-center">Benefits of Our Global Network</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Market Access</h4>
                    <p className="text-gray-600 text-sm">Direct access to international markets through established bilateral channels.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Trade Facilitation</h4>
                    <p className="text-gray-600 text-sm">Simplified trade processes and reduced barriers for cross-border business.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Investment Opportunities</h4>
                    <p className="text-gray-600 text-sm">Connect with potential investors and joint venture partners globally.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Knowledge Exchange</h4>
                    <p className="text-gray-600 text-sm">Share best practices and learn from international business experiences.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Technology Transfer</h4>
                    <p className="text-gray-600 text-sm">Access cutting-edge technologies and innovation from partner countries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Cultural Bridge</h4>
                    <p className="text-gray-600 text-sm">Navigate cultural differences with local expertise and guidance.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action Buttons */}
              
      </div>
    </div>
  );
};

export default BusinessCouncilsPage;