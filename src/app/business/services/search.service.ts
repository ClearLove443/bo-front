import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchStore } from '../states/search.store';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private searchStore: SearchStore, private http: HttpClient) {}
}
