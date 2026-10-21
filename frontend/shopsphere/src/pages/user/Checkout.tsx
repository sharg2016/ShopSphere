import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Landmark, MapPin, Package, ShoppingBag, Smartphone, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import React, { useState } from "react";
import { clearCart } from "../../store/cartSlice";

interface ShippingForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

interface PaymentForm {
    method: 'CARD' | 'UPI' | 'COD';
    cardNumber: string;
    cardExpiry: string;
    cvv: string;
    cardHolderName: string;
    upiId: string;
}

type Checkoutstep = 'Shipping' | 'payment' | 'confirmation';

type OrderTrackingStep = 'Packed' | 'Shipping' | 'Out for Delivery' | 'Delivered';

const ORDER_TRACKING_STEP: OrderTrackingStep[] = ['Packed', 'Shipping', 'Out for Delivery', 'Delivered'];


const STEP_LABLES: Record<OrderTrackingStep, string> = {
    Packed: 'Order Packed',
    Shipping: 'Shipping Order',
    'Out for Delivery': 'Out for Delivery',
    Delivered: 'Delivered'
};

const INDIAN_STATES = ['Andaman and Nicobar', 'Andra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Daman and diu', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Puducherry', 'Rajasthan', 'Sikkim', 'Telangana', 'Tamil Nadu', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

interface SummaryProps {
    items: { productId: string, name: string, image: string, price: number, quantity: number }[];
    subtotal: number;
    tax: number;
    total: number;
}

const OrderSummaryContent = ({ items, subtotal, tax, total }: SummaryProps) => (
    <div>
        <div className="space-y-3 mb-5">
            {items.map(item => (
                <div key={item.productId} className="flex gap-3 items-center">
                    <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-purple-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                        </span>
                    </div>
                    <p className="flex-1 text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2">
                        {item.name}
                    </p>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white shrink-0">
                        ₹{((item.price * item.quantity).toFixed(2))}
                    </span>
                </div>
            ))}
        </div>
        <div className="border-t border-zinc-100 dark:border-zinc-700 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>
                    Subtotal
                </span>
                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400 font-semibold"> FREE </span>
            </div>
            <div className="border-t border-zinc-500 dark:border-zinc-600 pt-3 flex justify-between font-bold text-zinc-900 dark:text-white text-base">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="mt-4 flex  items-center gap-2 bg-green-50 dark:bg-green-900/20 rounded-xl px-3">
                <Truck className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <p className="text-xs text-green-700 dark:text-green-400">
                    <span className="font-semibold"> FREE Delivery</span> on this order!
                </p>
            </div>
        </div>
    </div>
);

const CHECKOUT_STEPS: {
    key: Checkoutstep;
    label: string;
    icon: React.ReactNode
}[] = [
        {
            key: 'Shipping',
            label: 'Shipping',
            icon: <MapPin className="w-4 h-4" />
        },
        {
            key: 'payment',
            label: 'Payment',
            icon: <CreditCard className="w-4 h-4" />
        },
        {
            key: 'confirmation',
            label: 'Confirmation',
            icon: <CheckCircle2 className="w-4 h-4" />
        }
    ];

const StepIndicator = ({ current }: { current: Checkoutstep }) => {
    const currentIndex = CHECKOUT_STEPS.findIndex((s) => s.key === current);
    return (
        <div className="flex items-center justify-center mb-8">
            {CHECKOUT_STEPS.map((step, index) => {
                const done = index < currentIndex;
                const active = index === currentIndex;
                return (
                    <div className="flex items-center" key={step.key}>
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${done ? "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/40" : active ? "bg-purple-600 text-white ring-4 ring-purple-200 dark-ring-purple-900/40 shadow-lg" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"}`}>
                                {done ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                            </div>
                            <span className={`text-[11px] font-medium ${active ? "text-purple-600 dark:text-purple-400" : done ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-400 dark:text-zinc-600"}`}>
                                {step.label}
                            </span>
                        </div>
                        {index < CHECKOUT_STEPS.length - 1 && (
                            <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500 ${index < currentIndex ? "bg-purple-600" : "bg-zinc-200 dark:bg-zinc-700"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const OrderTracker = ({ currentStep }: { currentStep: OrderTrackingStep }) => {
    const currentIndex = ORDER_TRACKING_STEP.indexOf(currentStep);
    return (
        <div className="flex flex-col gap-0 mt-6">
            {ORDER_TRACKING_STEP.map((step, index) => {
                const done = index <= currentIndex;
                const isLast = index === ORDER_TRACKING_STEP.length - 1;
                return (
                    <div key={step} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${done ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-purple-900/30" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}`}>
                                {done ? <CheckCircle2 className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                            </div>
                            {!isLast && (
                                <div className={`w-0.5 h-8 mt-0.5 rounded-full ${done ? "bg-purple-400" : "bg-zinc-200 dark:bg-zinc-700"}`} />
                            )}
                        </div>
                        <div className="pb-6">
                            <p className={`text-sm font-semibold ${done ? "text-purple-600 dark:text-purple-400" : "text-zinc-400 dark:text-zinc-600"}`}>
                                {STEP_LABLES[step]}
                            </p>
                            {index === currentIndex && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5"> Current status</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    maxLength?: number;
}

const InputField = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required,
    maxLength
}: InputFieldProps) => (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide text-left">
            {label} {required && <span className="text-red-500">*</span>} </label>
        <input id={id} type={type} placeholder={placeholder} value={value}
            onChange={onChange} required={required} maxLength={maxLength}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placehoder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
        />
    </div>
);
const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subTotal * 0.18;
    const total = subTotal + tax;

    const summaryItems = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
    }));

    const [step, setStep] = useState<Checkoutstep>("Shipping");
    const [shipping, setShipping] = useState<ShippingForm>({ fullName: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });
    const [payment, setPayment] = useState<PaymentForm>({ method: "CARD", cardNumber: "", cardExpiry: "", cvv: "", cardHolderName: "", upiId: "" });

    const [orderId] = useState(() => `SS${Date.now().toString().slice(-8).toUpperCase()}`);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    if (cartItems.length === 0 && step !== "confirmation") {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center gap-6 p-8">
                <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">Your cart is Empty. </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-xs">
                    Add some items to your cart before checking out.
                </p>
                <Link to="/"
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md">
                    Browse Products
                </Link>
            </div>
        );
    }

    const updateShipping = (field: keyof ShippingForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setShipping((prev) =>
        ({ ...prev, [field]: e.target.value })
    );

    const updatePayment = (field: keyof PaymentForm) => (e: React.ChangeEvent<HTMLInputElement>) => setPayment((prev) =>
        ({ ...prev, [field]: e.target.value }));

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("payment");
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPlacingOrder(true);
        const token = localStorage.getItem('accessToken');

        if (!token) {
            alert('please login to place order.');
            navigate('/login');
            setIsPlacingOrder(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3011/orders', {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderId,
                    items: summaryItems,
                    payment: payment.method,
                    totalAmount: total,
                    shippingAddress: {
                        fullName: shipping.fullName,
                        address: shipping.address,
                        city: shipping.city,
                        state: shipping.state,
                        pincode: shipping.pincode
                    }
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                console.error('Order creation failed on backend:', errData);
                alert(`Order placing failed: ${errData?.message || 'Unknown error'}`);
                setIsPlacingOrder(false);
                return;
            }

            dispatch(clearCart());
            setStep("confirmation");
            setIsPlacingOrder(false);
        } catch (err) {
            console.error('Order placing failed', err);
            alert('Failed to place order. Please try again');
            setIsPlacingOrder(false);
        }
    };

    const formatCardNumber = (value: string) => value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1").trim();

    const formatExpiry = (val: string) => {
        const digits = val.replace(/\D/g, "").slice(0, 4);
        if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
        return digits;
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 px-4 py-8">
            <div className="max-w-5xl mx-auto">
                {/*  Header  */}
                <div className="flex items-center gap-4 mb-8">
                    {step !== "confirmation" && (
                        <button id="checkout-back-btn"
                            className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                            onClick={() => step === "payment" ? setStep("Shipping") : navigate("/cart")}>
                            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                        </button>
                    )}
                    <div className="text-left">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                            {step === "confirmation" ? "Order Placed!" : "Checkout"}
                        </h1>
                        {step !== "confirmation" && (
                            <p className=" text-sm text-zinc-500 dark:text-zinc-400">
                                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                            </p>
                        )}
                    </div>
                </div>

                <StepIndicator current={step} />

                {/*  Confirmation Screen*/}
                {step === "confirmation" && (
                    <div className="max-w-lg mx-auto">
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-8 text-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-green-400">
                                Thank You {shipping.fullName || "Customer"}!
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                                Your Order has been Placed and is being processed.
                            </p>
                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl px-4 py-3 mb-2">
                                <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
                                    Order Id
                                </p>
                                <p className="text-lg font-mono font-bold text-purple-600 dark:text-purple-400">
                                    {orderId}
                                </p>
                            </div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500"> A confirmation will be sent to {" "}
                                <span className="font-medium text-zinc-600 dark:text-zinc-300">{shipping.email}</span>
                            </p>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 mb-6">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 text-left flex items-center gap-2">
                                <Truck className="w-4 h-4 text-purple-500" />
                                Order Tracking
                            </h3>
                            <OrderTracker currentStep={"Packed"} />
                        </div>
                        <Link to="/"
                            id="checkout-continue-shopping-btn"
                            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl transition-colors text-center shadow-md block">
                            Continue Shopping
                        </Link>
                    </div>
                )}

                {/*  Shipping + Payment + Summary*/}
                {step !== "confirmation" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            {/*  Shipping form*/}
                            {step === "Shipping" && (
                                <form id="checkout-shipping-form" onSubmit={handleShippingSubmit}
                                    className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6">
                                    <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-2 text-left">
                                        <MapPin className="w-4 h-4 text-purple-500" />
                                        Shipping Address
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <InputField id="fullName" label="Full Name" value={shipping.fullName} onChange={updateShipping("fullName")} placeholder="John doe" />
                                        </div>
                                        <InputField id="email" label="Email Address" type="email" placeholder="john@example.com"
                                            value={shipping.email} onChange={updateShipping("email")} required />
                                        <InputField id="phone" label="Phone Number" type="tel" placeholder="+91 99999 99999"
                                            value={shipping.phone} onChange={updateShipping("phone")} required maxLength={13} />
                                        <InputField id="address" label="Street Address" placeholder="house no., street, landmark"
                                            value={shipping.address} onChange={updateShipping("address")} required />
                                        <InputField id="city" label="City" placeholder="Mumbai" value={shipping.city}
                                            onChange={updateShipping("city")} required />
                                        <label htmlFor="state" className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide text-left">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <select id="state" value={shipping.state} onChange={updateShipping("state")} required
                                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200">
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <InputField id="pincode" label="Pincode" placeholder="11111" value={shipping.pincode}
                                        onChange={updateShipping("pincode")} required maxLength={6} />

                                    <button id="checkout-continue-to-payment-btn" type="submit"

                                        className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2" >
                                        Continue to Payment
                                        <ArrowRight className="w-5 h-4" />
                                    </button>
                                </form>
                            )}

                            {/* Payment form */}
                            {step === 'payment' && (
                                <form id="checkout-payment-form" onSubmit={handlePlaceOrder}
                                    className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6">
                                    <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-2 text-left">
                                        <CreditCard className="w-4 h-4 text-purple-500" />
                                        Payment Method
                                    </h2>
                                    {/*  Method Selector*/}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {([
                                            { key: "CARD" as const, label: "Card", icon: <CreditCard className="w-5 h-5" /> },
                                            { key: "UPI" as const, label: "UPI", icon: <Smartphone className="w-5 h-5" /> },
                                            { key: "COD" as const, label: "COD", icon: <Landmark className="w-5 h-5" /> },
                                        ]).map((m) => (
                                            <button key={m.key} type="button" id={`checkout-payment-method-${m.key.toLowerCase()}`}
                                                onClick={() => setPayment((prev) => ({ ...prev, method: m.key }))}
                                                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all duration-200 ${payment.method === m.key
                                                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                                                    : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"}`}>
                                                {m.icon}
                                                {m.label}
                                            </button>
                                        ))}
                                    </div>
                                    {/*  Card Fields */}
                                    {payment.method === "CARD" && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <InputField id="cardHolderName" label="CardHolder Name" placeholder="John Doe" value={payment.cardHolderName}
                                                    onChange={updatePayment("cardHolderName")} required />
                                            </div>
                                            <div className="sm:col-span-2 flex flex-col gap-1.5">
                                                <label htmlFor="cardNumber"
                                                    className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide text-left">
                                                    Card Number
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input id="cardNumber" type="text" inputMode="numeric" placeholder="1234 5678 9012 3456" value={payment.cardNumber}
                                                    maxLength={19} required onChange={(e) => setPayment((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 font-mono tracking-widest" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="cardExpiry"
                                                    className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide text-left">
                                                    Expiry Date
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <input id="cardExpiry" type="text" inputMode="numeric" placeholder="MM/YY"
                                                    value={payment.cardExpiry} onChange={(e) => setPayment((prev) => ({ ...prev, cardExpiry: formatExpiry(e.target.value) }))}
                                                    required maxLength={5}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-600 transition-all duration-200" />
                                            </div>
                                            <InputField id="cvv" label="CVV" placeholder="123" value={payment.cvv} onChange={updatePayment("cvv")} required maxLength={3} />
                                        </div>
                                    )}

                                    {/* UPI Field */}
                                    {payment.method === "UPI" && (
                                        <InputField id="upiId" label="UPI ID" placeholder="yourupiid@upi" value={payment.upiId} onChange={updatePayment("upiId")} required />
                                    )}

                                    {/* COD Field */}
                                    {payment.method === "COD" && (
                                        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                            <Landmark className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div className="text-left">
                                                <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold"> Cash on Delivery</p>
                                                <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Pay ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })} When your order arrives.</p>
                                            </div>
                                        </div>
                                    )}
                                    <button className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                                        id="checkout-place-order-btn" type="submit" disabled={isPlacingOrder}>
                                        {isPlacingOrder ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Placing Order...
                                            </>

                                        ) : (
                                            <>
                                                Place Order · ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                                <CheckCircle2 className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                        {/* Order Summary SideBar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-zinc-700 rounded-2xl border border-zinc-200 dark:border-zinc-600  shadow-md p-6 sticky top-6">
                                <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-4 text-left">
                                    Order Summary
                                </h2>
                                <OrderSummaryContent items={summaryItems} subtotal={subTotal} tax={tax} total={total} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Checkout;