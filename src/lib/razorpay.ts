/**
 * Razorpay Payment Gateway Integration Service
 * Prepares the application for 1-on-1 yoga mentorship, retreats, and nutrition cohort payments.
 */

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayPaymentOptions {
  amountInINR: number;
  serviceTitle: string;
  userName: string;
  userEmail: string;
  userContact?: string;
  description?: string;
  onSuccess?: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => void;
  onFailure?: (error: any) => void;
}

/**
 * Dynamically loads the official Razorpay Checkout SDK
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load official Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/**
 * Initiates Razorpay checkout modal
 */
export async function initiateRazorpayCheckout(options: RazorpayPaymentOptions): Promise<void> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert('Unable to load payment gateway. Please check your network connection.');
    return;
  }

  const metaEnv = (import.meta as any).env || {};
  const razorpayKey = metaEnv.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key';

  const checkoutOptions = {
    key: razorpayKey,
    amount: options.amountInINR * 100, // in paise
    currency: 'INR',
    name: 'Supriya Bhavsar Yoga',
    description: options.description || `Deposit for ${options.serviceTitle}`,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=200&q=80',
    prefill: {
      name: options.userName,
      email: options.userEmail,
      contact: options.userContact || '',
    },
    theme: {
      color: '#9333EA', // Midnight Lotus Purple
    },
    handler: function (response: any) {
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    },
    modal: {
      ondismiss: function () {
        console.log('Razorpay modal dismissed by practitioner.');
      },
    },
  };

  try {
    const rzp = new window.Razorpay(checkoutOptions);
    rzp.on('payment.failed', function (response: any) {
      if (options.onFailure) {
        options.onFailure(response.error);
      }
    });
    rzp.open();
  } catch (err) {
    console.warn('Error launching Razorpay instance:', err);
    if (options.onFailure) options.onFailure(err);
  }
}
