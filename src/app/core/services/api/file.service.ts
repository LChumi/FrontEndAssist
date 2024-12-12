import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Items} from "@models/record/items";
import {ErrorResponse} from "@models/error/error-response";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = environment.apiUrlBase+'assist'
  http = inject(HttpClient)

  constructor() { }

  sendExcel(file: File, empresa: string): Observable<Items[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('empresa', empresa);

    return this.http.post<Items[]>(`${this.baseUrl}/excel/solicitud`, formData)
  }

}
