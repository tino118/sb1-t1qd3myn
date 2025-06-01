import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquarePlus, 
  Clock, 
  BarChart3, 
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';

import Button from '../../components/ui/Button';

// Mock data for statistics
const mockStats = {
  totalTickets: 12,
  openTickets: 3,
  resolvedTickets: 8,
  closedTickets: 1,
  averageResponseTime: '2h 15min',
  satisfactionRate: '95%'
};

// Mock data for recent tickets
const mockRecentTickets = [
  {
    id: '1',
    subject: 'Problème de connexion WiFi',
    status: 'open',
    priority: 'high',
    lastUpdate: '2024-03-15T14:20:00',
    unreadMessages: 2
  },
  {
    id: '2',
    subject: 'Écran qui ne s\'allume pas',
    status: 'in_progress',
    priority: 'high',
    lastUpdate: '2024-03-15T09:15:00',
    unreadMessages: 0
  },
  {
    id: '3',
    subject: 'Installation Windows',
    status: 'resolved',
    status_changed_at: '2024-03-14T11:30:00',
    priority: 'medium',
    lastUpdate: '2024-03-14T11:30:00',
    unreadMessages: 0
  }
];

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'in_progress':
        return 'En cours';
      case 'resolved':
        return 'Résolu';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <Link to="/tickets/create">
          <Button
            variant="primary"
            leftIcon={<MessageSquarePlus className="h-4 w-4" />}
          >
            Nouveau ticket
          </Button>
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">État des tickets</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-2xl font-bold text-gray-900">{mockStats.totalTickets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">En cours</span>
              <span className="text-xl font-semibold text-blue-600">{mockStats.openTickets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Résolus</span>
              <span className="text-xl font-semibold text-green-600">{mockStats.resolvedTickets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fermés</span>
              <span className="text-xl font-semibold text-gray-600">{mockStats.closedTickets}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Temps de réponse</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {mockStats.averageResponseTime}
            </p>
            <p className="text-gray-600">Temps de réponse moyen</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Satisfaction</h3>
            <CheckCircle2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 mb-2">
              {mockStats.satisfactionRate}
            </p>
            <p className="text-gray-600">Taux de satisfaction</p>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Tickets récents</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {mockRecentTickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/tickets/${ticket.id}`}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{ticket.subject}</span>
                    {ticket.unreadMessages > 0 && (
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {ticket.unreadMessages} nouvelle{ticket.unreadMessages > 1 ? 's' : ''} réponse{ticket.unreadMessages > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                      {getStatusText(ticket.status)}
                    </span>
                    <span className="text-gray-500">
                      Dernière mise à jour : {new Date(ticket.lastUpdate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <MessageCircle className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Link
            to="/tickets"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center"
          >
            Voir tous les tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;