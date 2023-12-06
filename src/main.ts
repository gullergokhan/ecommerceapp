/// <reference types="@angular/localize" />

import { CommonModule } from "@angular/common";
import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'
import '@angular/localize/init';
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app/app.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ProductDetailsComponent } from "./app/components/product-details/product-details.component";
import { provideStore, StoreModule } from '@ngrx/store';
import {  BasketsReducer } from "./app/state/baskets/baskets.reducer";
import { Reducers } from "./app/state/reducers";


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(CommonModule, BrowserModule, SweetAlert2Module, BrowserAnimationsModule, StoreModule.forRoot(Reducers.baskets),ToastrModule.forRoot({
        closeButton: true,
        progressBar: true
    })
    , RouterModule.forRoot([
       
        {
            path: "",
            loadComponent: () => import("./app/components/layouts/layouts.component")
                .then(c => c.LayoutsComponent),
            children: [
                {
                    path: "",
                    loadComponent: () => import("./app/components/home/home.component")
                        .then(c => c.HomeComponent)
                },
              
                {
                    path: "categories",
                    loadComponent: () => import("./app/components/categories/categories.component")
                        .then(c => c.CategoriesComponent)
                },
                // {
                //   path: "product/:id",
                //   component: ProductComponent
                // },
                { path: "products/:productId",
                    component: ProductDetailsComponent },
                {
                    path: "products",
                    loadComponent: () => import("./app/components/product-list/product-list.component")
                        .then(c => c.ProductListComponent)
                },
                {
                    path: "products-edit",
                    loadComponent: () => import("./app/components/product-edit/product-edit.component")
                        .then(c => c.ProductEditComponent)
                },
            ]
        },
        {
            path: "**",
            loadComponent: () => import("./app/components/not-found/not-found.component")
                .then(c => c.NotFoundComponent)
        }
    ]), BrowserModule),
    provideStore()
]
})