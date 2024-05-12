import { category } from "../../service/category/categories";

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await category.categoryDelete(categoryId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
