import { ChevronDown, ChevronUp } from 'lucide-react';
import type { TaxCalculation } from '../App';
import { useState } from 'react';

interface TaxBreakdownProps {
  calculation: TaxCalculation;
}

export function TaxBreakdown({ calculation }: TaxBreakdownProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <h3 className="text-sm sm:text-base md:text-lg text-slate-900 flex items-center gap-2">
          How was it calculated?
        </h3>
        {showBreakdown ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
        )}
      </button>
      
      {showBreakdown && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4 border-t border-slate-200">
          {/* Deductions Summary (if applicable) */}
          {calculation.grossIncome && calculation.totalDeductions && calculation.taxableIncome !== undefined && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm text-amber-900 mb-3">Monthly Income Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                  <span className="text-amber-800">Gross Monthly Income:</span>
                  <span className="text-amber-900 text-right">{formatCurrency(calculation.grossIncome)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                  <span className="text-amber-800">Monthly Business Deductions:</span>
                  <span className="text-amber-900 text-right">- {formatCurrency(calculation.totalDeductions)}</span>
                </div>
                <div className="border-t border-amber-300 pt-2 mt-2">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-amber-900 text-xs sm:text-sm">Monthly Taxable Income:</span>
                    <span className="text-amber-900 text-xs sm:text-sm text-right font-medium">{formatCurrency(calculation.taxableIncome)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown */}
          {calculation.breakdown.length > 0 && (
            <div>
              <h4 className="text-xs sm:text-sm text-slate-700 mb-3">Monthly Tax Breakdown</h4>
              <div className="space-y-2">
                {calculation.breakdown.map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 px-3 bg-slate-50 rounded"
                  >
                    <span className="text-xs sm:text-sm text-slate-700">{item.bracket}</span>
                    <span className="text-xs sm:text-sm text-slate-900 font-medium">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h4 className="text-xs sm:text-sm text-blue-900 mb-2">Tax Calculation Method</h4>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
              {calculation.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}