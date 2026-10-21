'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export interface DashboardContextType {
  isLive: boolean
  setIsLive: (val: boolean) => void
  openQuickLinkModal: boolean
  setOpenQuickLinkModal: (val: boolean) => void
}

export const DashboardContext = createContext<DashboardContextType>({
  isLive: false,
  setIsLive: () => {},
  openQuickLinkModal: false,
  setOpenQuickLinkModal: () => {},
})

export const useDashboard = () => useContext(DashboardContext)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [isLive, setIsLive] = useState(false)
  const [openQuickLinkModal, setOpenQuickLinkModal] = useState(false)

  return (
    <DashboardContext.Provider
      value={{
        isLive,
        setIsLive,
        openQuickLinkModal,
        setOpenQuickLinkModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
