import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Info, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { TaxResults } from './components/TaxResults';
import { IncomeInput } from './components/IncomeInput';
import { BusinessTypeSelector } from './components/BusinessTypeSelector';
import { IncomeSourceSelector, type IncomeSource } from './components/IncomeSourceSelector';
import { Recommendations } from './components/Recommendations';
import { TaxBreakdown } from './components/TaxBreakdown';
import { LandingPage } from './components/LandingPage';
import { DeductiblesInput, type Deductibles } from './components/DeductiblesInput';
import { TurnoverSelector, type TurnoverBracket } from './components/TurnoverSelector';
import { Footer } from './components/Footer';

export type BusinessType = 'personal' | 'limited';

export interface TaxCalculation {
  taxPayable: number;
  effectiveRate: number;
  explanation: string;
  breakdown: { bracket: string; amount: number }[];
  grossIncome?: number;
  totalDeductions?: number;
  taxableIncome?: number;
}

function calculatePIT(grossIncome: number, deductions: number = 0): TaxCalculation {
  const taxableIncome = Math.max(0, grossIncome - deductions);
  
  const brackets = [
    { limit: 300000, rate: 0.07, label: 'First ₦300,000' },
    { limit: 300000, rate: 0.11, label: 'Next ₦300,000' },
    { limit: 500000, rate: 0.15, label: 'Next ₦500,000' },
    { limit: 500000, rate: 0.19, label: 'Next ₦500,000' },
    { limit: 1600000, rate: 0.21, label: 'Next ₦1,600,000' },
    { limit: Infinity, rate: 0.24, label: 'Above ₦3,200,000' },
  ];

  let remainingIncome = taxableIncome;
  let totalTax = 0;
  const breakdown: { bracket: string; amount: number }[] = [];

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableInThisBracket = Math.min(remainingIncome, bracket.limit);
    const taxForThisBracket = taxableInThisBracket * bracket.rate;

    if (taxForThisBracket > 0) {
      breakdown.push({
        bracket: `${bracket.label} @ ${bracket.rate * 100}%`,
        amount: taxForThisBracket,
      });
    }

    totalTax += taxForThisBracket;
    remainingIncome -= taxableInThisBracket;
  }

  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  let explanation = `Personal Income Tax (PIT) uses a progressive system. `;
  if (deductions > 0) {
    explanation += `After deducting ₦${deductions.toLocaleString()} in business expenses, your taxable income is ₦${taxableIncome.toLocaleString()}. `;
  }
  if (taxableIncome <= 300000) {
    explanation += `Your taxable income falls in the lowest bracket (7%), so you pay a flat 7% on your taxable income.`;
  } else if (taxableIncome <= 600000) {
    explanation += `You pay 7% on the first ₦300,000, then 11% on the remaining amount.`;
  } else {
    explanation += `Your income is taxed across multiple brackets, starting at 7% for the first ₦300,000 and increasing progressively. This means you only pay the higher rates on income within those brackets, not on your entire income.`;
  }

  return {
    taxPayable: totalTax,
    effectiveRate,
    explanation,
    breakdown,
    grossIncome: deductions > 0 ? grossIncome : undefined,
    totalDeductions: deductions > 0 ? deductions : undefined,
    taxableIncome: deductions > 0 ? taxableIncome : undefined,
  };
}

