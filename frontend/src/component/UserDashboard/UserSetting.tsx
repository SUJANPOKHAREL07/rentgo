// import { useState } from "react";
// import { useAuth } from "../../context/UseContext";

// const UserSetting = () => {
//   const { user, logout } = useAuth();
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [deletePassword, setDeletePassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!user) return <p className="text-center py-10">No user found</p>;

//   // =======================
//   // Change Password
//   // =======================
//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword) {
//       alert("Please fill both current and new password");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Use MockAPI for testing or replace with real backend URL
//       const API_URL = `https://68b7d508b7154050432608f0.mockapi.io/vehicles/users/${user.id}`;

//       const res = await fetch(API_URL, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           currentPassword, // backend will verify
//           newPassword,
//         }),
//       });

//       // MockAPI always returns 200, so simulate password check
//       const data = await res.json();
//       if (!res.ok || data.error) {
//         alert(data.message || "Current password is incorrect");
//         return;
//       }

//       alert("Password updated successfully!");
//       setCurrentPassword("");
//       setNewPassword("");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         alert(err.message);
//       } else {
//         alert("Something went wrong");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =======================
//   // Delete Account
//   // =======================
//   const handleDeleteAccount = async () => {
//     if (!deletePassword) {
//       alert("Please enter your password to confirm deletion");
//       return;
//     }

//     if (!confirm("Are you sure you want to delete your account?")) return;

//     setLoading(true);
//     try {
//       // MockAPI for now, replace with real backend later
//       const API_URL = `https://68b7d508b7154050432608f0.mockapi.io/vehicles/users/${user.id}`;

//       const res = await fetch(API_URL, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password: deletePassword }), // backend verifies
//       });

//       const data = await res.json();
//       if (!res.ok || data.error) {
//         alert(data.message || "Password incorrect or deletion failed");
//         return;
//       }

//       alert("Account deleted successfully!");
//       logout(); // clear user session
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         alert(err.message);
//       } else {
//         alert("Something went wrong");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow border border-gray-300">
//       <h2 className="text-xl font-semibold mb-6">User Settings</h2>

//       {/* Change Password */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Change Password</h3>
//         <input
//           type="password"
//           placeholder="Current Password"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//           className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
//         />
//         <button
//           onClick={handleChangePassword}
//           disabled={loading}
//           className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
//         >
//           {loading ? "Updating..." : "Change Password"}
//         </button>
//       </div>

//       {/* Delete Account */}
//       <div>
//         <h3 className="font-medium mb-2">Delete Account</h3>
//         <input
//           type="password"
//           placeholder="Enter your password to confirm"
//           value={deletePassword}
//           onChange={(e) => setDeletePassword(e.target.value)}
//           className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
//         />
//         <button
//           onClick={handleDeleteAccount}
//           disabled={loading}
//           className="bg-red text-white px-4 py-2 rounded-md hover:bg-gradient-red disabled:opacity-50"
//         >
//           {loading ? "Deleting..." : "Delete Account"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserSetting;

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/UseContext";

const UserSetting = () => {
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Inline OTP flow for secure password change
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  if (!user) return <p className="text-center py-10">No user found</p>;

  // =======================
  // Change Password (OTP-secured flow)
  // =======================
  const sendOtp = async () => {
    if (!currentPassword) {
      alert("Please enter your current password");
      return;
    }
    setSendingOtp(true);
    try {
      // Step 1: send OTP (auth cookie required)
      const res = await fetch("http://localhost:4000/user/update-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.message || data.error || "Failed to send OTP");
        return;
      }
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter the OTP sent to your email");
      return;
    }
    setVerifyingOtp(true);
    try {
      const res = await fetch("http://localhost:4000/user/update-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.message || data.error || "Invalid OTP");
        return;
      }
      setOtpVerified(true);
      alert("OTP verified");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const finalizePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Enter and confirm your new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    setUpdatingPassword(true);
    try {
      const res = await fetch("http://localhost:4000/user/update-password/newpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.message || data.error || "Password update failed");
        return;
      }
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Password update failed");
    } finally {
      setUpdatingPassword(false);
    }
  };

  // =======================
  // Delete Account
  // =======================
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      alert("Please enter your password to confirm deletion");
      return;
    }

    if (!confirm("Are you sure you want to delete your account?")) return;

    setDeletingAccount(true);
    try {
      const res = await fetch("http://localhost:4000/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: user.email, // pass logged-in user's email
          password: deletePassword, // backend verifies before deletion
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.message || "Password incorrect or deletion failed");
        return;
      }

      alert("Account deleted successfully!");
      logout(); // clear user session
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-300">
      <h2 className="text-xl font-semibold mb-6">User Settings</h2>

      {/* Change Password */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Change Password</h3>
        <div className="relative mb-2">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 pr-12 focus:border-black focus:ring-black"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((p) => !p)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            aria-label={showCurrent ? "Hide current password" : "Show current password"}
          >
            {showCurrent ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        {!otpSent && (
          <button
            onClick={sendOtp}
            disabled={sendingOtp}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {sendingOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {otpSent && !otpVerified && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
            />
            <button
              onClick={verifyOtp}
              disabled={verifyingOtp}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {otpVerified && (
          <div className="mt-3">
            <div className="relative mb-2">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 p-2 pr-12 focus:border-black focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
            />
            <button
              onClick={finalizePasswordChange}
              disabled={updatingPassword}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {updatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}
      </div>

      {/* Delete Account */}
      <div>
        <h3 className="font-medium mb-2">Delete Account</h3>
        <div className="relative mb-2">
          <input
            type={showDelete ? "text" : "password"}
            placeholder="Enter your password to confirm"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 pr-12 focus:border-black focus:ring-black"
          />
          <button
            type="button"
            onClick={() => setShowDelete((p) => !p)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            aria-label={showDelete ? "Hide password" : "Show password"}
          >
            {showDelete ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>
        <button
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-gradient-red disabled:opacity-50"
        >
          {deletingAccount ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default UserSetting;
