import { supabase } from '../../supabaseClient';

/**
 * Calculate ESG scores based on parsed document data
 */
export const calculateESGScore = async (parsedData, userId) => {
  try {
    // Get scoring rules from database
    const { data: scoringRules, error } = await supabase
      .from('esg_scoring_rules')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;

    // Initialize scores
    const scores = {
      environmental: 0,
      social: 0,
      governance: 0,
      breakdown: {}
    };

    // Calculate Environmental Score
    if (parsedData.electricityBill) {
      scores.environmental += calculateElectricityScore(parsedData.electricityBill, scoringRules);
    }
    if (parsedData.waterBill) {
      scores.environmental += calculateWaterScore(parsedData.waterBill, scoringRules);
    }
    if (parsedData.transportBill) {
      scores.environmental += calculateTransportScore(parsedData.transportBill, scoringRules);
    }

    // Calculate Social Score
    if (parsedData.numEmployees) {
      scores.social += calculateEmployeeScore(parsedData.numEmployees, scoringRules);
    }
    if (parsedData.employeesHealth) {
      scores.social += calculateHealthBenefitsScore(parsedData.employeesHealth, scoringRules);
    }
    if (parsedData.communityEngagement) {
      scores.social += calculateCommunityScore(parsedData.communityEngagement, scoringRules);
    }

    // Calculate Governance Score
    if (parsedData.ownershipStructure) {
      scores.governance += calculateOwnershipScore(parsedData.ownershipStructure, scoringRules);
    }
    if (parsedData.businessRegulation) {
      scores.governance += calculateRegulatoryScore(parsedData.businessRegulation, scoringRules);
    }
    if (parsedData.taxCompliance) {
      scores.governance += calculateTaxScore(parsedData.taxCompliance, scoringRules);
    }

    // Normalize scores to 0-100 range
    scores.environmental = Math.min(100, Math.max(0, Math.round(scores.environmental)));
    scores.social = Math.min(100, Math.max(0, Math.round(scores.social)));
    scores.governance = Math.min(100, Math.max(0, Math.round(scores.governance)));

    // Calculate overall score (weighted average)
    scores.overall = Math.round(
      (scores.environmental * 0.4) + 
      (scores.social * 0.35) + 
      (scores.governance * 0.25)
    );

    return {
      success: true,
      scores
    };

  } catch (error) {
    console.error('Error calculating ESG score:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Calculate electricity consumption score
 */
const calculateElectricityScore = (electricityData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Electricity Consumption');
  if (!rule || !electricityData.consumption?.kwhUsed) return 0;

  const consumption = electricityData.consumption.kwhUsed;
  const thresholds = rule.rule_config.thresholds;
  
  let score = 50; // Base score
  
  if (consumption <= thresholds.excellent) {
    score = 90;
  } else if (consumption <= thresholds.good) {
    score = 75;
  } else if (consumption <= thresholds.fair) {
    score = 60;
  } else {
    score = 40;
  }

  return score * rule.weight * 100; // Convert to percentage of total environmental score
};

/**
 * Calculate water usage score
 */
const calculateWaterScore = (waterData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Water Usage');
  if (!rule || !waterData.consumption?.waterUsed) return 0;

  const usage = waterData.consumption.waterUsed;
  const thresholds = rule.rule_config.thresholds;
  
  let score = 50;
  
  if (usage <= thresholds.excellent) {
    score = 90;
  } else if (usage <= thresholds.good) {
    score = 75;
  } else if (usage <= thresholds.fair) {
    score = 60;
  } else {
    score = 40;
  }

  return score * rule.weight * 100;
};

/**
 * Calculate transport/carbon footprint score
 */
const calculateTransportScore = (transportData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Carbon Footprint');
  if (!rule || !transportData.environmentalImpact?.estimatedCO2Emissions) return 0;

  const emissions = transportData.environmentalImpact.estimatedCO2Emissions;
  const thresholds = rule.rule_config.thresholds;
  
  let score = 50;
  
  if (emissions <= thresholds.excellent) {
    score = 90;
  } else if (emissions <= thresholds.good) {
    score = 75;
  } else if (emissions <= thresholds.fair) {
    score = 60;
  } else {
    score = 40;
  }

  return score * rule.weight * 100;
};

/**
 * Calculate employee-related score
 */
const calculateEmployeeScore = (employeeData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Employee Count');
  if (!rule || !employeeData.employeeMetrics?.totalEmployees) return 0;

  const totalEmployees = employeeData.employeeMetrics.totalEmployees;
  const thresholds = rule.rule_config.thresholds;
  
  let score = 60; // Base score for having employees
  
  // Bonus for small business employment
  if (totalEmployees >= thresholds.bonus_small && totalEmployees < thresholds.bonus_medium) {
    score += 20;
  } else if (totalEmployees >= thresholds.bonus_medium) {
    score += 30;
  }

  return score * rule.weight * 100;
};

/**
 * Calculate health benefits coverage score
 */
const calculateHealthBenefitsScore = (healthData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Health Benefits Coverage');
  if (!rule || !healthData.healthBenefits) return 0;

  let score = 30; // Base score
  
  // Check BPJS coverage
  if (healthData.healthBenefits.bpjsKesehatan?.covered) {
    score += 30;
  }
  if (healthData.healthBenefits.bpjsKetenagakerjaan?.covered) {
    score += 25;
  }
  
  // Bonus for private insurance
  if (healthData.healthBenefits.privateInsurance?.covered) {
    score += 15;
  }

  return Math.min(100, score) * rule.weight * 100;
};

/**
 * Calculate community engagement score
 */
const calculateCommunityScore = (communityData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Community Engagement');
  if (!rule || !communityData.communityPrograms) return 0;

  const programCount = communityData.communityPrograms.length;
  const thresholds = rule.rule_config.thresholds;
  
  let score = 40;
  
  if (programCount >= thresholds.excellent) {
    score = 90;
  } else if (programCount >= thresholds.good) {
    score = 75;
  } else if (programCount >= thresholds.fair) {
    score = 60;
  }

  return score * rule.weight * 100;
};

/**
 * Calculate ownership transparency score
 */
const calculateOwnershipScore = (ownershipData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Ownership Transparency');
  if (!rule || !ownershipData.ownership) return 0;

  let score = 50; // Base score for having ownership documentation
  
  // Check for ownership transparency
  if (ownershipData.ownership.length > 0) {
    score += 20;
  }
  
  // Bonus for board information
  if (ownershipData.boardOfDirectors && ownershipData.boardOfDirectors.length > 0) {
    score += 20;
  }
  
  // Bonus for corporate structure clarity
  if (ownershipData.corporateStructure?.businessType) {
    score += 10;
  }

  return Math.min(100, score) * rule.weight * 100;
};

/**
 * Calculate regulatory compliance score
 */
const calculateRegulatoryScore = (regulationData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Regulatory Compliance');
  if (!rule || !regulationData.licenses) return 0;

  let score = 40; // Base score
  
  const activeLicenses = regulationData.licenses.filter(license => 
    license.status === 'active'
  ).length;
  
  const totalLicenses = regulationData.licenses.length;
  const complianceRate = totalLicenses > 0 ? activeLicenses / totalLicenses : 0;
  
  const thresholds = rule.rule_config.thresholds;
  
  if (complianceRate >= thresholds.excellent) {
    score = 95;
  } else if (complianceRate >= thresholds.good) {
    score = 80;
  } else if (complianceRate >= thresholds.fair) {
    score = 65;
  }

  return score * rule.weight * 100;
};

/**
 * Calculate tax compliance score
 */
const calculateTaxScore = (taxData, rules) => {
  const rule = rules.find(r => r.rule_name === 'Tax Compliance');
  if (!rule || !taxData.taxPayments) return 0;

  let score = 50; // Base score
  
  // Check payment status
  if (taxData.taxPayments.paymentStatus === 'current') {
    score += 30;
  } else if (taxData.taxPayments.paymentStatus === 'overdue') {
    score -= 20;
  }
  
  // Check filing status
  if (taxData.taxFilings) {
    const filedOnTime = taxData.taxFilings.filter(filing => 
      filing.status === 'filed'
    ).length;
    
    if (filedOnTime === taxData.taxFilings.length) {
      score += 20;
    }
  }

  return Math.max(0, Math.min(100, score)) * rule.weight * 100;
};

/**
 * Save ESG score to database
 */
export const saveESGScore = async (userId, documentDataId, scores) => {
  try {
    const { data, error } = await supabase
      .from('esg_scores')
      .insert({
        user_id: userId,
        document_data_id: documentDataId,
        environmental_score: scores.environmental,
        social_score: scores.social,
        governance_score: scores.governance,
        overall_score: scores.overall,
        score_breakdown: scores.breakdown
      });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error saving ESG score:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user's latest ESG score
 */
export const getUserLatestESGScore = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('esg_scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    
    return { success: true, data: data[0] || null };
  } catch (error) {
    console.error('Error fetching ESG score:', error);
    return { success: false, error: error.message };
  }
}; 