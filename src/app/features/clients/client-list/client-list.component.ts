import {Component} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-list',
  imports: [
    TableModule,
    Button,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  public clients: any[] = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
    {
      id: '54',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 54,
      category: 'Accessories',
      quantity: 12,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }];

  constructor(private _router: Router) {
  }

  onAddClient() {
    this._router.navigate(['add'])
  }

}
