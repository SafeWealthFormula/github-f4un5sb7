
import { QuizFlagMapping } from '../types/flagTypes';

export function createFlagCriteria(responses: any[]): QuizFlagMapping {
  const flags: QuizFlagMapping = {
    QQ1: 'Green',
    QQ2: 'Yellow1',
    QQ3: 'Red',
    QQ4: 'Yellow2',
    QQ5: 'Green',
    QQ6: 'Red',
    QQ7: 'Green',
    QQ8: 'Yellow1',
  };

  // Example of combined flag evaluation for retirement-related logic:
  if (responses.includes('high_savings_rate') && responses.includes('emergency_preparedness') && responses.includes('optimized_tax_strategy')) {
    flags.retirementPlanning = 'Comprehensive'; // Assign "Comprehensive" for optimal conditions
  } else if (responses.includes('moderate_savings_rate') || responses.includes('some_emergency_preparedness')) {
    flags.retirementPlanning = 'Moderate'; // Assign "Moderate" for intermediate cases
  } else if (responses.includes('low_savings_rate') || responses.includes('limited_tax_strategy')) {
    flags.retirementPlanning = 'Limited'; // Assign "Limited" for minimal conditions
  } else {
    flags.retirementPlanning = 'None'; // Assign "None" if conditions are unmet
  }

  return flags;
}
