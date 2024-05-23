
export interface loginInterface{
    email: string,
    password: string
}

export interface CategoryPost{
    category_name: string;
}
export interface CategoryUpdate{
    category_name: string;
    category_id: string;
}
export interface CategoryGet{
    category_name: string;
}

export interface Category{
    categoryPost:(data:CategoryPost)=>any,
    categoryUpdate:(data:CategoryUpdate)=>any
    categoryGet:(data:CategoryGet)=>any
}
export interface ProtectedRouterProps{
    element:JSX.Element;
  }