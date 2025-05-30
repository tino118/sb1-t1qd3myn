import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-primary-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" x2="20" y1="19" y2="19"></line>
                </svg>
              </div>
              <span className="font-heading font-bold text-xl">Support IT Bénin</span>
            </div>
            <p className="text-gray-400 mb-4">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" ariaLabel="Facebook" />
              <SocialLink icon={<Twitter size={18} />} href="#" ariaLabel="Twitter" />
              <SocialLink icon={<Instagram size={18} />} href="#" ariaLabel="Instagram" />
              <SocialLink icon={<Linkedin size={18} />} href="#" ariaLabel="LinkedIn" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              <FooterLink to="/">{t('footer.links.home')}</FooterLink>
              <FooterLink to="/services">{t('footer.links.services')}</FooterLink>
              <FooterLink to="/contact">{t('footer.links.contact')}</FooterLink>
              <FooterLink to="/faq">{t('footer.links.faq')}</FooterLink>
              <FooterLink to="/terms">{t('footer.links.terms')}</FooterLink>
              <FooterLink to="/privacy">{t('footer.links.privacy')}</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary-500 mt-1 mr-3" />
                <span>{t('footer.contact.address')}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary-500 mr-3" />
                <span>{t('footer.contact.phone')}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary-500 mr-3" />
                <span>{t('footer.contact.email')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Restez informé de nos dernières offres et actualités.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>{t('footer.copyright').replace('2025', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-primary-500 transition-colors">
      {children}
    </Link>
  </li>
);

const SocialLink: React.FC<{ icon: React.ReactNode, href: string, ariaLabel: string }> = ({ 
  icon, 
  href, 
  ariaLabel 
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-primary-500 hover:bg-gray-700 transition-colors"
  >
    {icon}
  </a>
);

export default Footer;