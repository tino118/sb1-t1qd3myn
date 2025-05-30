import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FaqPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      category: "Services Généraux",
      items: [
        {
          question: "Quels types de services informatiques proposez-vous?",
          answer: "Nous proposons une gamme complète de services informatiques incluant la réparation d'ordinateurs et de périphériques, la maintenance préventive, la configuration de réseaux, la sécurité informatique, la récupération de données, et plus encore. Consultez notre page Services pour plus de détails."
        },
        {
          question: "Intervenez-vous à domicile ou en entreprise?",
          answer: "Oui, nous offrons des services d'intervention à domicile et en entreprise dans toute la région de Cotonou et ses environs. Nous pouvons également fournir du support à distance pour certains problèmes qui ne nécessitent pas une présence physique."
        },
        {
          question: "Quels sont vos délais d'intervention?",
          answer: "Pour les demandes urgentes, nous nous efforçons d'intervenir dans les 24 à 48 heures. Pour les services planifiés comme la maintenance, nous fixons un rendez-vous à votre convenance. La durée de l'intervention dépend de la complexité du problème."
        }
      ]
    },
    {
      category: "Réparations & Maintenance",
      items: [
        {
          question: "Mon ordinateur est lent, pouvez-vous l'accélérer?",
          answer: "Oui, nous pouvons optimiser les performances de votre ordinateur en nettoyant les logiciels inutiles, en supprimant les virus et logiciels malveillants, en défragmentant le disque dur, ou en recommandant des mises à niveau matérielles si nécessaire (ajout de RAM, remplacement par un SSD, etc.)."
        },
        {
          question: "Pouvez-vous récupérer mes données perdues?",
          answer: "Dans de nombreux cas, oui. Nous disposons d'outils spécialisés pour la récupération de données sur différents types de supports (disques durs, SSD, clés USB, cartes mémoire). Le taux de réussite dépend de la nature du problème et de l'état du support de stockage."
        },
        {
          question: "Proposez-vous des contrats de maintenance pour les entreprises?",
          answer: "Oui, nous offrons des contrats de maintenance adaptés aux besoins spécifiques des entreprises. Ces contrats peuvent inclure des visites régulières, une surveillance proactive, des mises à jour planifiées et un support prioritaire en cas de problème."
        }
      ]
    },
    {
      category: "Réseaux & Sécurité",
      items: [
        {
          question: "Comment puis-je sécuriser mon réseau WiFi?",
          answer: "Pour sécuriser votre réseau WiFi, nous recommandons d'utiliser un mot de passe fort, d'activer le chiffrement WPA3 (ou au minimum WPA2), de modifier le nom de réseau par défaut (SSID), de désactiver la diffusion du SSID, de mettre à jour régulièrement le firmware de votre routeur, et d'activer le pare-feu. Nous pouvons configurer tout cela pour vous."
        },
        {
          question: "Mon WiFi ne couvre pas toute ma maison/mon bureau, que faire?",
          answer: "Plusieurs solutions existent: repositionner votre routeur, installer des répéteurs WiFi, des adaptateurs CPL avec WiFi, ou mettre en place un système mesh. Nous pouvons évaluer votre espace et recommander la meilleure solution pour une couverture optimale."
        },
        {
          question: "Comment protéger mon ordinateur contre les virus?",
          answer: "Une protection efficace contre les virus comprend l'installation d'un bon antivirus, des mises à jour régulières de votre système d'exploitation et de vos logiciels, l'utilisation d'un pare-feu, et l'adoption de bonnes pratiques de navigation (méfiance vis-à-vis des pièces jointes et des liens suspects). Nous pouvons mettre en place une solution de sécurité complète adaptée à vos besoins."
        }
      ]
    },
    {
      category: "Tarifs & Paiements",
      items: [
        {
          question: "Comment sont calculés vos tarifs?",
          answer: "Nos tarifs sont basés sur la nature du service, sa complexité et sa durée. Pour les interventions standard, nous proposons des forfaits. Pour les projets plus complexes, nous établissons un devis personnalisé après évaluation. Les déplacements sont facturés selon la distance."
        },
        {
          question: "Quels moyens de paiement acceptez-vous?",
          answer: "Nous acceptons les paiements en espèces, par virement bancaire, par Mobile Money, et par carte bancaire pour certains services. Des facilités de paiement peuvent être proposées pour les projets importants ou les contrats de maintenance."
        },
        {
          question: "Proposez-vous un service de garantie?",
          answer: "Oui, toutes nos réparations sont garanties pendant une période de 30 jours. Les pièces neuves installées bénéficient de la garantie du fabricant. Nos contrats de maintenance incluent également une garantie sur les services fournis."
        }
      ]
    }
  ];

  // Filter FAQs based on search term
  const filteredFaqs = searchTerm 
    ? faqs.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : faqs;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Foire Aux Questions</h1>
            <p className="text-lg text-primary-100 mb-8">
              Trouvez rapidement des réponses aux questions les plus fréquentes sur nos services informatiques.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary-300" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une question..."
                className="block w-full pl-10 pr-4 py-3 border-0 rounded-md focus:ring-2 focus:ring-primary-500 bg-white/10 backdrop-blur-sm text-white placeholder-primary-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    return (
                      <div 
                        key={itemIndex} 
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset bg-white hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-900">{item.question}</span>
                          {openItem === globalIndex ? (
                            <ChevronUp className="h-5 w-5 text-primary-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary-500" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {openItem === globalIndex && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-gray-700">{item.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">Aucun résultat trouvé pour "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-primary-600 hover:text-primary-800 font-medium"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour répondre à toutes vos questions et vous aider avec vos besoins informatiques.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors">
              Nous contacter
            </a>
            <a href="tel:+22900000000" className="bg-white text-primary-600 border border-primary-600 px-6 py-2 rounded-md hover:bg-primary-50 transition-colors">
              +229 XX XX XX XX
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;