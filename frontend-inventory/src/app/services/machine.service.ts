import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private apiUrl = 'http://localhost:3000/machines'; // Cambiar si el backend tiene otro puerto

  constructor(private http: HttpClient) {}

  getMachines(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMachine(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMachine(machine: any): Observable<any> {
    return this.http.post(this.apiUrl, machine);
  }

  updateMachine(id: string, machine: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, machine);
  }

  deleteMachine(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

