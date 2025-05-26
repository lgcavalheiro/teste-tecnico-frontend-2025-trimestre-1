import { useState, useEffect } from 'react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose
} from '@/components/shadcn/dialog';

interface AddressUpdateModalProps {
  open: boolean;
  initialAlias: string;
  onConfirm: (newAlias: string) => void;
  onCancel: () => void;
}

export default function AddressUpdateModal({ open, initialAlias, onConfirm, onCancel }: AddressUpdateModalProps) {
  const [alias, setAlias] = useState(initialAlias);

  useEffect(() => {
    if (open) setAlias(initialAlias);
  }, [open, initialAlias]);

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-700">Editar Nome do Endereço</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Input
            id="addressAliasEdit"
            type="text"
            value={alias}
            onChange={e => setAlias(e.target.value)}
            placeholder="Digite o novo nome"
            className="w-full text-gray-700"
            autoFocus
          />
        </div>
        <DialogFooter className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel} aria-label='Cancelar' className='text-gray-700'>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={() => onConfirm(alias)}
            disabled={alias.trim() === ''}
            aria-label='Confirmar'
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
