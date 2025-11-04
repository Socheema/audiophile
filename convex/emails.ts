import { v } from "convex/values";
import { action } from "./_generated/server";

export const sendOrderConfirmation = action({
  args: {
    to: v.string(),
    customerName: v.string(),
    orderId: v.string(),
    orderData: v.object({
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
      shipping: v.object({
        address: v.string(),
        city: v.string(),
        country: v.string(),
        zip: v.string(),
      }),
      timestamp: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const { to, customerName, orderId, orderData } = args;

    // Get Resend API key from environment
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    // Format order date
    const orderDate = new Date(orderData.timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create order items HTML
    const itemsHtml = orderData.items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 15px 0; vertical-align: top;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div>
              <div style="font-weight: 600; margin-bottom: 5px;">${item.name}</div>
              <div style="color: #666; font-size: 14px;">$${(item.price / 100).toFixed(2)} × ${item.quantity}</div>
            </div>
          </div>
        </td>
        <td style="padding: 15px 0; text-align: right; vertical-align: top;">
          <div style="font-weight: 600;">$${((item.price * item.quantity) / 100).toFixed(2)}</div>
        </td>
      </tr>
    `).join('');

    // Create email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - Audiophile</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
            <!-- Header -->
            <div style="background: #D87D4A; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                Audiophile
              </h1>
            </div>

            <!-- Success Message -->
            <div style="padding: 40px 30px; text-align: center; background: #f9f9f9;">
              <div style="width: 60px; height: 60px; background: #D87D4A; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h2 style="margin: 0 0 10px 0; font-size: 28px; text-transform: uppercase;">Thank You!</h2>
              <p style="margin: 0; color: #666; font-size: 16px;">Your order has been confirmed and is being processed.</p>
            </div>

            <!-- Order Details -->
            <div style="padding: 30px;">
              <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden; margin-bottom: 30px;">
                <div style="background: #f9f9f9; padding: 20px; border-bottom: 1px solid #eee;">
                  <h3 style="margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase;">Order Details</h3>
                  <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                    <div>
                      <div style="font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 5px;">Order Number</div>
                      <div style="font-weight: 600;">${orderId}</div>
                    </div>
                    <div>
                      <div style="font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 5px;">Order Date</div>
                      <div style="font-weight: 600;">${orderDate}</div>
                    </div>
                  </div>
                </div>

                <!-- Items -->
                <div style="padding: 20px;">
                  <h4 style="margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase;">Order Items</h4>
                  <table style="width: 100%; border-collapse: collapse;">
                    ${itemsHtml}
                  </table>
                </div>

                <!-- Totals -->
                <div style="background: #f9f9f9; padding: 20px; border-top: 1px solid #eee;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 5px 0; color: #666; text-transform: uppercase; font-size: 14px;">Subtotal</td>
                      <td style="padding: 5px 0; text-align: right;">$${(orderData.totals.subtotal / 100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0; color: #666; text-transform: uppercase; font-size: 14px;">Shipping</td>
                      <td style="padding: 5px 0; text-align: right;">$${(orderData.totals.shipping / 100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0; color: #666; text-transform: uppercase; font-size: 14px;">VAT (Included)</td>
                      <td style="padding: 5px 0; text-align: right;">$${(orderData.totals.vat / 100).toFixed(2)}</td>
                    </tr>
                    <tr style="border-top: 2px solid #D87D4A; font-weight: bold; font-size: 18px;">
                      <td style="padding: 15px 0 5px 0; text-transform: uppercase;">Grand Total</td>
                      <td style="padding: 15px 0 5px 0; text-align: right; color: #D87D4A;">$${(orderData.totals.grandTotal / 100).toFixed(2)}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Shipping Address -->
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h4 style="margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase;">Shipping Address</h4>
                <div style="color: #666;">
                  ${orderData.shipping.address}<br>
                  ${orderData.shipping.city}, ${orderData.shipping.zip}<br>
                  ${orderData.shipping.country}
                </div>
              </div>

              <!-- What's Next -->
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                <h4 style="margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase;">What's Next?</h4>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li style="margin-bottom: 8px;">Your order will be shipped within 2-3 business days</li>
                  <li style="margin-bottom: 8px;">You'll receive a tracking number once your order ships</li>
                  <li style="margin-bottom: 8px;">Contact us if you have any questions about your order</li>
                </ul>
              </div>

              <!-- View Order Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.SITE_URL || 'http://localhost:3000'}#order-${orderId}"
                   style="display: inline-block; background: #D87D4A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  View Your Order
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #101010; color: white; padding: 30px; text-align: center;">
              <h3 style="margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Audiophile</h3>
              <p style="margin: 0; color: #ccc; font-size: 14px;">
                Thank you for choosing Audiophile for your audio needs.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Audiophile <onboarding@resend.dev>",
          to: [to],
          subject: `Order Confirmation - ${orderId}`,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${response.status} ${error}`);
      }

      const result = await response.json();
      return { success: true, emailId: result.id };
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  },
});
