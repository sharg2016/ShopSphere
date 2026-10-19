import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SORT_OPTION = [

    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Top Rated", value: "top_rated" }
];

interface FilterSideBarProps {
    selectedSort: string;
    onSortChange: (value: string) => void;
    availableBrands: string[];
    selectedBrands: string[];
    onBrandToggle: (brand: string) => void;
}


const FilterSideBar = ({ selectedSort, onSortChange, availableBrands, selectedBrands, onBrandToggle }: FilterSideBarProps) => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);

    const selectedLabel = SORT_OPTION.find(o => o.value === selectedSort)?.label;


    return (
        <aside className="relative w-40 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 flex flex-col gap-4 shrink-0 overflow-y-auto">
            <h3 className="text-zinc-700 font-bold text-xl dark:text-white  ">
                Filters
            </h3>
            <div>
                <button className="flex flex-row items-center justify-between py-1.5 w-full px-2"
                    onClick={() => setIsSortOpen(prev => !prev)}>
                    <h3 className="font-semibold text-zinc-800 text-sm dark:text-zinc-200 ">Sort</h3>
                    <ChevronDown className={`w-4 h-4 text-zinc-800 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Selected value preview */}
                {!isSortOpen && (
                    <p className="text-xs text-purple-600 dark:text-purple-400 px-2 mt-0.5">
                        {selectedLabel}
                    </p>
                )}

                {/* Dropdown Option */}
                {isSortOpen && (
                    <div>
                        {SORT_OPTION.map(option => (
                            <button key={option.value}
                                onClick={() => {
                                    onSortChange(option.value);
                                    setIsSortOpen(false);
                                }}
                                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors
                            ${selectedSort === option.value ?
                                        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold"
                                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 "
                                    }`}
                            >
                                {option.label}

                            </button>

                        ))}
                    </div>
                )}

            </div>
            <div>
                <button className="flex flex-row item-center justify-between py-1.5 w-full px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    onClick={() => setIsBrandOpen(prev => !prev)}>
                    <span className="font-semibold text-zinc-800 text-sm dark:text-zinc-200">Brands</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isBrandOpen ? "rotate-180" : ""}`} />
                </button>

                {!isBrandOpen && selectedBrands.length > 0 && (
                    <p className="text-xs text-purple-600 px-2 mt-0.5">
                        {selectedBrands.length} selected
                    </p>
                )}

                {isBrandOpen && (
                    <div className="mt-1 flex flex-col gap-0.5 overflow-y-auto">
                        {availableBrands.map(brand => (
                            <button
                                key={brand}
                                onClick={() => onBrandToggle(brand)}
                                className={`w-full text-left text-xs px-3 py-3 rounded-lg flex items-center gap-3 transition-colors
                                ${selectedBrands.includes(brand)
                                        ? "bg-purple-100 dark:bg-purple-700 font-semibold"
                                        : "text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300"
                                    }`}>
                                <span className={`w-3 h-3 rounded border flex-shrink-0
                                        ${selectedBrands.includes(brand)
                                        ? "bg-purple-600 border-purple-600"
                                        : "border-zinc-400"
                                    }`} />
                                {brand}

                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}

export default FilterSideBar;