import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit{
  
  displayedColumns: string[] = ['idProduct', 'nameProduct', 'descriptionProduct', 'skuProduct', 'eanProduct', 'costPriceProduct', 'amountProduct','dateCreatedProduct', 'publishedProduct','deleteProduct','findProduct'];
  ELEMENT_DATA: Product[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  product: Product = {
  idProduct: '',
  nameProduct: '',
  descriptionProduct: '',
  skuProduct: '',
  eanProduct: '',
  costPriceProduct: '',
  amountProduct: '',
  dateCreatedProduct:'',
  publishedProduct: false,
  idCategory:1
  }
  constructor(private productService:ProductService){
    
  }
  ngOnInit(): void {
    this.listProduct();
  }

  public saveProduct(){
    const datePipe = new DatePipe('en-US');
    this.product.dateCreatedProduct = datePipe.transform(this.product.dateCreatedProduct, 'dd/MM/yyyy');
    
    if (this.product.idProduct== ""){
    this.productService.save(this.product).subscribe({next: response =>{
      this.success = true;
      this.errors = [];
      this.listProduct();    
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {         
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;        
      }
    }})}
    else{
      this.productService.update(this.product).subscribe({next: response =>{
      this.success = true;
      this.errors = [];    
      this.listProduct();    
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {         
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;        
      }
    }})
    }
  }

  public listProduct() {
    this.productService.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Product[];
      this.dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProduct(product: Product) {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      this.productService.delete(product.idProduct).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listProduct();
      });
    }
  }

  findProduct(product: Product) {    
    this.productService.findById(product.idProduct).subscribe((response: any) => {
      this.product = response.result as Product;
      const datePipe = new DatePipe('en-US');
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate;
    });
  }


}
