"use client"
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';

interface EventRegistrationFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
    termsAgreed: boolean;
  }) => void;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contribution: '',
    termsAgreed: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      toast.error("Atenção", {
        description: "Você precisa concordar com os termos do evento.",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="border-blue-200 border-1">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-blue-600">
          Informações Pessoais
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Preencha seus dados para confirmar sua presença
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-800">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 border-blue-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 border-blue-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-blue-800">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 border-blue-300"
              />
            </div>
          </div>

          <Separator className="bg-blue-200" />

          {/* {event.hasContribution.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-700">Contribuição</h3>
              <p className="text-sm text-muted-foreground">
                Selecione um item para contribuir com o evento
              </p>

              <RadioGroup
                onValueChange={(value) => handleInputChange('contribution', value)}
                className="space-y-3"
              >
                {event.hasContribution.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2 border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
                  >
                    <RadioGroupItem
                      value={item.id.toString()}
                      id={`contribution-${item.id}`}
                      className="text-blue-500 border-blue-300"
                    />
                    <Label
                      htmlFor={`contribution-${item.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium text-blue-800">
                        {item.name} - R$ {item.value}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )} */}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.termsAgreed}
              onCheckedChange={(checked) => handleInputChange('termsAgreed', checked.toString())}
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-blue-300 mt-1"
            />
            <Label
              htmlFor="terms"
              className="text-sm text-muted-foreground cursor-pointer leading-normal"
            >
              Concordo com os termos e condições do evento
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600/80"
          >
            Confirmar Presença
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventRegistrationForm;
