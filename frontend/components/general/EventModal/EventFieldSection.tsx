import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type EventFieldSectionProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
};

export function EventFieldSection({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  multiline = false
}: EventFieldSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-blue-500 font-medium">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {multiline ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="min-h-[80px] border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}