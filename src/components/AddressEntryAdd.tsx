'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useAddressBook } from '@/contexts/AddressBookContext';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { CEPResponse } from '@/types/cep';
import { toast } from 'sonner';
import { CircleAlert } from 'lucide-react';

export default function AddressEntryAdd() {
  const [cep, setCep] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addEntry } = useAddressBook();

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      setCep(value);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/cep/${cep}`);
      
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }
      
      const data: CEPResponse = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
      
      addEntry({
        username: name,
        addressAlias: data.logradouro || 'Meu endereço',
        cep,
        logradouro: data.logradouro,
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || '',
        ibge: data.ibge || '',
        gia: data.gia || '',
        ddd: data.ddd || '',
        siafi: data.siafi || ''
      });
      
      setCep('');
      setName('');
      
    } catch (err) {
      toast.error(
        'Erro ao buscar CEP:', 
        { 
          description: <>
            <p>{(err as Error).message}</p>
            <p>Por favor, verifique o número e tente novamente.</p>
          </>,
          icon: <CircleAlert />,
          classNames: {
            icon: 'text-destructive pr-6',
            content: 'text-destructive',
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isCepValid = cep.length === 8;
  const isNameValid = name.trim().length > 0;
  const isFormValid = isCepValid && isNameValid && !isLoading;

  return (
    <div className="w-full p-6 space-y-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Buscar Endereço</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Digite seu nome"
              className="w-full text-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
              CEP (apenas n meros)
            </label>
            <Input
              id="cep"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={cep}
              onChange={handleCepChange}
              placeholder="00000000"
              maxLength={8}
              className="w-full text-gray-700"
            />
            {!isCepValid && cep.length > 0 && (
              <p className="text-sm text-red-500">O CEP deve ter exatamente 8 d gitos</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="w-full sm:w-auto"
            disabled={!isFormValid}
          >
            {isLoading ? 'Buscando...' : 'Buscar e Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
