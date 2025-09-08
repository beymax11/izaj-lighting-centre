import { useCallback, useMemo, useState } from 'react';
import { authService, LoginPayload, RegisterPayload, AuthUser } from '../services/authService';

export type AuthMode = 'login' | 'register';

export type AuthFormState = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthFormErrors = Partial<Record<keyof AuthFormState | 'general', string>>;

const defaultState: AuthFormState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function useAuthForm(initialMode: AuthMode = 'login') {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [state, setState] = useState<AuthFormState>(defaultState);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === 'login';

  const validate = useCallback((): boolean => {
    const newErrors: AuthFormErrors = {};
    if (!isLogin) {
      if (!state.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!state.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!state.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      else if (!/^[0-9]{11}$/.test(state.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid 11-digit phone number';
      if (state.password !== state.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!state.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) newErrors.email = 'Please enter a valid email address';
    if (!state.password) newErrors.password = 'Password is required';
    else if (state.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [state, isLogin]);

  const onChange = useCallback((name: keyof AuthFormState, value: string) => {
    setState(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setErrors({});
  }, []);

  const submit = useCallback(async (): Promise<AuthUser | undefined> => {
    if (!validate()) return undefined;
    setIsSubmitting(true);
    setErrors({});
    try {
      if (isLogin) {
        const payload: LoginPayload = { email: state.email, password: state.password, rememberMe };
        return await authService.login(payload);
      } else {
        const payload: RegisterPayload = {
          firstName: state.firstName,
          lastName: state.lastName,
          phoneNumber: state.phoneNumber,
          email: state.email,
          password: state.password,
        };
        return await authService.register(payload);
      }
    } catch (e: any) {
      setErrors({ general: e?.message || 'Something went wrong' });
      return undefined;
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, isLogin, state, rememberMe]);

  const ui = useMemo(() => ({
    isLogin,
    rememberMe,
    isSubmitting,
    errors,
    state,
  }), [isLogin, rememberMe, isSubmitting, errors, state]);

  const setGeneralError = useCallback((message: string) => {
    setErrors({ general: message });
  }, []);

  return {
    ui,
    setRememberMe,
    setState,
    setMode,
    toggleMode,
    onChange,
    submit,
    setGeneralError,
  };
}

export default useAuthForm;


