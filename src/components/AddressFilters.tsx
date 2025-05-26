import { Input } from '@/components/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select';
import { useAddressBook } from '@/contexts/AddressBookContext';

export default function AddressFilters() {
  const { filters, handleFilterChange, uniqueCities, uniqueStates } = useAddressBook();

  return (
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
            className="w-full text-gray-700"
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
            <SelectTrigger className="w-full text-gray-700">
              <SelectValue placeholder="Todas as cidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
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
            <SelectTrigger className="w-full text-gray-700">
              <SelectValue placeholder="Todos os estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
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
            className="w-full text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};