import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useAsyncOperation<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (operation: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}

// Specific API hooks
export function useChatHistory(userId: string) {
  return useApi(
    () => apiService.getChatHistory(userId),
    [userId]
  );
}

export function useHealthDashboard(userId: string) {
  return useApi(
    () => apiService.getHealthDashboard(userId),
    [userId]
  );
}

export function useUserProfile(userId: string) {
  return useApi(
    () => apiService.getUserProfile(userId),
    [userId]
  );
}

export function useCommonSymptoms() {
  return useApi(
    () => apiService.getCommonSymptoms(),
    []
  );
}

export function useAvailableConditions() {
  return useApi(
    () => apiService.getAvailableConditions(),
    []
  );
}