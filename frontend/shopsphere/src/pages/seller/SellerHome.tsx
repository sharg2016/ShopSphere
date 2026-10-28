// frontend/shopsphere/src/pages/seller/SellerHome.tsx
import SellerNavBar from "../../components/seller/SellerNavBar";
import SellerSideBar from "../../components/seller/SellerSideBar";
import SellerDashboard from "./SellerDashboard";

const SellerHome = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
            <SellerNavBar />
            <div className="flex flex-1">
                <SellerSideBar />
                <main className="flex-1 overflow-x-hidden">
                    <SellerDashboard />
                </main>
            </div>
        </div>
    );
};

export default SellerHome;
