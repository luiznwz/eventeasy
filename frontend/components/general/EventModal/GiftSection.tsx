import { PlusCircle, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Gift = {
  id: string;
  name: string;
  value: string;
};

type GiftSectionProps = {
  gifts: Gift[];
  newGift: { name: string; value: string };
  setNewGift: (gift: { name: string; value: string }) => void;
  onAddGift: () => void;
  onRemoveGift: (id: string) => void;
};

export function GiftSection({
  gifts,
  newGift,
  setNewGift,
  onAddGift,
  onRemoveGift
}: GiftSectionProps) {
  return (
    <div className="space-y-3 pt-1">
      <div className="flex justify-between items-center">
        <Label className="text-blue-500 font-medium">
          Presentes ou Contribuições
        </Label>
      </div>

      <div className="space-y-4">
        {gifts.length > 0 && (
          <div className="space-y-2">
            {gifts.map((gift) => (
              <div key={gift.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="font-medium text-blue-500">{gift.name}</p>
                  <p className="text-sm text-blue-700">R$ {gift.value}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveGift(gift.id)}
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="sm:col-span-2">
            <Input
              placeholder="Título do presente ou contribuição"
              value={newGift.name}
              onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
              <Input
                placeholder="Valor"
                type="number"
                value={newGift.value}
                onChange={(e) => setNewGift({ ...newGift, value: e.target.value })}
                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={onAddGift}
          className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar Presente
        </Button>
      </div>
    </div>
  );
}