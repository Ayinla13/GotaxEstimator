import { useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

export interface Deductibles {
  rent: number;
  transport: number;
  internet: number;
  phone: number;
  wages: number;
  professional: number;
  marketing: number;
  utilities: number;
  repairs: number;
  subscriptions: number;
  depreciation: number;
}

interface DeductiblesInputProps {
  values: Deductibles;
  onChange: (values: Deductibles) => void;
}

const deductibleCategories = [
  { key: 'rent', label: 'Rent', description: 'Office/shop/workspace rent' },
  { key: 'transport', label: 'Transport & Logistics', description: 'Fuel, rides, delivery costs' },
  { key: 'internet', label: 'Internet & Data', description: 'Internet and data subscriptions' },
  { key: 'phone', label: 'Phone Bills', description: 'Business phone expenses' },
  { key: 'wages', label: 'Staff Wages', description: 'Employee salaries and wages' },
  { key: 'professional', label: 'Professional Fees', description: 'Accountant, legal fees' },
  { key: 'marketing', label: 'Marketing & Advertising', description: 'Ads, promotions, branding' },
  { key: 'utilities', label: 'Utilities', description: 'Power, water, waste disposal' },
  { key: 'repairs', label: 'Repairs & Maintenance', description: 'Equipment and facility repairs' },
  { key: 'subscriptions', label: 'Business Subscriptions & Software', description: 'Tools, apps, software' },
  { key: 'depreciation', label: 'Depreciation / Capital Allowances', description: 'For equipment and assets' },
] as const;

export function DeductiblesInput({ values, onChange }: DeductiblesInputProps) {
  const [hasDeductibles, setHasDeductibles] = useState(false);

  const formatNumber = (num: number) => {
    if (!num) return '';
    return num.toLocaleString('en-US');
  };

  const handleChange = (key: keyof Deductibles, inputValue: string) => {
    const rawValue = inputValue.replace(/,/g, '');
    const numValue = rawValue === '' ? 0 : parseFloat(rawValue);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange({ ...values, [key]: numValue });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setHasDeductibles(checked);
    if (!checked) {
      // Reset all deductibles to 0 when unchecked
      onChange({
        rent: 0,
        transport: 0,
        internet: 0,
        phone: 0,
        wages: 0,
        professional: 0,
        marketing: 0,
        utilities: 0,
        repairs: 0,
        subscriptions: 0,
        depreciation: 0,
      });
    }
  };

  const totalDeductions = Object.values(values).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
      {/* Checkbox Question */}
      <div className="flex items-start gap-3 mb-4">
        <input
          type="checkbox"
          id="has-deductibles"
          checked={hasDeductibles}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          className="mt-1 w-4 h-4 text-accent-600 bg-white border-slate-300 rounded focus:ring-accent-500 focus:ring-2"
        />
        <label htmlFor="has-deductibles" className="flex-1 cursor-pointer">
          <div className="text-slate-900">
            Do you have monthly business expenses to deduct?
          </div>
          <div className="text-sm text-slate-500 mt-1">
            Business expenses reduce your taxable income and lower your tax bill
          </div>
        </label>
      </div>

      {/* Deductibles Form (shown when checkbox is checked) */}
      {hasDeductibles && (
        <div className="pt-4 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deductibleCategories.map(({ key, label, description }) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm text-slate-700 mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    ₦
                  </span>
                  <input
                    id={key}
                    type="text"
                    value={formatNumber(values[key as keyof Deductibles])}
                    onChange={(e) => handleChange(key as keyof Deductibles, e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">{description}</div>
              </div>
            ))}
          </div>

          {totalDeductions > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Total Deductions:</span>
                <span className="text-accent-600">
                  ₦{totalDeductions.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}