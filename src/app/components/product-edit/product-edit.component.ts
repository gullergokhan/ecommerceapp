import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product, ProductDataType } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'angular-toastify';
import { ModalDismissReasons, NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [SharedModule,LoadingSpinnerComponent,NgbPagination],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  productsPaginated: Product[] = [];
  totalProducts: number = 0;

  page: number = 1;
  pageSize: number = 5;

  isLoading: boolean = false;
  isError: boolean = false;

  productData: ProductDataType = {
    title: '',
    price: '',
    description: '',
    category: '',
  };

  closeResult = '';

  constructor(
    private productsService: ProductService,
    private modalService: NgbModal,
    private _toastService: ToastService,
    
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.totalProducts = products.length;
        this.isLoading = false;
        this.refreshProducts();
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error(err);
      }
    );

    this.productsService.getCategories().subscribe(
      (products) => {
        this.categories = products;
        this.isLoading = false;
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  
  refreshProducts() {
    this.productsPaginated = this.products.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }


  openAddProductModel(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  
  openConifirmationDeleteModel(
    content: TemplateRef<any>,
    productId: number
  ): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.deleteProduct(productId);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEditProductModel(content: TemplateRef<any>, productId: number) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result === 'yes') {
          this.updateProduct(productId, this.productData);
        }
      },
      (reason) => {
        console.log(reason);
        this.resetProductDate();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    const product = this.products.find((product) => product.id === productId);
    if (product) {
      this.productData = {
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
      };
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  resetProductDate() {
    this.productData = {
      title: '',
      price: '',
      description: '',
      category: '',
    };
  }
  onSubmitAddProduct() {
    const { title, category, description, price } = this.productData;
    if (
      title.length > 0 &&
      category.length > 0 &&
      description.length > 0 &&
      Number(price) > 0
    ) {
      this.productsService
        .createProduct({
          ...this.productData,
          image: `https://source.unsplash.com/collection/${Date.now()}/480x480`,
        })
        .subscribe(
          (product) => {
            this._toastService.success(
             ('CREATE_PRODUCT_SUCCESS')
            );
            this.products.unshift({
              ...product,
              rating: {
                rate: 0,
                count: 0,
              },
            });
            this.refreshProducts();
          },
          (error) => {
            console.error('Error creating product:', error);
            this._toastService.error(
              ('CREATE_PRODUCT_FAIL')
            );
          }
        );

      this.resetProductDate();
      this.modalService.dismissAll();
    }
  }

  deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId).subscribe(
      (deletedProduct) => {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        this.refreshProducts();
        this._toastService.success(
          ('DELETE_PRODUCT_SUCCESS')
        );
      },
      (error) => {
        console.error(error);
        this._toastService.error(('DELTE_PRODUCT_FAIL'));
      }
    );
  }

  updateProduct(productId: number, proctuctData: ProductDataType) {
    this.productsService.updateProduct(proctuctData, productId).subscribe(
      (updatedProduct) => {
        this.products = this.products.map((product) =>
          product.id === updatedProduct.id
            ? {
                ...updatedProduct,
                rating: product.rating,
                image: product.image,
              }
            : product
        );
        this.resetProductDate();
        this.refreshProducts();
        this._toastService.success(
          ('UPDATE_PRODUCT_SUCCESS')
        );
      },
      (error) => {
        console.error(error);
        this._toastService.error(('UPDATE_PRODUCT_FAIL'));
      }
    );
  }
}
