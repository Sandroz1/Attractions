import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('DOAHDOQHDOIQDQH')
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Restored user from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);x``
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Saving user to localStorage:", user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("Removing user from localStorage");
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
