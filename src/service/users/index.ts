import http from "@http";

export interface PostData {
  email: string,
  first_name: string,
  gender: string,
  last_name: string,
  password: string,
}

interface GetData {
  page: number;
  limit: number;
}

interface UpdateData extends PostData {
  id: string,
  age:string,
  phone_number:string
}

interface Users {
  usersPost: (data: PostData) => any;
  usersDelete: (id: string) => any;
  usersGet: (data: GetData) => any;
  usersUpdate: (data: UpdateData) => any;
}

export const users: Users = {
  usersPost: (data) => http.post("/user", data),
  usersDelete: (id) => http.delete(`/user/${id}`),
  usersGet: (data) => http.get(`/users?page=${data.page}&limit=${data.limit}`),
  usersUpdate: (data) => http.put(`/user`, data)
};