function calculateBIT(grossIncome: number, deductions: number = 0, turnoverBracket: TurnoverBracket = 'small'): TaxCalculation {
  const taxableIncome = Math.max(0, grossIncome - deductions);
  
  let taxPayable = 0;
  let effectiveRate = 0;
  let explanation = '';
  const breakdown: { bracket: string; amount: number }[] = [];

  if (turnoverBracket === 'small') {
    // Small companies (≤ ₦25M turnover): 0% or exempt
    taxPayable = 0;
    effectiveRate = 0;
    explanation = `Your company qualifies as a small company (annual turnover ≤ ₦25,000,000). `;
    if (deductions > 0) {
      explanation += `After deducting ₦${deductions.toLocaleString()} in business expenses, your taxable income is ₦${taxableIncome.toLocaleString()}. `;
    }
    explanation += `No company income tax (CIT) is due under the small company exemption.`;
  } else if (turnoverBracket === 'medium') {
    // Medium companies (₦25M - ₦100M): 30% CIT
    taxPayable = taxableIncome * 0.30;
    effectiveRate = grossIncome > 0 ? (taxPayable / grossIncome) * 100 : 0;
    
    breakdown.push({
      bracket: 'All taxable profit @ 30%',
      amount: taxPayable,
    });
    
    explanation = `As a medium-sized company (turnover between ₦25M and ₦100M), you pay a standard 30% company income tax (CIT) on taxable profit.`;
    if (deductions > 0) {
      explanation += ` After deducting ₦${deductions.toLocaleString()} in business expenses, your taxable income is ₦${taxableIncome.toLocaleString()}.`;
    }
  } else {
    // Large companies (> ₦100M): 30% CIT + potential TET
    taxPayable = taxableIncome * 0.30;
    effectiveRate = grossIncome > 0 ? (taxPayable / grossIncome) * 100 : 0;
    
    breakdown.push({
      bracket: 'All taxable profit @ 30%',
      amount: taxPayable,
    });
    
    explanation = `As a large company (turnover exceeding ₦100,000,000), you pay 30% company income tax (CIT) on taxable profit.`;
    if (deductions > 0) {
      explanation += ` After deducting ₦${deductions.toLocaleString()} in business expenses, your taxable income is ₦${taxableIncome.toLocaleString()}.`;
    }
    explanation += ` Additionally, Tertiary Education Tax (TET) of 2%-2.5% may apply to assessable profit.`;
  }

  return {
    taxPayable,
    effectiveRate,
    explanation,
    breakdown,
    grossIncome: deductions > 0 ? grossIncome : undefined,
    totalDeductions: deductions > 0 ? deductions : undefined,
    taxableIncome: deductions > 0 ? taxableIncome : undefined,
  };
}

