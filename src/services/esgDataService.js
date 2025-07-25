import { supabase } from '../../supabaseClient';

/**
 * ESG Data Management Service
 * Handles all database operations for ESG reports and scores
 */

/**
 * Get user's latest ESG data and scores
 */
export const getUserLatestESGData = async (userId) => {
  try {
    console.log('Fetching latest ESG data for user:', userId);

    // Fetch latest ESG document data with scores in a single query using join
    const { data, error } = await supabase
      .from('esg_document_data')
      .select(`
        *,
        esg_scores (
          id,
          environmental_score,
          social_score,
          governance_score,
          overall_score,
          score_breakdown,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No ESG data found for user');
      return { success: true, data: null, scores: null };
    }

    const latestData = data[0];
    const latestScores = latestData.esg_scores?.[0] || null;

    console.log('Retrieved ESG data:', { 
      dataId: latestData.id, 
      hasScores: !!latestScores,
      submittedAt: latestData.created_at 
    });

    return {
      success: true,
      data: latestData,
      scores: latestScores
    };

  } catch (error) {
    console.error('Error fetching ESG data:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch ESG data'
    };
  }
};

/**
 * Get user's ESG history (all previous submissions)
 */
export const getUserESGHistory = async (userId, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('esg_document_data')
      .select(`
        id,
        created_at,
        parsed_data,
        esg_scores (
          overall_score,
          environmental_score,
          social_score,
          governance_score,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching ESG history:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Save new ESG submission (replaces previous as "latest")
 */
export const saveESGSubmission = async (userId, submissionData) => {
  try {
    console.log('Saving ESG submission for user:', userId);

    // Insert new document data
    const { data: docData, error: docError } = await supabase
      .from('esg_document_data')
      .insert({
        user_id: userId,
        parsed_data: submissionData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (docError) {
      console.error('Error saving document data:', docError);
      throw docError;
    }

    console.log('Document data saved:', docData.id);
    return { success: true, data: docData };

  } catch (error) {
    console.error('Error saving ESG submission:', error);
    return {
      success: false,
      error: error.message || 'Failed to save ESG submission'
    };
  }
};

/**
 * Save ESG scores for a submission
 */
export const saveESGScores = async (userId, documentDataId, scores) => {
  try {
    console.log('Saving ESG scores for document:', documentDataId);

    const { data, error } = await supabase
      .from('esg_scores')
      .insert({
        user_id: userId,
        document_data_id: documentDataId,
        environmental_score: scores.environmental,
        social_score: scores.social,
        governance_score: scores.governance,
        overall_score: scores.overall,
        score_breakdown: scores.breakdown || {},
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving scores:', error);
      throw error;
    }

    console.log('ESG scores saved:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('Error saving ESG scores:', error);
    return {
      success: false,
      error: error.message || 'Failed to save ESG scores'
    };
  }
};

/**
 * Update user's profile with latest ESG summary
 */
export const updateUserESGProfile = async (userId, esgSummary) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        latest_esg_score: esgSummary.overall,
        last_submission: new Date().toISOString(),
        esg_summary: esgSummary
      })
      .select();

    if (error && !error.message.includes('relation "user_profiles" does not exist')) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.log('User profiles table not found, skipping profile update');
    return { success: true, data: null };
  }
};

/**
 * Delete an ESG submission and its scores
 */
export const deleteESGSubmission = async (userId, submissionId) => {
  try {
    // First delete associated scores
    const { error: scoresError } = await supabase
      .from('esg_scores')
      .delete()
      .eq('document_data_id', submissionId)
      .eq('user_id', userId);

    if (scoresError) {
      console.error('Error deleting scores:', scoresError);
      throw scoresError;
    }

    // Then delete the document data
    const { error: docError } = await supabase
      .from('esg_document_data')
      .delete()
      .eq('id', submissionId)
      .eq('user_id', userId);

    if (docError) {
      console.error('Error deleting document:', docError);
      throw docError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting ESG submission:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get ESG statistics for user
 */
export const getUserESGStats = async (userId) => {
  try {
    // Get total submissions count
    const { count: totalSubmissions, error: countError } = await supabase
      .from('esg_document_data')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (countError) throw countError;

    // Get latest and best scores
    const { data: scores, error: scoresError } = await supabase
      .from('esg_scores')
      .select('overall_score, environmental_score, social_score, governance_score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (scoresError) throw scoresError;

    const stats = {
      totalSubmissions: totalSubmissions || 0,
      latestScore: scores?.[0]?.overall_score || null,
      bestScore: scores ? Math.max(...scores.map(s => s.overall_score)) : null,
      averageScore: scores && scores.length > 0 
        ? Math.round(scores.reduce((sum, s) => sum + s.overall_score, 0) / scores.length)
        : null,
      lastSubmission: scores?.[0]?.created_at || null
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching ESG stats:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Export user's ESG data for download
 */
export const exportESGData = async (userId, format = 'json') => {
  try {
    const { data, error } = await supabase
      .from('esg_document_data')
      .select(`
        *,
        esg_scores (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const exportData = {
      userId,
      exportDate: new Date().toISOString(),
      totalSubmissions: data.length,
      submissions: data
    };

    if (format === 'json') {
      return {
        success: true,
        data: JSON.stringify(exportData, null, 2),
        filename: `esg-data-${userId}-${new Date().toISOString().split('T')[0]}.json`
      };
    }

    return { success: true, data: exportData };
  } catch (error) {
    console.error('Error exporting ESG data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check if user has any ESG data
 */
export const userHasESGData = async (userId) => {
  try {
    const { count, error } = await supabase
      .from('esg_document_data')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;

    return { success: true, hasData: (count || 0) > 0, count: count || 0 };
  } catch (error) {
    console.error('Error checking ESG data:', error);
    return { success: false, error: error.message };
  }
}; 