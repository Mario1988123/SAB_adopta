export interface User {
  id: string;
  email: string;
  name: string;
  dni: string;
  photo?: string;
  phone?: string;
}

export type AdoptionReason = 'encontrado' | 'crias' | 'no_puedo_mantener' | 'otros';
export type AnimalType = 'perro' | 'gato';
export type AgeUnit = 'años' | 'meses';

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  breed: string;
  age: number;
  ageUnit: AgeUnit;
  reason: AdoptionReason;
  maxAdoptionDate?: string;
  urgent: boolean;
  hasChip: boolean;
  isDewormed: boolean;
  hasDisease: boolean;
  diseaseDescription?: string;
  hasDisability: boolean;
  disabilityDescription?: string;
  photos: string[];
  videos: string[];
  mainPhoto: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface Donation {
  id: string;
  title: string;
  description: string;
  category: 'alimentos' | 'mantas' | 'juguetes' | 'accesorios' | 'otros';
  photos: string[];
  location: string;
  deliveryAvailable: boolean;
  pickupRequired: boolean;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  animalId?: string;
  animalName?: string;
  donationId?: string;
  donationTitle?: string;
  messages: Message[];
  lastMessage?: Message;
}

export interface Notification {
  id: string;
  type: 'message' | 'adoption' | 'donation' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface SearchFilters {
  type?: AnimalType;
  breed?: string;
  minAge?: number;
  maxAge?: number;
  ageUnit?: AgeUnit;
  urgent?: boolean;
}

// Razas más comunes
export const DOG_BREEDS = [
  'Mezcla',
  'Otros',
  'Labrador Retriever',
  'Pastor Alemán',
  'Golden Retriever',
  'Bulldog Francés',
  'Bulldog',
  'Beagle',
  'Caniche/Poodle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund/Teckel',
  'Pomerania',
  'Shih Tzu',
  'Chihuahua',
  'Husky Siberiano',
  'Doberman',
  'Gran Danés',
  'Schnauzer Miniatura',
  'Cavalier King Charles Spaniel',
  'Bichón Maltés',
  'Border Collie',
  'Cocker Spaniel',
  'Galgo Español',
  'Mastín Español',
  'Podenco',
  'Setter Irlandés',
  'Jack Russell Terrier',
  'Boston Terrier',
  'Pug/Carlino',
  'Akita',
  'Basset Hound',
  'Bichón Frisé',
  'Bull Terrier',
  'Chow Chow',
  'Dálmata',
  'English Springer Spaniel',
  'Fox Terrier',
  'Galgo Afgano',
  'Maltipoo',
  'Pastor Belga',
  'Pitbull',
  'Pointer',
  'San Bernardo',
  'Shar Pei',
  'Staffordshire Bull Terrier',
  'Terranova',
  'Weimaraner',
  'West Highland White Terrier'
].sort();

export const CAT_BREEDS = [
  'Mezcla',
  'Otros',
  'Común Europeo',
  'Persa',
  'Siamés',
  'Maine Coon',
  'Ragdoll',
  'British Shorthair',
  'Bengalí',
  'Abisinio',
  'Sphynx',
  'Scottish Fold',
  'Birmano',
  'Oriental',
  'Angora Turco',
  'Bobtail Japonés',
  'Bosque de Noruega',
  'Burmés',
  'Chartreux',
  'Cornish Rex',
  'Devon Rex',
  'Exótico de Pelo Corto',
  'Himalayo',
  'Korat',
  'LaPerm',
  'Manx',
  'Munchkin',
  'Azul Ruso',
  'Sagrado de Birmania',
  'Savannah',
  'Selkirk Rex',
  'Somalí',
  'Tonkinés',
  'Van Turco',
  'American Curl',
  'American Shorthair',
  'American Wirehair',
  'Balinés',
  'Bombay',
  'Burmilla',
  'Cymric',
  'Egyptian Mau',
  'Havana Brown',
  'Javanés',
  'Khao Manee',
  'Ocicat',
  'Pixie-Bob',
  'Ragamuffin',
  'Singapura',
  'Snowshoe'
].sort();
