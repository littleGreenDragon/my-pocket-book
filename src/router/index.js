import { createBrowserRouter } from "react-router-dom";
import Month from "@/pages/Month/Month";
import Layout from "@/pages/Layout/Layout";
// import New from "@/pages/New/New";
// import Year from "@/pages/Year/Year";
import Sign from "@/pages/Sign/Sign";
// import Home from "@/pages/Home/Home";
import Auth from "@/components/Auth/Auth";
import { Suspense, lazy } from "react";

const Home = lazy(()=>import("@/pages/Home/Home"));
const Year = lazy(()=>import("@/pages/Year/Year"));
const New = lazy(()=>import("@/pages/New/New"));


let router = createBrowserRouter([
    {
        path:'/layout',
        element:<Auth><Layout/></Auth>,
        children:[
            {
                index:true,
                element:<Suspense><Month/></Suspense>
            },
            {
                path:'year',
                element:<Suspense><Year/></Suspense>,
            },
            {
                path:'home',
                element:<Suspense><Home/></Suspense>
            }
        ]
    },
    {
        path:'/new',
        element:<Suspense><Auth><New/></Auth></Suspense>
    },
    {
        path:'/',
        index:true,
        element:<Sign/>
    }
]);

export default router;