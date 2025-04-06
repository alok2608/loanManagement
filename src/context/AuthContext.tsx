
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
  // Admin management functions
  getAllUsers: () => User[];
  addUser: (user: Omit<User, "id">) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, userData: Partial<Omit<User, "id">>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "admin@example.com",
    role: "admin",
    avatarUrl: "https://i.pravatar.cc/150?u=admin"
  },
  {
    id: "2",
    name: "John Okoh",
    email: "verifier@example.com",
    role: "verifier",
    avatarUrl: "https://i.pravatar.cc/150?u=verifier"
  },
  {
    id: "3",
    name: "Alice Smith",
    email: "borrower@example.com",
    role: "borrower",
    avatarUrl: "https://i.pravatar.cc/150?u=borrower"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load mock users
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(mockUsers);
      localStorage.setItem("users", JSON.stringify(mockUsers));
    }

    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password === "password") {
        // Save user to localStorage and state
        localStorage.setItem("user", JSON.stringify(foundUser));
        setUser(foundUser);
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("You have been logged out");
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    if (requiredRole === "admin") {
      return user.role === "admin";
    }
    
    if (requiredRole === "verifier") {
      return user.role === "admin" || user.role === "verifier";
    }
    
    return true; // Everyone has borrower permissions
  };

  // Admin management functions
  const getAllUsers = (): User[] => {
    return users;
  };

  const addUser = async (newUser: Omit<User, "id">): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
        throw new Error("A user with this email already exists");
      }

      // Create new user with generated ID
      const userToAdd: User = {
        ...newUser,
        id: `user-${Date.now()}`,
      };

      const updatedUsers = [...users, userToAdd];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success(`User ${newUser.name} added successfully`);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add user");
      throw error;
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if attempting to delete current user
      if (user?.id === userId) {
        throw new Error("You cannot delete your own account");
      }

      // Check if user exists
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) {
        throw new Error("User not found");
      }

      // Remove user
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success(`User ${userToDelete.name} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete user");
      throw error;
    }
  };

  const updateUser = async (userId: string, userData: Partial<Omit<User, "id">>): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      // Check if email is being changed and already exists
      if (userData.email && 
          userData.email !== users[userIndex].email && 
          users.some(u => u.id !== userId && u.email.toLowerCase() === userData.email?.toLowerCase())) {
        throw new Error("A user with this email already exists");
      }

      // Update user
      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        ...userData,
      };

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // If updating the current logged-in user, update that too
      if (user && user.id === userId) {
        const updatedUser = {
          ...user,
          ...userData,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success(`User ${updatedUsers[userIndex].name} updated successfully`);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update user");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      hasPermission,
      getAllUsers,
      addUser,
      deleteUser,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
