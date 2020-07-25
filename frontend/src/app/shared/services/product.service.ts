import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Product} from '../classes/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient, private baseService: BaseService, private authService: AuthService) {
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(
            this.baseService.buildApiUrl('products'),
            this.authService.getHttpOptionsWithAuthentification()
        )
    }
}
