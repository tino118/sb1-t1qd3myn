import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MessageSquare, AlertCircle } from 'lucide-react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface TicketFormData {
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const CreateTicketPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<TicketFormData>();
  
  const onSubmit = async (data: TicketFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to create the ticket
      console.log('Creating ticket:', { ...data, userId: user?.id });
      
      navigate('/tickets');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création du ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Créer un nouveau ticket</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md text-sm flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Sujet"
              type="text"
              id="subject"
              error={errors.subject?.message}
              {...register('subject', { 
                required: 'Le sujet est requis',
                minLength: {
                  value: 5,
                  message: 'Le sujet doit contenir au moins 5 caractères'
                }
              })}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300`}
                {...register('category', { required: 'La catégorie est requise' })}
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="hardware">Problème matériel</option>
                <option value="software">Problème logiciel</option>
                <option value="network">Problème réseau</option>
                <option value="other">Autre</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priorité
              </label>
              <select
                className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300`}
                {...register('priority', { required: 'La priorité est requise' })}
              >
                <option value="">Sélectionnez une priorité</option>
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 min-h-[150px]`}
                {...register('description', { 
                  required: 'La description est requise',
                  minLength: {
                    value: 20,
                    message: 'La description doit contenir au moins 20 caractères'
                  }
                })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/tickets')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                leftIcon={<MessageSquare className="h-4 w-4" />}
              >
                Créer le ticket
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketPage;