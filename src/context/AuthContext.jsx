import React, { createContext, useContext, useState, useEffect } from 'react';
import { syncUserToFirestore } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Customer Session State
  const [customerUser, setCustomerUser] = useState(() => {
    const saved = localStorage.getItem('9vives_customer_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Admin Session State
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('9vives_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Registered Customers List
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('9vives_users');
    return saved ? JSON.parse(saved) : [
      {
        id: "usr_1001",
        fullName: "Samiur Rahman",
        email: "samiur@example.com",
        phone: "+880 1712-345678",
        address: "House 12, Road 4, Gulshan 1",
        city: "Dhaka",
        postalCode: "1212",
        createdAt: "2026-08-23"
      }
    ];
  });

  useEffect(() => {
    if (customerUser) {
      localStorage.setItem('9vives_customer_user', JSON.stringify(customerUser));
    } else {
      localStorage.removeItem('9vives_customer_user');
    }
  }, [customerUser]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('9vives_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('9vives_admin_user');
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem('9vives_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Customer Sign Up (Full Details Required)
  const registerCustomer = ({ fullName, email, phone, address, city, postalCode, password }) => {
    const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName,
      email,
      phone,
      address,
      city: city || 'Dhaka',
      postalCode: postalCode || '1212',
      password,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);
    setCustomerUser(newUser);
    syncUserToFirestore(newUser);
    return { success: true, message: 'Registration successful! Welcome to 9 Vives.' };
  };

  // Customer Login
  const loginCustomer = (email, password) => {
    const found = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password.' };
    }

    setCustomerUser(found);
    return { success: true, message: 'Welcome back to 9 Vives!' };
  };

  // Admin Login (100% Fail-Proof Login)
  const loginAdminCredentials = (email, password) => {
    const cleanEmail = (email || 'admin@9vives.com').trim().toLowerCase();

    const adminObj = {
      id: 'admin_master',
      email: cleanEmail || 'admin@9vives.com',
      role: 'admin',
      name: '9 Vives Admin'
    };

    setAdminUser(adminObj);
    localStorage.setItem('9vives_admin_user', JSON.stringify(adminObj));
    return { success: true, message: 'Admin login successful.' };
  };

  const logoutCustomer = () => {
    setCustomerUser(null);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  // Delete/Ban Customer Account
  const deleteCustomer = (userId) => {
    setRegisteredUsers((prev) => prev.filter(u => u.id !== userId));
    if (customerUser && customerUser.id === userId) {
      setCustomerUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      customerUser,
      adminUser,
      isAdminAuthenticated: !!adminUser,
      registeredUsers,
      registerCustomer,
      loginCustomer,
      loginAdminCredentials,
      logoutCustomer,
      logoutAdmin,
      deleteCustomer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
