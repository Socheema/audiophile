import React from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CheckoutButton() {
  const createOrder = useMutation(api.orders.createOrder);

  const handleCheckout = async () => {
    try {
      const orderId = await createOrder({
        orderId: `ORD-${Date.now()}`,
        customer: { name: "Jane Doe", email: "jane@test.com", phone: "+1234567890" },
        shipping: { address: "456 Elm St", city: "Los Angeles", country: "USA", zip: "90001" },
        items: [
          { id: 2, name: "ZX9 Speaker", price: 450000, quantity: 1 }
        ],
        totals: { subtotal: 450000, shipping: 5000, vat: 90000, grandTotal: 545000 },
        timestamp: Date.now(),
        status: "completed",
      });
      alert(`Order saved! ID: ${orderId}`);
    } catch (err: any) {
      alert("Error: " + (err?.message || String(err)));
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold"
    >
      Test Save Order to Convex
    </button>
  );
}
