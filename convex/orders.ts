import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrderById = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("orderId"), args.orderId))
      .first();
    return order;
  },
});

export const createOrder = mutation({
  args: {
    orderId: v.string(),
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      country: v.string(),
      zip: v.string(),
    }),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    timestamp: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed")),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash")),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("orders", args);
    return id;
  },
});
