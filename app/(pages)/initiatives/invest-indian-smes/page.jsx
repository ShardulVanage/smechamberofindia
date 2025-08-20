import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Globe, Building2, Target, PieChart, Handshake, ArrowRight, DollarSign, Factory, Briefcase, Mail, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const InvestInIndianSMEs = () => {
  const investmentAreas = [
    "Finance & Investment Solutions",
    "Private Equity & Venture Capital",
    "External Commercial Borrowings",
    "Strategic Investment Partners",
    "Business Growth & Expansion",
    "Diversification Opportunities",
    "Joint Ventures & Partnerships",
    "Technology Transfers",
    "Advanced & Patented Technologies",
    "Contract Manufacturing",
    "Industrial Automation",
    "Advanced Capital Goods",
    "New Manufacturing Units",
    "Industrial Land & Premises",
    "Manufacturing Unit Acquisitions",
    "Quality Productivity Enhancement",
    "Innovation Commercialization",
    "National & International Branding",
    "Global Manufacturing Setup"
  ];

  const keyStats = [
    { icon: PieChart, value: "30%", label: "GDP Contribution", desc: "SMEs contribute over 30% to India's GDP" },
    { icon: Users, value: "110M+", label: "Employment", desc: "More than 110 million people employed" },
    { icon: TrendingUp, value: "Fast Growing", label: "Economy", desc: "India's rapidly expanding economic landscape" },
    { icon: Globe, value: "Global", label: "Opportunities", desc: "Untapped potential in international markets" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#29688A] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Poster Style */}
            <Card className="bg-white text-gray-800 shadow-xl">
              <CardContent className="p-10">
                  <Link href={'https://investinindiansme.com/'}>
              <Image src="/assets/initiative/Top-SMEs.jpg" alt="SME Manufacturing Mission Poster" className='w-auto' width={600} height={900}/>
            </Link>
              </CardContent>
            </Card>

            {/* Right Side - Header Content */}
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-6">Invest in the Future of Indian Manufacturing</h1>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                Join the SME revolution and be part of India's economic transformation. 
                Access untapped investment opportunities with strong potential for growth, innovation, and impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span>GDP Backbone</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span>110M+ Employment</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span>Growing Economy</span>
                </div>
              </div>
              <Link href={'https://investinindiansme.com/'}>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-[#29688A] hover:bg-gray-100 px-8 py-3 text-lg font-medium  ">
                Invest Know
                    <ArrowRight/>
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* SME Overview */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-8 h-8 text-[#29688A]" />
              <h2 className="text-3xl font-bold text-[#29688A]">The SME Opportunity in India</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Small and Medium Enterprises (SMEs) are the backbone of India's economy, contributing over 30% to the GDP 
                  and employing more than 110 million people. Despite their significant role, Indian SMEs face persistent 
                  challenges in accessing finance, technology, skilled labor, and global markets.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With India's fast-growing economy, a favorable policy environment and a young entrepreneurial ecosystem, 
                  SMEs present an untapped investment opportunity with strong potential for growth, innovation and impact.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#29688A] mb-4">Why Invest Now?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-800">Favorable policy environment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-800">Young entrepreneurial ecosystem</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-800">Fast-growing economy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-800">Strong growth potential</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Initiatives */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Handshake className="w-8 h-8 text-[#29688A]" />
              <h2 className="text-3xl font-bold text-[#29688A]">Our Investment Initiatives</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              SME Chamber of India and SME Investment Promotion Council have taken initiatives to channelize finance, 
              investment, private equity, venture capital, external commercial borrowings and strategic investment partners 
              for enhancement of business growth and expansion across multiple domains.
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
              {investmentAreas.map((area, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="w-2 h-2 bg-[#29688A] rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-800">{area}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-[#29688A]" />
              <h2 className="text-3xl font-bold text-[#29688A]">Our Mission</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-l-4 border-[#29688A]">
              <p className="text-gray-800 font-medium text-lg leading-relaxed">
                "To catalyze sustainable growth and innovation in Indian SMEs through targeted investment strategies, 
                ecosystem support and policy engagement—thereby unlocking their full potential and contributing to 
                inclusive economic development."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Investment Process */}
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Briefcase className="w-8 h-8 text-[#29688A]" />
              <h2 className="text-3xl font-bold text-[#29688A]">Investment Process</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">For Investors</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  SME Chamber of India has identified potential and emerging SMEs & manufacturing units to avail 
                  investment services and connect with interested investors. We invite investors to take advantage 
                  of this opportunity.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-gray-800 font-medium mb-2">Submit your investment interest to:</p>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-[#29688A]" />
                    <a href="mailto:secretariat@smechamber.com" className="text-[#29688A] font-semibold hover:underline">
                      secretariat@smechamber.com
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Criteria</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">Specify your sector interest and investment focus areas</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">Define your investment expectations and requirements</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">Provide your terms & conditions for partnership</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">All proposals subject to SME Chamber's evaluation criteria</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      
      </div>
    </div>
  );
};

export default InvestInIndianSMEs;