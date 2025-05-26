import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose
} from '@/components/shadcn/dialog';

interface AddressDeleteConfirmProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  username: string;
  addressAlias: string;
}

export default function AddressDeleteConfirm({ open, onCancel, onConfirm, username, addressAlias }: AddressDeleteConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-700">Excluir Endereço</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-gray-700">
          Tem certeza que deseja excluir o endereço <b>{addressAlias}</b> de <b>{username}</b>?
        </div>
        <DialogFooter className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel} aria-label='Cancelar' className='text-gray-700'>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={onConfirm}
            variant="destructive"
            aria-label='Confirmar exclusão'
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
