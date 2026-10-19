import { Camera, ChevronLeft, ChevronRight, Laptop, Smartphone, Speaker, Tablet, Tv, WashingMachine } from "lucide-react"
import { useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom";

const SideBar = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [width, setWidth] = useState(50);
    const isResizing = useRef(false);
    const navigate = useNavigate();

    const [tooltip, setTooltip] = useState<{ label: string; y: number | null }>(null);


    const minWidth = 50;
    const maxwidth = 256;

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = e.clientX;
        if (newWidth >= minWidth && newWidth <= maxwidth) {
            setWidth(newWidth);
        }
        if (newWidth >= 180) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }


    }, []);

    const handleMouseUp = useCallback(() => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, []);

    const StartResizing = useCallback(() => {
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp)
    }, []);

    const menuItems = [
        { icon: Camera, label: 'Camera', slug: 'Camera' },
        { icon: Laptop, label: 'Laptops', slug: 'Laptop' },
        { icon: Smartphone, label: 'SmartPhones', slug: 'SmartPhone' },
        { icon: Tv, label: 'SmartTV', slug: 'TV' },
        { icon: Speaker, label: 'Speakers', slug: 'Speaker' },
        { icon: Tablet, label: 'Tablets', slug: 'Tablet' },
        { icon: WashingMachine, label: 'Washing Machines', slug: 'Washing-Machine' }
    ];

    return (
        <>
            <aside
                className={`relative bg-slate-900 h-[calc(100vh-3.5rem)] text-white flex flex-col select-none border-r border-slate-800 shrink-0`}
                style={{ width: isExpanded ? '256px' : `${width}px` }}
            >
                <button
                    onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>

                <nav className="flex-1 overflow-y-auto overflow-x-visible">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a key={index}
                                onClick={() => navigate(`/product/${item.slug}`)}
                                className="relative flex item-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-color group"
                                onMouseEnter={(e) => {
                                    if (!isExpanded) {
                                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                        setTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                                    }
                                }}
                                onMouseLeave={() => setTooltip(null)}>
                                <Icon size={18} className="shrink-0 text-slate-400 group-hover:text-indigo-400" />
                                {isExpanded && <span className="font-small text-sm trunctate">
                                    {item.label}
                                </span>}
                            </a>
                        );
                    })}
                </nav>
                <div
                    onMouseDown={StartResizing}
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize opacity-0 hover:opacity-100 hover:bg-indigo-500/20 z-10"
                />
            </aside>

            {tooltip && !isExpanded && (
                <div className="fixed z-[9999] pointer-events-none"
                    style={{
                        left: width + 8,
                        top: tooltip.y,
                        transform: 'translateY(-50%)'
                    }}>
                    <div className="relative bg-slate-700 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                        {/* Arrow */}
                        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-700" />
                        {tooltip.label}
                    </div>
                </div>
            )}
        </>
    )
}

export default SideBar;