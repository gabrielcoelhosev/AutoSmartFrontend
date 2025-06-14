import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return (
        <>
            <AppSidebar />
            <Outlet />
        </>
    )
}
