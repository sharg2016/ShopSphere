import { ChevronDown, LucideLayoutDashboard, Handbag, ShoppingBag, BriefcaseConveyorBelt, LayersPlus, ChartColumn, Tags, Combine, TicketPercent, RectangleHorizontal } from "lucide-react";

const SellerSideBar = () => {

    return (
        <aside className="h-screen w-40 bg-white dark:bg-zinc-800">
            <nav className="flex overflow-y-auto overflow-x-visible">
                <div className="flex flex-1 flex-col gap-1 p-3">

                    <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                        <LucideLayoutDashboard className="w-4 h-4" />
                        <p className="text-sm"> DashBoard </p>
                        <ChevronDown className="w-4 h-4" />
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                        <Handbag className="w-4 h-4" />
                        <p className="text-sm"> Point of sale </p>
                        <ChevronDown className="w-4 h-4" />
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                        <ShoppingBag className="w-4 h-4" />
                        <p className="text-sm"> Orders </p>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="flex left-1 mt-2 text-[11px] text-bold text-zinc-900 dark:text-zinc-200"> Item Management</p>
                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <BriefcaseConveyorBelt className="w-4 h-4" />
                            <p className="text-sm">Items </p>
                            <ChevronDown className="w-4 h-4" />
                        </div>

                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <LayersPlus className="w-4 h-4" />
                            <p className="text-sm"> Add-On </p>
                            <ChevronDown className="w-4 h-4" />
                        </div>

                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <ChartColumn className="w-4 h-4" />
                            <p className="text-sm">Categories </p>
                            <ChevronDown className="w-4 h-4" />
                        </div>

                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <Tags className="w-4 h-4" />
                            <p className="text-sm"> Tags </p>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                    <div>
                        <p className="flex left-1 mt-2 text-[11px] text-bold text-zinc-900 dark:text-zinc-200"> Marketing Section</p>
                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <Combine className="w-4 h-4" />
                            <p className="text-sm"> Campaigns</p>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <TicketPercent className="w-4 h-4" />
                            <p className="text-sm"> Coupons </p>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-xl p-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 hover:text-black">
                            <RectangleHorizontal className="w-4 h-4" />
                            <p className="text-sm"> Banner </p>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                </div>
            </nav>
        </aside>
    );
}

export default SellerSideBar;