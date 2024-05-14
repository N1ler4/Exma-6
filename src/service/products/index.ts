import http from  "@http" ;

export interface PostData {
    age_max: number | null;
    age_min: number | null;
    category_id: any;
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
  name:string
}

interface UpdateData extends PostData {
   products_id: any;
}


interface  Products {
   productsPost: (data: PostData) => any;
   productsDelete: (id: any) => any;
   productsGet: (data: GetData) => any;
   productsUpdate: (data: UpdateData) => any;
   singleProducts : (id :string) => any;
}


export const  products:  Products = {
   productsPost: (data) => http.post( "/product" , data),
   productsDelete: (id) => http.delete(`/product/${id}`),
   productsGet: (data) => http.get(`/products?page=${data.page}&limit=${data.limit}&name=${data.name}`),
   productsUpdate: (data) => http.put(`/product`, data),
   singleProducts : (id) => http.get(`/product/${id}`),
}
