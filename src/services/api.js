const API_URL = 'http://localhost:5000';

export const analyzeProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_URL}/analyze-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in analyzeProfile:', error);
    throw error;
  }
};
