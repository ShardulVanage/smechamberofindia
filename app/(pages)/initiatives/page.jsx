'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
const partner= [
  {
    id: 'bhumi-world',
    name: 'Bhumi World',
    logo: '/assets/strategic-partners/Bhumi-World.jpg',
    description: 'Sustainable development and environmental solutions',
    details: 'Bhumi World is dedicated to creating sustainable environmental solutions and promoting green initiatives across various industries. They focus on developing eco-friendly technologies and supporting communities in their transition to sustainable practices.',
    website: 'https://bhumiworld.com',
    category: 'Environment'
  },
  {
    id: 'comano',
    name: 'Comano',
    logo: '/assets/strategic-partners/comano.jpg',
    description: 'Technology and digital solutions provider',
    details: 'Comano specializes in cutting-edge technology solutions, digital transformation services, and innovative software development. They help businesses modernize their operations and achieve sustainable growth through advanced technological implementations.',
    website: 'https://comano.com',
    category: 'Technology'
  },
  {
    id: 'instafe',
    name: 'InstaFe',
    logo: '/assets/strategic-partners/InstaPe.jpg',
    description: 'Financial technology and lending services',
    details: 'InstaFe provides innovative financial technology solutions and instant lending services. They focus on making financial services more accessible and efficient through digital platforms and advanced algorithms.',
    website: 'https://instafe.com',
    category: 'Finance'
  },
  {
    id: 'loan-express',
    name: 'Loan Express',
    logo: '/assets/strategic-partners/LoanExpress.jpg',
    description: 'Quick loan and financial services',
    details: 'Loan Express offers fast and reliable lending solutions with streamlined approval processes. They specialize in providing quick access to credit for individuals and businesses with flexible repayment options.',
    website: 'https://loanexpress.com',
    category: 'Finance'
  },
  {
    id: 'mk-group',
    name: 'MK Group',
    logo: '/assets/strategic-partners/MK.jpg',
    description: 'Business consulting and management services',
    details: 'MK Group provides comprehensive business consulting, strategic planning, and management services. They help organizations optimize their operations, improve efficiency, and achieve their business objectives through expert guidance.',
    website: 'https://mkgroup.com',
    category: 'Consulting'
  },
  {
    id: 'sats-solutions',
    name: 'SATS Solutions',
    logo: '/assets/strategic-partners/sats.jpg',
    description: 'Satellite technology and communication services',
    details: 'SATS Solutions specializes in satellite technology, communication systems, and aerospace solutions. They provide advanced satellite services for various industries including telecommunications, broadcasting, and navigation.',
    website: 'https://sats.com',
    category: 'Technology'
  }
];

const LogoInitiative = () => {
  const [selectedPartner, setSelectedPartner] = useState(partner[0]);

  const handlePartnerSelect = (partner) => {
    setSelectedPartner(partner);
  };


  return (
  <div className="w-full max-w-7xl mx-auto p-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Our Patron Members and Programme Partners
        </h2>
        <p className="text-muted-foreground">
          Discover our network of trusted partners and their contributions to our mission
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Logo Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partner.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className={`
                    relative p-6 cursor-pointer transition-all duration-300 hover:shadow-lg
                    bg-showcase-logo-bg border-showcase-logo-border
                    ${selectedPartner.id === partner.id 
                      ? 'border-showcase-logo-selected border-2 shadow-lg scale-105' 
                      : 'hover:border-showcase-logo-selected hover:scale-102'
                    }
                  `}
                  onClick={() => handlePartnerSelect(partner)}
                >
                  <motion.div
                    className="flex flex-col items-center justify-center h-24"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-32 h-24 mb-2 flex items-center justify-center">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center text-foreground leading-tight">
                      {partner.name}
                    </h3>
                  </motion.div>

                  {selectedPartner.id === partner.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-showcase-logo-selected rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Information Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPartner.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-gradient-info text-showcase-info-foreground p-8 h-full min-h-[400px] flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {/* <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={selectedPartner.logo} 
                        alt={selectedPartner.name}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert"
                      />
                    </div> */}
                    <div>
                      <h3 className="text-xl font-bold">{selectedPartner.name}</h3>
                      <span className="text-sm opacity-80">{selectedPartner.category}</span>
                    </div>
                  </div>

                  <p className="text-base font-medium mb-4 opacity-90">
                    {selectedPartner.description}
                  </p>

                  <p className="text-sm leading-relaxed opacity-80 mb-6">
                    {selectedPartner.details}
                  </p>
                </motion.div>

                {selectedPartner.website && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      variant="secondary"
                      className="w-full bg-[#29688A] hover:bg-[#29688A]/90 text-white border-white/20"
                      onClick={() => window.open(selectedPartner.website, '_blank')}
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LogoInitiative;