export function getQuestionContext(questionId: string): string {
  const contexts: Record<string, string> = {
    'QQ1': "Let's start by understanding your financial foundation...",
    'QQ2': "Now, let's explore your emergency preparedness...",
    'QQ3': "Inflation affects everyone differently. Let's see where you stand...",
    'QQ4': "Your saving habits shape your financial future...",
    'QQ5': "Let's look at how you're protecting your wealth...",
    'QQ6': "Tax strategy can make a big difference. Let's assess yours...",
    'QQ7': "Planning for retirement is crucial. Let's check your progress...",
    'QQ8': "Finally, let's consider your family's financial security...",
    
    'SQQ1': "Let's identify what matters most to you...",
    'SQQ2': "Understanding your confidence helps us better serve you...",
    'SQQ3': "Let's assess your financial safety net...",
    'SQQ4': "Your saving habits are key to long-term success...",
    'SQQ5': "Professional guidance can make a difference...",
    'SQQ6': "Diversification is crucial for wealth protection...",
    'SQQ7': "Let's review your investment toolkit...",
    'SQQ8': "Planning for retirement requires clarity...",
    'SQQ9': "Your retirement timeline shapes your strategy...",
    'SQQ10': "Healthcare costs can impact your retirement...",
    'SQQ11': "Legacy planning protects what matters most...",
    'SQQ12': "Let's wrap up with a look at inflation protection..."
  };

  return contexts[questionId] || '';
}