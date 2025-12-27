import React, { createContext, useContext, useState, useEffect } from 'react';
import { Animal, Donation, Chat, Notification } from '../types';

interface DataContextType {
  animals: Animal[];
  addAnimal: (animal: Omit<Animal, 'id' | 'createdAt'>) => void;
  deleteAnimal: (id: string) => void;
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => void;
  deleteDonation: (id: string) => void;
  chats: Chat[];
  addChat: (chat: Omit<Chat, 'id'>) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_ANIMALS: Animal[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'perro',
    breed: 'Labrador Retriever',
    age: 2,
    ageUnit: 'años',
    reason: 'encontrado',
    urgent: true,
    hasChip: false,
    isDewormed: true,
    hasDisease: false,
    hasDisability: false,
    photos: ['https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=500'],
    videos: [],
    mainPhoto: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=500',
    ownerId: '1',
    ownerName: 'Administrador SAB',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Misi',
    type: 'gato',
    breed: 'Común Europeo',
    age: 6,
    ageUnit: 'meses',
    reason: 'crias',
    urgent: false,
    hasChip: false,
    isDewormed: true,
    hasDisease: false,
    hasDisability: false,
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'],
    videos: [],
    mainPhoto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500',
    ownerId: '1',
    ownerName: 'Administrador SAB',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Saco de pienso para perros',
    description: 'Saco de 15kg de pienso para perros adultos. Está abierto pero casi lleno.',
    category: 'alimentos',
    photos: [],
    location: 'Calle Mayor, 15',
    deliveryAvailable: false,
    pickupRequired: true,
    ownerId: '1',
    ownerName: 'Administrador SAB',
    createdAt: new Date().toISOString()
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animals, setAnimals] = useState<Animal[]>(() => {
    const saved = localStorage.getItem('sab_animals');
    return saved ? JSON.parse(saved) : INITIAL_ANIMALS;
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('sab_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = localStorage.getItem('sab_chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('sab_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sab_animals', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem('sab_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('sab_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('sab_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addAnimal = (animal: Omit<Animal, 'id' | 'createdAt'>) => {
    const newAnimal: Animal = {
      ...animal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setAnimals(prev => [newAnimal, ...prev]);

    addNotification({
      type: 'adoption',
      title: 'Nuevo animal en adopción',
      message: `${newAnimal.name} está buscando familia`,
      read: false
    });
  };

  const deleteAnimal = (id: string) => {
    setAnimals(prev => prev.filter(a => a.id !== id));
  };

  const addDonation = (donation: Omit<Donation, 'id' | 'createdAt'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDonations(prev => [newDonation, ...prev]);

    addNotification({
      type: 'donation',
      title: 'Nueva donación disponible',
      message: newDonation.title,
      read: false
    });
  };

  const deleteDonation = (id: string) => {
    setDonations(prev => prev.filter(d => d.id !== id));
  };

  const addChat = (chat: Omit<Chat, 'id'>) => {
    const newChat: Chat = {
      ...chat,
      id: Date.now().toString()
    };
    setChats(prev => [newChat, ...prev]);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DataContext.Provider
      value={{
        animals,
        addAnimal,
        deleteAnimal,
        donations,
        addDonation,
        deleteDonation,
        chats,
        addChat,
        notifications,
        addNotification,
        markNotificationAsRead,
        unreadCount
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
