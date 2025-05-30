import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  WifiIcon, 
  Settings, 
  Clock, 
  ThumbsUp, 
  DollarSign, 
  Award 
} from 'lucide-react';

import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.hero.title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('home.hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/contact">
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="shadow-lg hover:shadow-xl"
                >
                  {t('home.hero.cta')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ServiceCard 
              icon={<Cpu />} 
              title={t('home.services.repair.title')} 
              description={t('home.services.repair.description')}
              variants={itemVariants}
            />
            <ServiceCard 
              icon={<Settings />} 
              title={t('home.services.maintenance.title')} 
              description={t('home.services.maintenance.description')}
              variants={itemVariants}
            />
            <ServiceCard 
              icon={<WifiIcon />} 
              title={t('home.services.network.title')} 
              description={t('home.services.network.description')}
              variants={itemVariants}
            />
            <ServiceCard 
              icon={<Shield />} 
              title={t('home.services.security.title')} 
              description={t('home.services.security.description')}
              variants={itemVariants}
            />
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline">
                Voir tous nos services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.about.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.about.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Award className="text-primary-600" />} 
              title={t('home.about.points.experience')} 
            />
            <FeatureCard 
              icon={<Clock className="text-primary-600" />} 
              title={t('home.about.points.support')} 
            />
            <FeatureCard 
              icon={<DollarSign className="text-primary-600" />} 
              title={t('home.about.points.price')} 
            />
            <FeatureCard 
              icon={<ThumbsUp className="text-primary-600" />} 
              title={t('home.about.points.quality')} 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Besoin d'aide informatique ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe de techniciens qualifiés est prête à vous aider avec tous vos problèmes informatiques.
          </p>
          <Link to="/contact">
            <Button 
              variant="primary"
              size="lg"
              className="bg-white text-accent-600 hover:bg-gray-100"
            >
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants?: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, variants }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 text-center"
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="inline-flex items-center justify-center bg-primary-50 p-3 rounded-full text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm flex items-center">
      <div className="mr-4 text-3xl">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  );
};

export default HomePage;