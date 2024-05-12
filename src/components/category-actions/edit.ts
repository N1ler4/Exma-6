import { category } from "../../service/category/categories";

export const editCategory = async (categoryId: any, newName: any) => {
  try {
    const res = await category.categoryUpdate({ category_id: categoryId, category_name: newName }, categoryId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
