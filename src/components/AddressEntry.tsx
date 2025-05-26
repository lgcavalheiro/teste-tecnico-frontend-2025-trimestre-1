'use client';

import { AddressEntry as AddressEntryType } from '@/types/addressBook';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Trash2, Edit2 } from 'lucide-react';
import { useAddressBook } from '@/contexts/AddressBookContext';
import AddressUpdateModal from './AddressUpdateModal';
import AddressDeleteConfirm from './AddressDeleteConfirm';

interface AddressEntryProps {
  entry: AddressEntryType;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function AddressEntry({ entry, onDelete }: AddressEntryProps) {
  const { updateEntry } = useAddressBook();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteOpen = () => setDeleteDialogOpen(true);
  const handleDeleteCancel = () => setDeleteDialogOpen(false);
  const handleDeleteConfirm = () => {
    onDelete(entry.id);
    setDeleteDialogOpen(false);
  };

  const handleEditOpen = () => setEditDialogOpen(true);
  const handleEditCancel = () => setEditDialogOpen(false);
  const handleEditConfirm = (newAlias: string) => {
    updateEntry(entry.id, { addressAlias: newAlias });
    setEditDialogOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-md bg-card text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            {entry.username}
            <span className="text-muted-foreground font-normal"> • {entry.addressAlias}</span>
          </CardTitle>
        </CardHeader>
      
      <CardContent className="flex flex-col h-full space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <p className="text-muted-foreground">CEP</p>
            <p>{entry.cep ? entry.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2') : '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Logradouro</p>
            <p className="truncate">{entry.logradouro || '-'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <p className="text-muted-foreground">Complemento</p>
            <p>{entry.complemento || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Região</p>
            <p>{entry.regiao || '-'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <p className="text-muted-foreground">Bairro</p>
            <p>{entry.bairro || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Cidade/UF</p>
            <p>{entry.localidade && entry.uf ? `${entry.localidade}/${entry.uf}` : '-'}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-2 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleEditOpen}
          aria-label="Editar endereço"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDeleteOpen}
          aria-label="Excluir endereço"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>

    <AddressUpdateModal
      open={editDialogOpen}
      initialAlias={entry.addressAlias}
      onCancel={handleEditCancel}
      onConfirm={handleEditConfirm}
    />
    <AddressDeleteConfirm
      open={deleteDialogOpen}
      onCancel={handleDeleteCancel}
      onConfirm={handleDeleteConfirm}
      username={entry.username}
      addressAlias={entry.addressAlias}
    />
    </>
  );
}