export default function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [income, setIncome] = useState<number>(0);
  const [incomeSource, setIncomeSource] = useState<IncomeSource>('salary');
  const [businessType, setBusinessType] = useState<BusinessType>('personal');
  const [deductibles, setDeductibles] = useState<Deductibles>({
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
  const [turnoverBracket, setTurnoverBracket] = useState<TurnoverBracket>('small');

  const totalDeductions = useMemo(() => {
    return Object.values(deductibles).reduce((sum, val) => sum + val, 0);
  }, [deductibles]);

  const taxCalculation = useMemo(() => {
    if (income <= 0) return null;
    // Convert monthly income to annual income
    const annualIncome = income * 12;
    const annualDeductions = totalDeductions * 12;
    // Only apply deductions for business owners, not salary earners or freelancers
    const applicableDeductions = incomeSource === 'business' ? annualDeductions : 0;
    const result = businessType === 'personal' ? calculatePIT(annualIncome, applicableDeductions) : calculateBIT(annualIncome, applicableDeductions, turnoverBracket);
    
    // Convert annual tax to monthly tax for display
    if (result) {
      return {
        ...result,
        taxPayable: result.taxPayable / 12,
        breakdown: result.breakdown.map(item => ({
          ...item,
          amount: item.amount / 12,
        })),
        grossIncome: result.grossIncome ? result.grossIncome / 12 : undefined,
        totalDeductions: result.totalDeductions ? result.totalDeductions / 12 : undefined,
        taxableIncome: result.taxableIncome ? result.taxableIncome / 12 : undefined,
      };
    }
    return result;
  }, [income, businessType, totalDeductions, incomeSource, turnoverBracket]);

  // Show landing page first
  if (!showCalculator) {
    return <LandingPage onGetStarted={() => setShowCalculator(true)} />;
  }

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && income > 0) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setIncome(0);
    setIncomeSource('salary');
    setBusinessType('personal');
    setDeductibles({
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
    setTurnoverBracket('small');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCalculator(false)}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="p-1.5 sm:p-2 rounded-lg" style={{ backgroundColor: '#4e6be0' }}>
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-slate-900 text-lg sm:text-2xl"> GoTax Estimator – Nigeria Tax Calculator </h1>
                <p className="text-xs sm:text-sm text-slate-500">Estimate PAYE, freelance, and business taxes instantly</p>
              </div>
            </button>
            <button
              onClick={() => setShowCalculator(false)}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors text-sm sm:text-base text-white`}
                style={{
                  backgroundColor: currentStep >= 1 ? '#4e6be0' : '#e5e7eb',
                  color: currentStep >= 1 ? '#ffffff' : '#4b5563'
                }}>
                {currentStep > 1 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>1</span>
                )}
              </div>
              <div className="hidden sm:block">
                <div style={{ color: currentStep >= 1 ? '#4e6be0' : '#4b5563' }} className="text-sm">
                  Step 1
                </div>
                <div className="text-xs text-slate-500">Income Source</div>
              </div>
            </div>

            <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors`}
              style={{ backgroundColor: currentStep >= 2 ? '#4e6be0' : '#e5e7eb' }}></div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors text-sm sm:text-base`}
                style={{
                  backgroundColor: currentStep >= 2 ? '#4e6be0' : '#e5e7eb',
                  color: currentStep >= 2 ? '#ffffff' : '#4b5563'
                }}>
                {currentStep > 2 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>2</span>
                )}
              </div>
              <div className="hidden sm:block">
                <div style={{ color: currentStep >= 2 ? '#4e6be0' : '#4b5563' }} className="text-sm">
                  Step 2
                </div>
                <div className="text-xs text-slate-500">Income Amount</div>
              </div>
            </div>

            <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors`}
              style={{ backgroundColor: currentStep >= 3 ? '#4e6be0' : '#e5e7eb' }}></div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors text-sm sm:text-base`}
                style={{
                  backgroundColor: currentStep >= 3 ? '#4e6be0' : '#e5e7eb',
                  color: currentStep >= 3 ? '#ffffff' : '#4b5563'
                }}>
                <span>3</span>
              </div>
              <div className="hidden sm:block">
                <div style={{ color: currentStep >= 3 ? '#4e6be0' : '#4b5563' }} className="text-sm">
                  Step 3
                </div>
                <div className="text-xs text-slate-500">Your Results</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8 min-h-[400px] sm:min-h-[500px]">
          {/* Step 1: Income Source */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-slate-900 mb-2">Let's start with your income source</h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  This helps us determine which tax structure applies to you
                </p>
              </div>

              <IncomeSourceSelector 
                value={incomeSource} 
                onChange={setIncomeSource} 
              />

              <div className="flex justify-end mt-6 sm:mt-8">
                <button
                  onClick={handleNext}
                  className="text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                  style={{
                    backgroundColor: '#4e6be0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d7e416';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4e6be0';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Income Amount */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-slate-900 mb-2">How much income did you earn?</h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Enter your gross monthly income or profit
                </p>
              </div>

              <div className="space-y-6">
                <IncomeInput value={income} onChange={setIncome} />
                
                {incomeSource === 'business' && (
                  <div className="space-y-6">
                    <BusinessTypeSelector value={businessType} onChange={setBusinessType} />
                    
                    <TurnoverSelector value={turnoverBracket} onChange={setTurnoverBracket} />
                    
                    <DeductiblesInput values={deductibles} onChange={setDeductibles} />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 sm:px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={income <= 0}
                  className="text-white px-4 sm:px-6 py-3 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: income <= 0 ? '#e5e7eb' : '#4e6be0',
                  }}
                  onMouseEnter={(e) => {
                    if (income > 0) {
                      e.currentTarget.style.backgroundColor = '#d7e416';
                      e.currentTarget.style.color = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (income > 0) {
                      e.currentTarget.style.backgroundColor = '#4e6be0';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                >
                  <span className="hidden sm:inline">Calculate Tax</span>
                  <span className="sm:hidden">Calculate</span>
                  <Calculator className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {currentStep === 3 && taxCalculation && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#7e8fe7' }}>
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-slate-900 mb-2">Your Tax Estimate</h2>
                <p className="text-slate-600">
                  Here's a breakdown of your estimated tax liability
                </p>
              </div>

              <div className="space-y-6">
                <TaxResults calculation={taxCalculation} businessType={businessType} />
                <Recommendations 
                  income={income} 
                  businessType={businessType} 
                  incomeSource={incomeSource}
                  effectiveRate={taxCalculation.effectiveRate}
                />
                <TaxBreakdown calculation={taxCalculation} />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 sm:px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Details</span>
                  <span className="sm:hidden">Edit</span>
                </button>
                <button
                  onClick={handleStartOver}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 sm:px-6 py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Start New Calculation</span>
                  <span className="sm:hidden">New Calc</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm text-amber-900 text-center">
            <strong>Disclaimer:</strong> This is an estimate only and does not constitute tax or legal advice. 
            Please consult with a qualified tax professional for accurate tax planning and compliance.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={() => setShowCalculator(false)} />
    </div>
  );
}