'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AddressEntry, AddressBookContextType, ADDRESS_BOOK_STORAGE_KEY, generateId } from '@/types/addressBook';

// Create the context with a default value
const AddressBookContext = createContext<AddressBookContextType | undefined>(undefined);

export const AddressBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<AddressEntry[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load entries from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedEntries = localStorage.getItem(ADDRESS_BOOK_STORAGE_KEY);
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.error('Failed to load address book from localStorage:', error);
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
        console.error('Failed to save address book to localStorage:', error);
      }
    }
  }, [entries, isInitialized]);

  const addEntry = (entry: Omit<AddressEntry, 'id'>) => {
    if (!entry.username || !entry.addressAlias || !entry.cep) {
      throw new Error('All fields are required');
    }

    const newEntry: AddressEntry = {
      ...entry,
      id: generateId(),
    };

    setEntries(prevEntries => [...prevEntries, newEntry]);
  };

  const updateEntry = (id: string, updates: Partial<Omit<AddressEntry, 'id' | 'cep'>>) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const removeEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const getEntry = (id: string) => {
    return entries.find(entry => entry.id === id);
  };

  const getEntriesByUsername = (username: string) => {
    return entries.filter(entry =>
      entry.username.toLowerCase().includes(username.toLowerCase())
    );
  };

  const getEntriesByCity = (city: string) => {
    return entries.filter(entry =>
      entry.localidade.toLowerCase().includes(city.toLowerCase())
    );
  };

  const getEntriesByState = (state: string) => {
    return entries.filter(entry =>
      entry.uf.toLowerCase() === state.toLowerCase()
    );
  };

  const searchByAddressAlias = (query: string) => {
    return entries.filter(entry =>
      entry.addressAlias.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value = {
    entries,
    addEntry,
    updateEntry,
    removeEntry,
    getEntry,
    getEntriesByUsername,
    getEntriesByCity,
    getEntriesByState,
    searchByAddressAlias,
  };

  return (
    <AddressBookContext.Provider value={value}>
      {isInitialized ? children : null}
    </AddressBookContext.Provider>
  );
};

// Custom hook to use the address book context
export const useAddressBook = (): AddressBookContextType => {
  const context = useContext(AddressBookContext);
  if (context === undefined) {
    throw new Error('useAddressBook must be used within an AddressBookProvider');
  }
  return context;
};
