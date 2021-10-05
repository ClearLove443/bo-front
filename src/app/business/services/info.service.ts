import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { InfoStore } from '../states/info.store';

@Injectable({ providedIn: 'root' })
export class InfoService {
  constructor(private infoStore: InfoStore, private http: HttpClient) {}
}
