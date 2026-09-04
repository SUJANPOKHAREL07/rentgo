


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaLock, FaShieldAlt } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

interface BookingData {
  vehicleId: number;
  categoryId: number;
  vehicleName: string;
  bookingDate: string;
  returnDate: string;
  price: number;
  pickuplocation: string;
  droplocation: string;
  licenseNo: string;
  licenseImgBase64: string;
  paymentMethod: string;
  days: number;
  pricePerDay: number;
  serviceFee: number;
  insuranceFee: number;
  paymentStatus?: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookingData, setBookingData] = useState<BookingData | null>(
    location.state?.bookingData || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionUUID, setTransactionUUID] = useState("");
  const [signature, setSignature] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("eSewa");

  const secretKey = "8gBm/:&EnhH.1/q";
  const productCode = "EPAYTEST";

  useEffect(() => {
    // Load booking data from sessionStorage if not in location state
    if (!bookingData) {
      const storedData = sessionStorage.getItem("bookingData");
      if (storedData) {
        setBookingData(JSON.parse(storedData));
      } else {
        navigate("/available-vehicles");
        return;
      }
    }

    // Generate transaction UUID and signature
    if (bookingData) {
      const uuid = `${uuidv4()}-${bookingData.vehicleId}-${Date.now()}`;
      setTransactionUUID(uuid);

      const message = `total_amount=${bookingData.price},transaction_uuid=${uuid},product_code=${productCode}`;
      const hash = CryptoJS.HmacSHA256(message, secretKey);
      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      setSignature(hashInBase64);
    }
  }, [bookingData, navigate]);

  const createBooking = async (
    paymentMethod: string,
    paymentStatus: string = "Pending"
  ) => {
    if (!bookingData) return false;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("licenseNo", bookingData.licenseNo);
      formData.append(
        "bookingDate",
        new Date(bookingData.bookingDate).toISOString()
      );
      formData.append(
        "returnDate",
        new Date(bookingData.returnDate).toISOString()
      );
      formData.append("price", String(bookingData.price));
      formData.append("pickuplocation", bookingData.pickuplocation);
      formData.append("droplocation", bookingData.droplocation);
      formData.append("paymentMethod", paymentMethod);
      formData.append("paymentStatus", paymentStatus);

      // Convert base64 to blob and append to formData
      const imgResponse = await fetch(bookingData.licenseImgBase64);
      const blob = await imgResponse.blob();
      formData.append("licenseImg", blob, "license.jpg");

      const url = `http://localhost:4000/vehicle/book/booking/${bookingData.categoryId}/${bookingData.vehicleId}`;

      console.log("Creating booking with payment method:", paymentMethod);
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }

      return true;
    } catch (err: any) {
      const msg = err.message || "Unknown error";
      setError(msg);
      console.error("Booking creation failed:", msg);
      return false;
    } finally {
      setLoading(false);
    }
  };



  const handlePayment = async () => {
    if (!bookingData) return;

    if (selectedPaymentMethod === "eSewa") {
      // For eSewa: Just redirect to payment gateway WITHOUT creating booking
      console.log("Redirecting to eSewa payment gateway...");
      const form = document.getElementById("esewa-form") as HTMLFormElement;
      if (form) {
        form.submit();
      }
    } else if (selectedPaymentMethod === "CashOnDelivery") {
      // For Cash on Delivery: Create booking immediately with "Pending" status for both
      const bookingCreated = await createBooking("CashOnDelivery", "pending");
      if (bookingCreated) {
        sessionStorage.removeItem("bookingData");
        navigate("/booking-successful");
      }
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-emerald-600 text-lg mb-4">No booking data found</p>
          <button
            onClick={() => navigate("/vehicles")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 shadow-md"
          >
            Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-heading">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">Secure payment processing with eSewa</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 font-heading">
              Booking Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {bookingData.vehicleName}
                  </h3>
                  <p className="text-sm text-emerald-700 font-medium">Vehicle Rental</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">
                    Rs. {bookingData.pricePerDay}
                  </p>
                  <p className="text-sm text-gray-500">per day</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Location:</span>
                  <span className="font-medium text-slate-900">
                    {bookingData.pickuplocation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Location:</span>
                  <span className="font-medium text-slate-900">
                    {bookingData.droplocation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Date:</span>
                  <span className="font-medium text-slate-900">
                    {new Date(bookingData.bookingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Date:</span>
                  <span className="font-medium text-slate-900">
                    {new Date(bookingData.returnDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-slate-900">{bookingData.days} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License Number:</span>
                  <span className="font-medium text-slate-900">{bookingData.licenseNo}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Daily Rate ({bookingData.days} days)</span>
                  <span>Rs. {bookingData.pricePerDay * bookingData.days}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>Rs. {bookingData.serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance Fee</span>
                  <span>Rs. {bookingData.insuranceFee}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t border-gray-100 pt-3">
                  <span>Total Amount</span>
                  <span className="text-emerald-600 font-heading">Rs. {bookingData.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 font-heading">
              Payment Method
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label
                htmlFor="payment-method"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Payment Method:
              </label>
              <select
                id="payment-method"
                name="paymentMethod"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2.5 border text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-xl"
              >
                <option value="eSewa">eSewa</option>
                <option value="CashOnDelivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Security Features */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <FaShieldAlt size={16} />
                <span className="text-sm">256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <FaLock size={16} />
                <span className="text-sm">Secure payment processing</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <FaCheckCircle size={16} />
                <span className="text-sm">Instant confirmation</span>
              </div>
            </div>

            {/* Conditional Rendering for Payment Forms */}
            {selectedPaymentMethod === "eSewa" && (
              <form
                id="esewa-form"
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                target="_self"
              >
                {/* Hidden eSewa Fields */}
                <input type="hidden" name="amount" value={bookingData.price} />
                <input type="hidden" name="tax_amount" value="0" />
                <input
                  type="hidden"
                  name="total_amount"
                  value={bookingData.price}
                />
                <input
                  type="hidden"
                  name="transaction_uuid"
                  value={transactionUUID}
                />
                <input type="hidden" name="product_code" value={productCode} />
                <input type="hidden" name="product_service_charge" value="0" />
                <input type="hidden" name="product_delivery_charge" value="0" />

                {/* Redirect URLs */}
                <input
                  type="hidden"
                  name="success_url"
                  value={`${window.location.origin}/payment-success?vehicleId=${bookingData.vehicleId}&categoryId=${bookingData.categoryId}&txn=${transactionUUID}`}
                />
                <input
                  type="hidden"
                  name="failure_url"
                  value={`${window.location.origin}/payment-failure`}
                />

                {/* Signature Details */}
                <input
                  type="hidden"
                  name="signed_field_names"
                  value="total_amount,transaction_uuid,product_code"
                />
                <input type="hidden" name="signature" value={signature} />

                {/* Payment Button */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Pay Rs. {bookingData.price} with eSewa
                    </>
                  )}
                </button>
              </form>
            )}

            {selectedPaymentMethod === "CashOnDelivery" && (
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  "Place Booking with Cash on Delivery"
                )}
              </button>
            )}

            {/* Alternative Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  navigate("/vehicles/" + bookingData.vehicleId)
                }
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Vehicle Details
              </button>
              <button
                onClick={async () => {
                  const confirmed = window.confirm(
                    "Are you sure you want to cancel this booking? This action cannot be undone."
                  );
                  if (confirmed) {
                    // Just clear the session storage since no booking was created yet
                    sessionStorage.removeItem("bookingData");
                    alert("Booking cancelled successfully!");
                    navigate("/vehicles");
                  }
                }}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-medium transition-colors"
              >
                {loading ? "Cancelling..." : "Cancel Booking"}
              </button>
              <button
                onClick={() => navigate("/vehicles")}
                className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Back to Vehicles
              </button>
            </div>

            {/* Terms */}
            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>
                By proceeding with payment, you agree to our{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 