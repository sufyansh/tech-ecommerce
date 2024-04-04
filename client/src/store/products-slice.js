import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    products: [],
    filteredProducts: [],
    productDetails: [],
    totalProducts: 0,
    minPrice: 0,
    maxPrice: 0,
    maxSize: 0,
    minSize: 0,
    maxWidth: 0,
    minWidth: 0,
    sort: 'price-lowest',
    filters: {
        search: '',
        category: 'all',
        dimension: 0,
        width: 0,
        price: 0,
        shipping: false
    }
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        replaceProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
            state.totalProducts = action.payload.length;
            // set min and max prices
            let prices = state.products.map((product) => product.price);
            let dimension = state.products.map((product) => product.dimension);
            let width = state.products.map((product) => product.width);

            
            state.maxPrice = Math.max(...prices);
            state.minPrice = Math.min(...prices);
            state.maxPrice = Math.max(...prices);
            state.minSize = Math.min(...dimension);
            state.maxSize = Math.max(...dimension);
            state.minWidth = Math.min(...width);
            state.maxWidth = Math.max(...width);
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        sortProducts: (state, action) => {
            const value = action.payload;
            let tempProducts = [];
            if (value === 'price-lowest') {
                tempProducts = state.filteredProducts.sort((a, b) => {
                    return a.price - b.price;
                })
            }
            if (value === 'price-highest') {
                tempProducts = state.filteredProducts.sort((a, b) => {
                    return b.price - a.price;
                })
            }
            if (value === 'name-a') {
                tempProducts = state.filteredProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                })
            }
            if (value === 'name-z') {
                tempProducts = state.filteredProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                })
            }
            state.filteredProducts = tempProducts;
            state.sort = value;
        },
        filterProducts: (state, action) => {
            const { search, category, dimension, price, shipping , width} = action.payload;
            console.log(action.payload);
            let tempProducts = state.products;
            if (search) {
                tempProducts = tempProducts.filter((product) => 
                    product.name.toLowerCase().includes(search)
                );
            }
            if (category !== 'all') {
                tempProducts = tempProducts.filter(
                    (product) => product.category === category
                )
            }
            if (shipping) {
                tempProducts = tempProducts.filter(
                    (product) => product.shipping === 1
                )
            }
            tempProducts = tempProducts.filter(
                (product) => product.price <= price
            )
            tempProducts = tempProducts.filter(
                (product) => product.dimension <= dimension
            )
            tempProducts = tempProducts.filter(
                (product) => product.width <= width
            )
            state.filteredProducts = tempProducts;
            state.totalProducts = tempProducts.length;
        },
        clearFilter: (state, action) => {
            state.filteredProducts = state.products;
            state.totalProducts = state.products.length;
            state.filters = {
                ...state.filters,
                search: '',
                category: 'all',
                price:0,
                dimension: 0,
                width: 0,
                shipping: false
            }
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        },
        // addProduct: (state, action) => {
        //     const product = action.payload;
        //     state.products.unshift(product);
        // }
    }
});



export const productsActions = productsSlice.actions;

export default productsSlice;