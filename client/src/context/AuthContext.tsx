import { createContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => void;
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => void;
  logout: () => void;
  handleOpenLoginModal: () => void;
  handleCloseLoginModal: () => void;
  handleOpenSignupModal: () => void;
  handleCloseSignupModal: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isLoading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  handleOpenLoginModal: () => {},
  handleCloseLoginModal: () => {},
  handleOpenSignupModal: () => {},
  handleCloseSignupModal: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch current user
  const { 
    data: user, 
    isLoading: isLoadingUser,
    error: userError,
    refetch 
  } = useQuery<User>({ 
    queryKey: ['/api/users/me'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/users/me', { credentials: 'include' });
        if (res.status === 401) {
          return null;
        }
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        return res.json();
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });
  
  // Login mutation
  const { mutate: loginMutate, isPending: isLoginPending } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await apiRequest('POST', '/api/users/login', credentials);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/users/me'], data);
      toast({
        title: "Welcome back!",
        description: `You have successfully logged in as ${data.firstName}.`,
      });
      handleCloseLoginModal();
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  });
  
  // Register mutation
  const { mutate: registerMutate, isPending: isRegisterPending } = useMutation({
    mutationFn: async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
      const res = await apiRequest('POST', '/api/users/register', userData);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/users/me'], data);
      toast({
        title: "Account created!",
        description: `Welcome to E-Donate, ${data.firstName}!`,
      });
      handleCloseSignupModal();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create your account. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Logout mutation
  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/users/logout', {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/users/me'], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message || "Could not log out. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Modal handlers
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };
  
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };
  
  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  
  // Auth functions
  const login = (credentials: { email: string; password: string }) => {
    loginMutate(credentials);
  };
  
  const register = (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    registerMutate(userData);
  };
  
  const logout = () => {
    logoutMutate();
  };
  
  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated: !!user,
        isLoginModalOpen,
        isSignupModalOpen,
        isLoading: isLoginPending || isRegisterPending,
        login,
        register,
        logout,
        handleOpenLoginModal,
        handleCloseLoginModal,
        handleOpenSignupModal,
        handleCloseSignupModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
