import { useContext } from 'react'

import { BLEContext } from '../Context/BLEContext'

export function useBLE() {

  const context = useContext(BLEContext)

  if (!context) {
    throw new Error('useBLE must be used within a BluetoothProvider')
  }

  return context
}