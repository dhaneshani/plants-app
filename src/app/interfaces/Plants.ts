export interface PlantDetails {
  address: string,
  city? : string,
  country: string,
  default_language? : string,
  description? : string,
  division : string,
  id: string,
  manager?:string
  name: string,
  phone?:string
}

export interface PlantsResponse {
  next: string,
  plants: Array<PlantDetails>
}
