import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  Login,
  Categories,
  Products,
  Users,
  SinglePage,
  ProtectMain,
  ProtectAuth
} from "@pages";
import MainLayout from "@layout";

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<ProtectMain element={<Login />} />} />
        <Route path="/main/*" element={<ProtectAuth element={<MainLayout />}/>}>
          <Route index element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SinglePage />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
