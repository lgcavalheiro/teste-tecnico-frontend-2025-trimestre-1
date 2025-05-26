'use client';
import AddressEntryComponent from './AddressEntry';
import { useAddressBook } from '@/contexts/AddressBookContext';

export default function AddressList() {
  const { entries } = useAddressBook();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Endereços Salvos</h2>
      </div>
      <div className="mb-4 text-sm text-gray-500">
        {entries.length} {entries.length === 1 ? 'endereço encontrado' : 'endereços encontrados'}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <AddressEntryComponent
              key={entry.id}
              entry={entry}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">
              {entries.length === 0 && 'Nenhum endereço encontrado ou cadastrado ainda.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
