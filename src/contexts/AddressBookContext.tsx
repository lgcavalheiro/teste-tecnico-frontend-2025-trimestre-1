'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AddressEntry, AddressBookContextType, ADDRESS_BOOK_STORAGE_KEY } from '@/types/addressBook';
import { generateId } from '@/lib/utils';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';

const AddressBookContext = createContext<AddressBookContextType | undefined>(undefined);

const successToastOpts = {
  icon: <CircleCheck />,
  classNames: {
    icon: 'text-success pr-6',
    content: 'text-success',
  },
}

export const AddressBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<AddressEntry[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedEntries = localStorage.getItem(ADDRESS_BOOK_STORAGE_KEY);
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.error('Falha ao carregar agenda de endereços:', error);
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem(ADDRESS_BOOK_STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.error('Falha ao salvar agenda de endereços:', error);
      }
    }
  }, [entries, isInitialized]);

  const addEntry = (entry: Omit<AddressEntry, 'id'>) => {
    if (!entry.username || !entry.addressAlias || !entry.cep) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const newEntry: AddressEntry = {
      ...entry,
      id: generateId(),
    };

    setEntries(prevEntries => [...prevEntries, newEntry]);

    toast.success("Endereço adicionado com sucesso!", successToastOpts);
  };

  const updateEntry = (id: string, updates: Partial<Omit<AddressEntry, 'id' | 'cep'>>) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );

    toast.success("Endereço atualizado com sucesso!", successToastOpts);
  };

  const removeEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));

    toast.success("Endereço removido com sucesso!", successToastOpts);
  };

  const getEntriesByUsername = (username: string, entries: AddressEntry[]) => {
    return entries.filter(entry =>
      entry.username.toLowerCase().includes(username.toLowerCase())
    );
  };

  const getEntriesByCity = (city: string, entries: AddressEntry[]) => {
    return entries.filter(entry =>
      entry.localidade.toLowerCase().includes(city.toLowerCase())
    );
  };

  const getEntriesByState = (state: string, entries: AddressEntry[]) => {
    return entries.filter(entry =>
      entry.uf.toLowerCase() === state.toLowerCase()
    );
  };

  const searchByAddressAlias = (query: string, entries: AddressEntry[]) => {
    return entries.filter(entry =>
      entry.addressAlias.toLowerCase().includes(query.toLowerCase())
    );
  };

  const [filters, setFilters] = useState({
    username: '',
    city: 'all',
    state: 'all',
    addressAlias: ''
  });

  const uniqueCities = React.useMemo(() => {
    const cities = new Set(
      entries
        .map(entry => entry.localidade)
        .filter(Boolean)
    );
    return Array.from(cities).sort();
  }, [entries]);

  const uniqueStates = React.useMemo(() => {
    const states = new Set(
      entries
        .map(entry => entry.uf)
        .filter(Boolean)
    );
    return Array.from(states).sort();
  }, [entries]);

  const filteredEntries = React.useMemo(() => {
    let result = [...entries];

    if (filters.username) {
      result = getEntriesByUsername(filters.username, result);
    }
    if (filters.city !== 'all') {
      result = getEntriesByCity(filters.city, result);
    }
    if (filters.state !== 'all') {
      result = getEntriesByState(filters.state, result);
    }
    if (filters.addressAlias) {
      result = searchByAddressAlias(filters.addressAlias, result);
    }
    return result;
  }, [entries, filters]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const value = {
    entries: filteredEntries ?? entries,
    addEntry,
    updateEntry,
    removeEntry,
    filters,
    handleFilterChange,
    uniqueCities,
    uniqueStates,
  };

  return (
    <AddressBookContext.Provider value={value}>
      {isInitialized ? children : null}
    </AddressBookContext.Provider>
  );
};

export const useAddressBook = (): AddressBookContextType => {
  const context = useContext(AddressBookContext);
  if (context === undefined) {
    throw new Error('useAddressBook deve ser usado dentro de um AddressBookProvider');
  }
  return context;
};
