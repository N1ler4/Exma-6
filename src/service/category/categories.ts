import http from "@http";

interface PostData {
  category_name: string;
}

interface GetData {
  page: number;
  limit: number;
}

interface UpdateData extends PostData {
  category_id: string;
}

interface Category {
  categoryPost: (data: PostData) => any;
  categoryDelete: (id: string) => any;
  categoryGet: (data: GetData) => any;
  categoryUpdate: (data: UpdateData , id:UpdateData) => any;
}

export const category: Category = {
  categoryPost: (data) => http.post("/category", data),
  categoryDelete: (id) => http.delete(`/category/${id}`),
  categoryGet: (data) => http.get(`/categories?page=${data.page}&limit=${data.limit}`),
  categoryUpdate: (data) => http.put(`/category`, data)
};

