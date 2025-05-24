'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select';
import AddressEntryComponent from './AddressEntry';
import { useAddressBook } from '@/contexts/AddressBookContext';

export default function AddressList() {
  const { entries, removeEntry, getEntriesByUsername, getEntriesByCity, getEntriesByState, searchByAddressAlias } = useAddressBook();
  const [filters, setFilters] = useState({
    username: '',
    city: undefined as string | undefined,
    state: undefined as string | undefined,
    addressAlias: ''
  });

  const uniqueCities = useMemo(() => {
    const cities = new Set(
      entries
        .map(entry => entry.localidade)
        .filter(Boolean) // Remove empty strings
    );
    return Array.from(cities).sort();
  }, [entries]);

  const uniqueStates = useMemo(() => {
    const states = new Set(
      entries
        .map(entry => entry.uf)
        .filter(Boolean) // Remove empty strings
    );
    return Array.from(states).sort();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    let result = [...entries];
    
    if (filters.username) {
      result = getEntriesByUsername(filters.username);
    }
    
    if (filters.city !== undefined) {
      result = getEntriesByCity(filters.city);
    }
    
    if (filters.state !== undefined) {
      result = getEntriesByState(filters.state);
    }
    
    if (filters.addressAlias) {
      result = searchByAddressAlias(filters.addressAlias);
    }
    
    return result;
  }, [entries, filters, getEntriesByUsername, getEntriesByCity, getEntriesByState, searchByAddressAlias]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Endereços Salvos</h2>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-medium text-gray-700 mb-4">Filtrar por:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Usuário
            </label>
            <Input
              id="username"
              type="text"
              value={filters.username}
              onChange={(e) => handleFilterChange('username', e.target.value)}
              placeholder="Buscar por nome"
              className="w-full text-black"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <Select 
              value={filters.city}
              onValueChange={(value: string) => handleFilterChange('city', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>Todas as cidades</SelectItem>
                {uniqueCities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              Estado (UF)
            </label>
            <Select 
              value={filters.state}
              onValueChange={(value: string) => handleFilterChange('state', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>Todos os estados</SelectItem>
                {uniqueStates.map(state => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="addressAlias" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Endereço
            </label>
            <Input
              id="addressAlias"
              type="text"
              value={filters.addressAlias}
              onChange={(e) => handleFilterChange('addressAlias', e.target.value)}
              placeholder="Buscar por endereço"
              className="w-full text-black"
            />
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        {filteredEntries.length} {filteredEntries.length === 1 ? 'endereço encontrado' : 'endereços encontrados'}
      </div>
      
      {/* Address entries grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <AddressEntryComponent 
              key={entry.id} 
              entry={entry} 
              onDelete={removeEntry}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">
              {entries.length === 0 
                ? 'Nenhum endereço cadastrado ainda.' 
                : 'Nenhum endereço encontrado com os filtros atuais.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
