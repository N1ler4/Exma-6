import http from  "@http" ;

export interface PostData {
    age_max: number | null;
    age_min: number | null;
    products_id: string;
    color: string;
    cost: number | null;
    count: number;
    description: string;
    discount: number | null;
    for_gender: string;
    made_in: string;
    product_name: string;
    size: number | null;
}

interface GetData {
  page: number;
  limit: number;
}

interface UpdateData extends PostData {
   products_id: string;
}

interface  Products {
   productsPost: (data: PostData) => any;
   productsDelete: (id: string) => any;
   productsGet: (data: GetData) => any;
   productsUpdate: (data: UpdateData , id:UpdateData) => any;
}

export const  products:  Products = {
   productsPost: (data) => http.post( "/product" , data),
   productsDelete: (id) => http.delete(`/product/${id}`),
   productsGet: (data) => http.get(`/products?page=${data.page}&limit=${data.limit}`),
   productsUpdate: (data) => http.put(`/product`, data)
};

