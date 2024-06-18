export interface FormValuesThreshold {
  stormsThreshold?: number
  hurricanesThreshold?: number
  heavyRainThreshold?: number
  extremeTemperatureThreshold?: number
  notificationEmail?: string
  smsNumber?: string
  pushNotifications?: boolean
  location?: string
}

export const initialValuesThreshold = {
  stormsThreshold: undefined,
  hurricanesThreshold: undefined,
  heavyRainThreshold: undefined,
  extremeTemperatureThreshold: undefined,
  notificationEmail: '',
  smsNumber: '',
  pushNotifications: false,
  location: '',
}
