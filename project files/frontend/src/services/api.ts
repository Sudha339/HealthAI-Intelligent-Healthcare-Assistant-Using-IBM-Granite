const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const response = await this.request<{
      token: string;
      user: any;
      message: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      token: string;
      user: any;
      message: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // Chat
  async sendChatMessage(message: string) {
    return this.request<{
      response: string;
      timestamp: string;
      messageId: string;
    }>('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getChatHistory(userId: string) {
    return this.request<{
      chatHistory: any[];
    }>(`/chat/history/${userId}`);
  }

  // Disease Prediction
  async analyzeSymptoms(symptoms: Array<{
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
  }>) {
    return this.request<{
      predictions: any[];
      timestamp: string;
      analysisId: string;
    }>('/prediction/analyze', {
      method: 'POST',
      body: JSON.stringify({ symptoms }),
    });
  }

  async getCommonSymptoms() {
    return this.request<{
      symptoms: string[];
    }>('/prediction/symptoms');
  }

  // Treatment Plans
  async generateTreatmentPlan(condition: string, userProfile?: any) {
    return this.request<any>('/treatment/generate', {
      method: 'POST',
      body: JSON.stringify({ condition, userProfile }),
    });
  }

  async getAvailableConditions() {
    return this.request<{
      conditions: string[];
    }>('/treatment/conditions');
  }

  // Health Dashboard
  async getHealthDashboard(userId: string) {
    return this.request<any>(`/health/dashboard/${userId}`);
  }

  async recordHealthData(data: {
    userId: string;
    type: string;
    data: any;
  }) {
    return this.request<{
      message: string;
      recordId: string;
      timestamp: string;
    }>('/health/record', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getHealthTrends(userId: string, type: string, period = '7d') {
    return this.request<any>(`/health/trends/${userId}/${type}?period=${period}`);
  }

  // User Profile
  async getUserProfile(userId: string) {
    return this.request<{
      profile: any;
    }>(`/user/profile/${userId}`);
  }

  async updateUserProfile(userId: string, profileData: any) {
    return this.request<{
      message: string;
      profile: any;
    }>(`/user/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserPreferences(userId: string) {
    return this.request<{
      preferences: any;
    }>(`/user/preferences/${userId}`);
  }

  async updateUserPreferences(userId: string, preferences: any) {
    return this.request<{
      message: string;
      preferences: any;
    }>(`/user/preferences/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  // Token management
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export const apiService = new ApiService();
export default apiService;