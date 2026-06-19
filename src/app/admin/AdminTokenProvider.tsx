"use client";

import React, { createContext, useContext, ReactNode } from "react";

const AdminTokenContext = createContext<string>("");

export function AdminTokenProvider({ token, children }: { token: string; children: ReactNode }) {
  return (
    <AdminTokenContext.Provider value={token}>
      {children}
    </AdminTokenContext.Provider>
  );
}

export function useAdminToken() {
  return useContext(AdminTokenContext);
}
