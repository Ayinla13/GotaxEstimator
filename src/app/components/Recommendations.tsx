import { Lightbulb, TrendingDown, FileCheck } from 'lucide-react';
import type { BusinessType } from '../App';
import type { IncomeSource } from './IncomeSourceSelector';

interface RecommendationsProps {
  income: number;
  businessType: BusinessType;
  incomeSource: IncomeSource;
  effectiveRate: number;
}

export function Recommendations({ income, businessType, incomeSource, effectiveRate }: RecommendationsProps) {
  const recommendations: { icon: React.ReactNode; text: string }[] = [];

  // High tax rate recommendations (above 10%)
  if (effectiveRate > 10) {
    // For salary earners with high tax rate
    if (incomeSource === 'salary') {
      recommendations.push({
        icon: <TrendingDown className="w-5 h-5 text-blue-600" />,
        text: 'Your tax rate is high. Consider maximizing pension contributions, opening a Federal Mortgage Bank account, getting life insurance, and enrolling in NHIS to reduce your taxable income.',
      });
    }
    
    // For freelancers with high tax rate
    if (incomeSource === 'freelance') {
      recommendations.push({
        icon: <TrendingDown className="w-5 h-5 text-indigo-600" />,
        text: 'Your tax rate is high. Consider registering a business name to unlock business expense deductions and better structure your freelance operations for tax efficiency.',
      });
    }
    
    // For sole proprietorship with high tax rate
    if (incomeSource === 'business' && businessType === 'personal') {
      recommendations.push({
        icon: <TrendingDown className="w-5 h-5 text-purple-600" />,
        text: 'Your tax rate is high and sole proprietorships have limited expense deductions. Consider registering a limited liability company to unlock full business expense deductions and reduce your tax liability.',
      });
    }
    
    // For limited liability companies with high tax rate
    if (businessType === 'limited') {
      recommendations.push({
        icon: <FileCheck className="w-5 h-5 text-emerald-600" />,
        text: 'Ensure you maintain proper records for all business expenses that are deductible. Good documentation of rent, salaries, professional fees, marketing, and other eligible expenses is crucial for reducing your taxable income.',
      });
    }
  }

  // Incorporation recommendation for high earners (only if not already covered by high tax rate)
  if (businessType === 'personal' && income > 10000000 && effectiveRate <= 10) {
    recommendations.push({
      icon: <TrendingDown className="w-5 h-5 text-purple-600" />,
      text: 'Consider incorporating as a limited company. High earners may benefit from company tax structures and additional deductions.',
    });
  }

  // Small business exemption notice
  if (businessType === 'limited' && income < 25000000 && income > 15000000) {
    recommendations.push({
      icon: <Lightbulb className="w-5 h-5 text-amber-600" />,
      text: 'Your company currently qualifies for small business tax exemption (turnover below ₦25M). Monitor your revenue to stay within this threshold.',
    });
  }

  // Expense tracking (only for business owners and freelancers, not salary earners)
  // And only if not already recommended above for limited liability
  if (incomeSource !== 'salary' && !(effectiveRate > 10 && businessType === 'limited')) {
    recommendations.push({
      icon: <FileCheck className="w-5 h-5 text-emerald-600" />,
      text: 'Track all deductible business expenses throughout the year to reduce your taxable income and lower your tax liability.',
    });
  }

  // Professional advice for high earners
  if (income > 20000000) {
    recommendations.push({
      icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
      text: 'With your income level, engaging a tax consultant could help you identify additional tax savings and ensure full compliance.',
    });
  }

  // Mid-tier income advice for personal (only if not already covered by high tax rate recommendation)
  if (businessType === 'personal' && income >= 3200000 && income <= 10000000 && effectiveRate <= 10 && incomeSource !== 'salary') {
    recommendations.push({
      icon: <TrendingDown className="w-5 h-5 text-indigo-600" />,
      text: 'You\'re in the higher PIT brackets. Maximize pension contributions and reliefs to reduce your taxable income.',
    });
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg border-2 border-amber-300 p-4 sm:p-6 md:p-8">
      <h2 className="text-slate-900 text-lg sm:text-xl md:text-2xl mb-2 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-amber-600" />
        <span>Smart Recommendations For You</span>
      </h2>
      <p className="text-slate-600 text-xs sm:text-sm mb-4 sm:mb-6">
        Based on your tax profile, here are key actions to optimize your tax situation:
      </p>
      <div className="space-y-3 sm:space-y-4">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 mt-0.5">
              {rec.icon}
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              {rec.text}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4 sm:mt-6 italic">
        These recommendations are for informational purposes only and do not constitute professional tax advice.
      </p>
    </div>
  );
}