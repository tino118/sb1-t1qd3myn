import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquarePlus, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Search
} from 'lucide-react';

import Button from '../../components/ui/Button';

// Mock data for tickets
const mockTickets = [
  {
    id: '1',
    subject: 'Problème de connexion WiFi',
    category: 'network',
    priority: 'high',
    status: 'open',
    createdAt: '2024-03-15T10:30:00',
    lastUpdate: '2024-03-15T14:20:00',
    messages: 3
  },
  {
    id: '2',
    subject: 'Écran qui ne s\'allume pas',
    category: 'hardware',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-03-14T15:45:00',
    lastUpdate: '2024-03-15T09:15:00',
    messages: 5
  },
  {
    id: '3',
    subject: 'Installation Windows',
    category: 'software',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-03-13T09:00:00',
    lastUpdate: '2024-03-14T11:30:00',
    messages: 4
  }
];

const TicketsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter tickets based on search term and status
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Mes tickets</h1>
        <Link to="/tickets/create">
          <Button
            variant="primary"
            leftIcon={<MessageSquarePlus className="h-4 w-4" />}
          >
            Nouveau ticket
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher un ticket..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="open">Ouvert</option>
                <option value="in_progress">En cours</option>
                <option value="resolved">Résolu</option>
                <option value="closed">Fermé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="divide-y divide-gray-200">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <Link 
                      to={`/tickets/${ticket.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-primary-600"
                    >
                      {ticket.subject}
                    </Link>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeClass(ticket.priority)}`}>
                        {ticket.priority === 'high' ? 'Prioritaire' : ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(ticket.lastUpdate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {ticket.messages} message{ticket.messages > 1 ? 's' : ''}
                    </span>
                    {ticket.status === 'open' && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <AlertCircle className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun ticket trouvé
              </h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? "Aucun ticket ne correspond à votre recherche"
                  : "Vous n'avez pas encore créé de ticket"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;