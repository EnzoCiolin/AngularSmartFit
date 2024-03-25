import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly apiURl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([])
  private allunits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = []

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get<UnitsResponse>(this.apiURl).subscribe(data => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations
    })
  }

  getAllUnits(): Observable<Location[]>{
    return this.allunits$
  }

  getFilterUnits(){
    return this.filteredUnits
  }

  setFilterUnits(value:Location[]){
    this.filteredUnits = value
  }
}
