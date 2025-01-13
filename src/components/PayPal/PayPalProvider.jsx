import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
};

export function PayPalProvider({ children }) {
    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    );
} 