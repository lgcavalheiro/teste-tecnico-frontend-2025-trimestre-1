import { CEPResponse } from './cep';

export interface AddressEntry extends CEPResponse {
  id: string;
  username: string;
  addressAlias: string;
  cep: string;
}

export interface AddressBookContextType {
  entries: AddressEntry[];
  addEntry: (entry: Omit<AddressEntry, 'id'>) => void;
  updateEntry: (id: string, updates: Partial<Omit<AddressEntry, 'id' | 'cep'>>) => void;
  removeEntry: (id: string) => void;
  getEntry: (id: string) => AddressEntry | undefined;
  getEntriesByUsername: (username: string) => AddressEntry[];
  getEntriesByCity: (city: string) => AddressEntry[];
  getEntriesByState: (state: string) => AddressEntry[];
  searchByAddressAlias: (query: string) => AddressEntry[];
}

// LocalStorage key for persisting the address book
export const ADDRESS_BOOK_STORAGE_KEY = 'addressBook';

// Helper function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
