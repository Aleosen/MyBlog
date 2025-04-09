const API_BASE_URL = '/api'

export const customFetch = async (url, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        credentials: 'include'
      });
  
      if (!response.ok) {
        let errorMessage
        try {
          const data = await response.json();
          if (data.error) errorMessage = data.error;
        } catch {
          const text = await response.text();
          if (text) errorMessage = text;
        }
      
        throw new Error(errorMessage);
      }
  
      return response.status === 204 ? [] : await response.json();
      
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; 
    }
  };