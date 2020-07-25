import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/classes/product';
import {User} from '../../shared/classes/user';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    products: Product[];

    constructor(private productService: ProductService) {

    }

    ngOnInit() {
        this.productService.getAllProducts()
            .subscribe(products => {
                this.products = products;
            });
    }

    isDonationTimespan() {
        const currentDate = new Date();

        return currentDate.getFullYear() === 2018 &&
            currentDate.getMonth() === 11 &&
            currentDate.getDate() < 26;
    };
}
