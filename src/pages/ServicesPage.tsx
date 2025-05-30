import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Cpu, Settings, WifiIcon, Shield, Database, Monitor, HardDrive, Code } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const services = [
    {
      icon: <Cpu />,
      title: t('home.services.repair.title'),
      description: t('home.services.repair.description'),
      details: [
        "Diagnostic et réparation d'ordinateurs et laptops",
        "Récupération de données",
        "Réparation d'écrans et composants",
        "Remplacement de batteries",
        "Nettoyage de virus et logiciels malveillants"
      ]
    },
    {
      icon: <Settings />,
      title: t('home.services.maintenance.title'),
      description: t('home.services.maintenance.description'),
      details: [
        "Entretien préventif du matériel",
        "Mise à jour des logiciels et systèmes d'exploitation",
        "Optimisation des performances",
        "Nettoyage physique des équipements",
        "Maintenance planifiée régulière"
      ]
    },
    {
      icon: <WifiIcon />,
      title: t('home.services.network.title'),
      description: t('home.services.network.description'),
      details: [
        "Installation et configuration de réseaux WiFi",
        "Configuration de routeurs et modems",
        "Dépannage de connexions réseau",
        "Installation de réseaux filaires",
        "Solutions VPN pour le travail à distance"
      ]
    },
    {
      icon: <Shield />,
      title: t('home.services.security.title'),
      description: t('home.services.security.description'),
      details: [
        "Installation d'antivirus et pare-feu",
        "Protection des données personnelles",
        "Sécurisation des réseaux WiFi",
        "Audits de sécurité",
        "Récupération après piratage"
      ]
    },
    {
      icon: <Database />,
      title: "Stockage & Sauvegarde",
      description: "Solutions de stockage et systèmes de sauvegarde fiables pour vos données",
      details: [
        "Configuration de solutions de stockage en réseau (NAS)",
        "Mise en place de sauvegardes automatisées",
        "Récupération de données perdues",
        "Solutions de stockage cloud",
        "Stratégies de sauvegarde personnalisées"
      ]
    },
    {
      icon: <Monitor />,
      title: "Support Bureautique",
      description: "Assistance pour tous vos logiciels de bureautique et problèmes informatiques quotidiens",
      details: [
        "Aide à l'utilisation des suites bureautiques",
        "Configuration d'emails et agendas",
        "Installation et configuration d'imprimantes",
        "Formation sur les outils numériques",
        "Support à distance"
      ]
    },
    {
      icon: <HardDrive />,
      title: "Mise à Niveau Matérielle",
      description: "Améliorez les performances de vos équipements existants",
      details: [
        "Augmentation de la mémoire RAM",
        "Installation de disques SSD",
        "Remplacement de composants défectueux",
        "Mise à niveau de processeurs",
        "Conseils d'achat personnalisés"
      ]
    },
    {
      icon: <Code />,
      title: "Services Web",
      description: "Solutions web pour votre présence en ligne",
      details: [
        "Création de sites web professionnels",
        "Maintenance de sites existants",
        "Configuration d'emails professionnels",
        "Référencement (SEO) basique",
        "Hébergement web sécurisé"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Services Informatiques</h1>
            <p className="text-lg text-primary-100">
              Des solutions complètes pour tous vos besoins informatiques, personnelles et professionnelles.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                details={service.details}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'une assistance informatique?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins spécifiques. Notre équipe d'experts est là pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact" className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors">
              Nous contacter
            </a>
            <a href="tel:+22900000000" className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors">
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  variants?: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, details, variants }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full flex flex-col"
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="inline-flex items-center justify-center bg-primary-50 p-3 rounded-full text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mt-auto">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Ce que nous offrons:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServicesPage;