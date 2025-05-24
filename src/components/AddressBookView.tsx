import AddressEntryAdd from './AddressEntryAdd';
import AddressList from './AddressList';

export default function AddressBookView() {
  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Agenda de Endereços</h1>
      <AddressEntryAdd />
      <AddressList />
    </div>
  );
}
