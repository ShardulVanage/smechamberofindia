import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Target, Globe, TrendingUp, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SMEManufacturingMission = () => {
  const objectives = [
    "Sustainable & Profitable Growth",
    "Excellence in Manufacturing", 
    "Ease and Cost of Doing Business",
    "Quality Assurance & Productivity",
    "Identify Patented & Advanced Technologies",
    "Industrial Automation & Expansion",
    "Schemes, Benefits & Incentives",
    "Policy Reforms and Speedy Implementation",
    "Innovation & Invention",
    "Entrepreneurship & Employment Generation",
    "Explore Global Supply Chain Opportunities",
    "Contract Manufacturing & Joint Ventures"
  ];

  const supportingOrgs = [
    { name: "SME Chamber of India", desc: "Leading SME Organization" },
    { name: "Maharashtra Industry Development Association", desc: "State Industry Body" },
    { name: "PTAJ", desc: "Manufacturing Excellence Partner" },
    { name: "Gujarat Industry Development Association", desc: "Industrial Growth Partner" },
    { name: "SME Technology Development Council", desc: "Technology Innovation Hub" }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - A4 Poster */}
          <div className="flex justify-center">
               <Link href={'https://smemanufacturingmission.com/'}>
            <Card className="w-full max-w-4xl shadow-lg bg-white">
              <Image src="/assets/initiative/nsmem.jpg" alt="SME Manufacturing Mission Poster" className='w-auto' width={600} height={900}/>
            </Card>
            </Link>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-4xl font-bold text-[#29688A] mb-4">National SME Manufacturing Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A comprehensive initiative to transform India into a global manufacturing powerhouse through 
                strategic SME integration and international partnerships.
              </p>
            </div>

            {/* Mission Overview */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-[#29688A]" />
                  <h3 className="text-2xl font-bold text-gray-800">Mission Overview</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The National SME Manufacturing Mission integrates SMEs and mid-corporates from manufacturing 
                  and allied sectors to establish strategic alliances with Indian and foreign enterprises. 
                  This initiative focuses on contract manufacturing, technology transfers, and joint ventures 
                  as part of Global Capability Centers (GCC).
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#29688A]">
                  <p className="text-gray-800 font-medium">
                    "Making India a manufacturing hub of the world, enhancing exports up to 60% and marching toward 'Viksit Bharat'"
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Vision inspired by Hon'ble Prime Minister Shri Narendra Modi</p>
                </div>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-[#29688A]" />
                  <h3 className="text-2xl font-bold text-gray-800">Key Focus Areas</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-800 font-medium text-sm">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-8 h-8 text-[#29688A]" />
                  <h3 className="text-2xl font-bold text-gray-800">Strategic Benefits</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Globe className="w-6 h-6 text-[#29688A] mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Global Integration</h4>
                        <p className="text-gray-600 text-sm">Connect with international markets and global supply chains</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-6 h-6 text-[#29688A] mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Technology Transfer</h4>
                        <p className="text-gray-600 text-sm">Access advanced technologies and manufacturing processes</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Building2 className="w-6 h-6 text-[#29688A] mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Infrastructure Development</h4>
                        <p className="text-gray-600 text-sm">Build robust manufacturing capabilities and infrastructure</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-6 h-6 text-[#29688A] mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Employment Generation</h4>
                        <p className="text-gray-600 text-sm">Create sustainable employment opportunities across sectors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={'https://smemanufacturingmission.com/'}>
                <Button 
                  size="lg" 
                  className="bg-[#29688A] hover:bg-[#1e4d68] text-white px-8 py-3 text-lg font-medium"
                  >
                  Join the Mission
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                    </Link>
                {/* <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white px-8 py-3 text-lg font-medium"
                >
                  Learn More
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMEManufacturingMission;