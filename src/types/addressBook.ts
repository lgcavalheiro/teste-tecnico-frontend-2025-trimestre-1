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
  filters: {
    username: string;
    city: string;
    state: string;
    addressAlias: string;
  };
  handleFilterChange: (field: keyof AddressBookContextType['filters'], value: string) => void;
  uniqueCities: string[];
  uniqueStates: string[];
}

export const ADDRESS_BOOK_STORAGE_KEY = 'addressBook';
