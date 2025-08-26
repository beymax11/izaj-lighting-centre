
export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

// Placeholder auth endpoints
// Swap with real endpoints when backend is available
export const authService = {
  async login(payload: LoginPayload): Promise<AuthUser> {
    // Example: return apiClient.post<AuthUser>('/api/auth/login', payload);
    await new Promise(r => setTimeout(r, 350));
    return {
      id: 'demo-user',
      firstName: payload.email.split('@')[0],
      lastName: 'User',
      email: payload.email,
    };
  },

  async register(payload: RegisterPayload): Promise<AuthUser> {
    // Example: return apiClient.post<AuthUser>('/api/auth/register', payload);
    await new Promise(r => setTimeout(r, 450));
    return {
      id: 'demo-user',
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phoneNumber,
    };
  },
};


