import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Clock, 
  Send,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

// Mock ticket data
const mockTicket = {
  id: '1',
  subject: 'Problème de connexion WiFi',
  category: 'network',
  priority: 'high',
  status: 'open',
  createdAt: '2024-03-15T10:30:00',
  lastUpdate: '2024-03-15T14:20:00',
  description: 'Je n\'arrive pas à me connecter au réseau WiFi depuis ce matin. J\'ai déjà essayé de redémarrer le routeur mais ça ne fonctionne toujours pas.',
  messages: [
    {
      id: 1,
      userId: 'user-1',
      userName: 'Client Test',
      content: 'Je n\'arrive pas à me connecter au réseau WiFi depuis ce matin. J\'ai déjà essayé de redémarrer le routeur mais ça ne fonctionne toujours pas.',
      timestamp: '2024-03-15T10:30:00',
      isStaff: false
    },
    {
      id: 2,
      userId: 'staff-1',
      userName: 'Support Technique',
      content: 'Bonjour, pouvez-vous me dire si d\'autres appareils peuvent se connecter au réseau WiFi ? Avez-vous vérifié si le problème est spécifique à un seul appareil ?',
      timestamp: '2024-03-15T11:15:00',
      isStaff: true
    },
    {
      id: 3,
      userId: 'user-1',
      userName: 'Client Test',
      content: 'J\'ai vérifié avec mon téléphone et il ne se connecte pas non plus. Je pense que le problème vient du routeur.',
      timestamp: '2024-03-15T14:20:00',
      isStaff: false
    }
  ]
};

const TicketDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be an API call to add the message
    console.log('Sending message:', newMessage);
    
    setNewMessage('');
    setIsLoading(false);
  };

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/tickets')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux tickets
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {mockTicket.subject}
                </h1>
                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(mockTicket.status)}`}>
                    {getStatusText(mockTicket.status)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Créé le {new Date(mockTicket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {mockTicket.status === 'open' && (
                  <Button
                    variant="outline"
                    leftIcon={<CheckCircle2 className="h-4 w-4" />}
                    onClick={() => console.log('Mark as resolved')}
                  >
                    Marquer comme résolu
                  </Button>
                )}
                <Button
                  variant="outline"
                  leftIcon={<XCircle className="h-4 w-4" />}
                  onClick={() => console.log('Close ticket')}
                >
                  Fermer le ticket
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {mockTicket.messages.map((message) => (
              <div key={message.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.isStaff ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.userName.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {message.userName}
                        {message.isStaff && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            Staff
                          </span>
                        )}
                      </p>
                      <span className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="mb-4">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                leftIcon={<Send className="h-4 w-4" />}
                disabled={!newMessage.trim()}
              >
                Envoyer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;