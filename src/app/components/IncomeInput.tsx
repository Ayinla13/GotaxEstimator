interface IncomeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function IncomeInput({ value, onChange }: IncomeInputProps) {
  const formatNumber = (num: number) => {
    if (!num) return '';
    return num.toLocaleString('en-US');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  return (
    <div>
      <label htmlFor="income" className="block text-slate-700 mb-2">
        Gross Monthly Income
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
          ₦
        </span>
        <input
          id="income"
          type="text"
          value={formatNumber(value)}
          onChange={handleChange}
          placeholder="Enter your monthly income"
          className="w-full pl-10 pr-4 py-4 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-xl"
        />
      </div>
      <p className="text-sm text-slate-500 mt-2">
        Your total gross income per month before any deductions
      </p>
    </div>
  );
}