import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/interceptor";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    company_name: "",
    gst_no: "",
    pan_no: "",
    user_type_id: "1",
    location_id: "132050",
    login_via: "ANDROID",
    firebase_token: "",
    installation_id: "",
  });

  const [file, setFile] = useState(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      navigate("/login");
    },

    onError: (error) => {
      const apiData = error?.response?.data;

      const apiErrors = apiData?.result?.response || {};

      setFieldErrors(apiErrors);

      setErrorMsg(apiData?.result?.message || "Registration failed");

      setForm((prev) => ({
        ...initialForm,
        mobile: prev.mobile,
      }));

      setFile(null);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.email) {
      alert("Please fill required fields");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (file) {
      formData.append("profile_image", file);
    }

    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        {/* Inputs */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
        />
        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="input"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          className="input"
        />
        <input
          name="gst_no"
          value={form.gst_no}
          onChange={handleChange}
          placeholder="GST No"
          className="input"
        />
        <input
          name="pan_no"
          value={form.pan_no}
          onChange={handleChange}
          placeholder="PAN No"
          className="input"
        />

        {/* File Upload */}
        <input type="file" onChange={handleFileChange} />

        {/* Button */}
        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        {isError && (
          <p className="text-red-500 text-center text-sm">Registration failed</p>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
