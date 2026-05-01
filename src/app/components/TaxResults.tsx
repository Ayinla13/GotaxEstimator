import { FileText, Percent } from 'lucide-react';
import type { TaxCalculation, BusinessType } from '../App';

interface TaxResultsProps {
  calculation: TaxCalculation;
  businessType: BusinessType;
}

export function TaxResults({ calculation, businessType }: TaxResultsProps) {
  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 sm:px-6 py-4 sm:py-5">
        <h2 className="text-white flex items-center gap-2 text-lg sm:text-2xl">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          Tax Calculation Results
        </h2>
        <p className="text-emerald-100 text-xs sm:text-sm mt-1">
          {businessType === 'personal' ? 'Personal Income Tax (PIT)' : 'Company Income Tax (CIT)'}
        </p>
      </div>

      {/* Results */}
      <div className="p-4 sm:p-6">
        {/* Main Figures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-slate-50 rounded-lg p-4 sm:p-5 border border-slate-200">
            <div className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-2">Estimated Annual Tax Payable</div>
            <div className="text-slate-900 text-xl sm:text-2xl">
              {formatCurrency(calculation.taxPayable)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Based on annualized income
            </div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 sm:p-5 border border-emerald-200">
            <div className="text-xs sm:text-sm text-emerald-700 mb-1 sm:mb-2 flex items-center gap-1">
              <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
              Effective Tax Rate
            </div>
            <div className="text-emerald-900 text-xl sm:text-2xl">
              {calculation.effectiveRate.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}