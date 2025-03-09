'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as string | null }
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

    try {
      // Simulation d'une API call - remplacez par votre API réelle
      // const res = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulons une réponse positive pour l'exemple
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = { ok: true };

      if (res.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Merci! Votre message a été envoyé avec succès." }
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Un problème est survenu. Veuillez réessayer." }
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t('title', { defaultValue: 'Contactez-nous' })}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Informations de contact */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {t('info', { defaultValue: 'Nos coordonnées' })}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">
                {t('address', { defaultValue: 'Adresse' })}:
              </h3>
              <p className="text-gray-600">123 Rue Principale, 75000 Paris</p>
            </div>
            
            <div>
              <h3 className="font-medium">
                {t('email', { defaultValue: 'Email' })}:
              </h3>
              <p className="text-gray-600">contact@example.com</p>
            </div>
            
            <div>
              <h3 className="font-medium">
                {t('phone', { defaultValue: 'Téléphone' })}:
              </h3>
              <p className="text-gray-600">+33 1 23 45 67 89</p>
            </div>
            
            <div>
              <h3 className="font-medium">
                {t('hours', { defaultValue: 'Heures d\'ouverture' })}:
              </h3>
              <p className="text-gray-600">Lun-Ven: 9h-18h</p>
            </div>
          </div>
        </div>
        
        {/* Formulaire de contact */}
        <div className="w-full md:w-2/3">
          {status.submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
              <p className="font-medium">{status.info.msg}</p>
              <button 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => setStatus({ submitted: false, submitting: false, info: { error: false, msg: null } })}
              >
                {t('newMessage', { defaultValue: 'Envoyer un nouveau message' })}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  {t('nameLabel', { defaultValue: 'Nom' })}:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  {t('emailLabel', { defaultValue: 'Email' })}:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block font-medium mb-1">
                  {t('subjectLabel', { defaultValue: 'Sujet' })}:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-medium mb-1">
                  {t('messageLabel', { defaultValue: 'Message' })}:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required                 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              {status.info.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  <p>{status.info.msg}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {status.submitting 
                  ? t('sending', { defaultValue: 'Envoi en cours...' })
                  : t('send', { defaultValue: 'Envoyer le message' })
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}