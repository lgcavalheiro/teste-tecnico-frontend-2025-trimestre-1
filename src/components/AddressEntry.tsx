'use client';

import { AddressEntry as AddressEntryType } from '@/types/addressBook';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Trash2, Edit2 } from 'lucide-react';

interface AddressEntryProps {
  entry: AddressEntryType;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function AddressEntry({ entry, onDelete, onEdit }: AddressEntryProps) {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este endereço?')) {
      onDelete(entry.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(entry.id);
    }
  };

  return (
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
        
        <div className="space-y-1">
          <p className="text-muted-foreground">Complemento</p>
          <p>{entry.complemento || '-'}</p>
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
          onClick={handleEdit}
          aria-label="Editar endereço"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDelete}
          aria-label="Excluir endereço"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
