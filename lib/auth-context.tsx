"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  username: string;
  role: "admin" | "parent" | "child";
  name: string;
  email?: string;
  age?: number;
  school?: string;
  grade?: string;
  parentId?: string;
  children?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  checkAuth: () => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users with different roles
const DEMO_USERS: User[] = [
  {
    id: "1",
    username: "admin",
    role: "admin",
    name: "Admin User",
    email: "admin@schoolbus.com",
  },
  {
    id: "2",
    username: "parent",
    role: "parent",
    name: "Ahmed Mohamed",
    email: "ahmed@example.com",
    children: ["4", "5"],
  },
  {
    id: "3",
    username: "parent2",
    role: "parent",
    name: "Fatima Ali",
    email: "fatima@example.com",
    children: ["6"],
  },
  {
    id: "4",
    username: "child1",
    role: "child",
    name: "Omar Ahmed",
    age: 12,
    school: "Al-Azhar School",
    grade: "Grade 7",
    parentId: "2",
  },
  {
    id: "5",
    username: "child2",
    role: "child",
    name: "Layla Ahmed",
    age: 8,
    school: "Al-Azhar School",
    grade: "Grade 3",
    parentId: "2",
  },
  {
    id: "6",
    username: "child3",
    role: "child",
    name: "Yusuf Ali",
    age: 10,
    school: "International School",
    grade: "Grade 5",
    parentId: "3",
  },
];

// Demo credentials
const VALID_CREDENTIALS = [
  { username: "admin", password: "123", userId: "1" },
  { username: "parent", password: "parent123", userId: "2" },
  { username: "parent2", password: "parent123", userId: "3" },
  { username: "child1", password: "child123", userId: "4" },
  { username: "child2", password: "child123", userId: "5" },
  { username: "child3", password: "child123", userId: "6" },
];

// Role-based permissions
const PERMISSIONS = {
  admin: [
    "view_all_routes",
    "manage_routes",
    "manage_alerts",
    "manage_schedules",
    "view_all_users",
    "manage_users",
    "view_analytics",
    "send_notifications",
  ],
  parent: [
    "view_child_location",
    "manage_child_profile",
    "view_routes",
    "create_carpool",
    "join_carpool",
    "send_messages",
    "receive_notifications",
    "view_schedules",
  ],
  child: [
    "view_own_schedule",
    "view_own_route",
    "send_messages",
    "receive_notifications",
    "view_bus_location",
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    checkAuth()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const token = Cookies.get("auth_token");
      const savedUserId = Cookies.get("user_id");

      if (!token || !savedUserId) {
        return false;
      }

      const foundUser = DEMO_USERS.find((u) => u.id === savedUserId);

      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      return false;
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const credential = VALID_CREDENTIALS.find(
        (cred) => cred.username === username && cred.password === password
      );

      if (!credential) {
        return false;
      }

      const foundUser = DEMO_USERS.find((u) => u.id === credential.userId);

      if (!foundUser) {
        return false;
      }

      setUser(foundUser);
      setIsAuthenticated(true);

      // Set cookies with expiration
      Cookies.set("auth_token", `demo-token-${Date.now()}`, { expires: 7 }); // 7 days
      Cookies.set("user_id", foundUser.id, { expires: 7 });

      // Redirect to the original requested page or home
      const from = searchParams.get("from") || "/";
      router.push(from);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("auth_token");
    Cookies.remove("user_id");
    router.push("/login");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const userPermissions = PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        checkAuth,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper function to get user data by ID
export function getUserById(id: string): User | undefined {
  return DEMO_USERS.find((user) => user.id === id);
}

// Helper function to get children of a parent
export function getChildrenByParentId(parentId: string): User[] {
  return DEMO_USERS.filter((user) => user.parentId === parentId);
}
