export interface FormValuesUser {
  name: string
  location: string
  temperatureUnit: string
  language: string
}

export const initialValuesUser = {
  name: '',
  location: '',
  temperatureUnit: 'celcius',
  language: 'en',
}
