import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import reg from "../../assets/reg.jpg";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://crm-api.iatlasstudy.com/api/v1/authentication/register",
        formData,
      );

      localStorage.setItem("token", res.data.token);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url(${reg})`,
      }}
    >
      <div className="absolute inset-0  z-0 right-0 bg-black/50"></div>
            <motion.form
        onSubmit={handleRegister}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -2,
        }}
        className=" relative z-10 
      w-full
      max-w-md
      rounded-[28px]
      border
      border-slate-200
      bg-white
      p-8
      shadow-[0_10px_40px_rgba(15,23,42,.08)]
      "
      >
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.06,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
      h-14
      w-14
      rounded-2xl
      bg-slate-900
      flex
      items-center
      justify-center
      text-white
      text-xl
      font-bold
    "
          >
            A
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500 leading-6">
            Create your Atlas CRM account to get started.
          </p>
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
      mb-6
      flex
      items-center
      gap-3
      rounded-xl
      border
      border-red-200
      bg-red-50
      px-4
      py-3
      text-sm
      text-red-600
      "
            >
              <FiAlertCircle size={18} />

              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Full Name
          </label>

          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <FiUser
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="
      h-12
      w-full
      rounded-xl
      border
      border-slate-300
      bg-slate-50
      pl-11
      pr-4
      text-sm
      text-slate-800
      placeholder:text-slate-400
      outline-none
      transition-all
      duration-200
      hover:border-slate-400
      focus:border-blue-500
      focus:bg-white
      focus:ring-4
      focus:ring-blue-100
      "
            />
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-2 mt-6">
          <label className="text-sm font-medium text-slate-700">
            Email Address
          </label>

          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <FiMail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="
      h-12
      w-full
      rounded-xl
      border
      border-slate-300
      bg-slate-50
      pl-11
      pr-4
      text-sm
      text-slate-800
      placeholder:text-slate-400
      outline-none
      transition-all
      duration-200
      hover:border-slate-400
      focus:border-blue-500
      focus:bg-white
      focus:ring-4
      focus:ring-blue-100
      "
            />
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-2 mt-6">
          <label className="text-sm font-medium text-slate-700">Password</label>

          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <FiLock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="
      h-12
      w-full
      rounded-xl
      border
      border-slate-300
      bg-slate-50
      pl-11
      pr-12
      text-sm
      text-slate-800
      placeholder:text-slate-400
      outline-none
      transition-all
      duration-200
      hover:border-slate-400
      focus:border-blue-500
      focus:bg-white
      focus:ring-4
      focus:ring-blue-100
      "
            />

            <motion.button
              whileHover={{
                scale: 1.15,
              }}
              whileTap={{
                scale: 0.9,
              }}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-slate-500
      "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={showPassword ? "show" : "hide"}
                  initial={{
                    opacity: 0,
                    rotate: -90,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                  }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="
      mt-1
      h-4
      w-4
      rounded
      border-slate-300
      text-slate-900
      "
            />

            <span className="text-sm text-slate-600 leading-6">
              I agree to the
              <span className="text-blue-600 cursor-pointer hover:text-blue-700">
                {" "}
                Terms of Service{" "}
              </span>
              and
              <span className="text-blue-600 cursor-pointer hover:text-blue-700">
                {" "}
                Privacy Policy
              </span>
            </span>
          </label>
        </motion.div>
        <motion.button
          variants={itemVariants}
          whileHover={{
            scale: 1.015,
            y: -1,
          }}
          whileTap={{
            scale: 0.985,
          }}
          disabled={loading}
          type="submit"
          className="
    mt-8
    flex
    h-12
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-slate-900
    text-sm
    font-semibold
    text-white
    transition-all
    duration-200
    hover:bg-black
    hover:shadow-lg
    disabled:cursor-not-allowed
    disabled:opacity-70
  "
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <AiOutlineLoading3Quarters className="animate-spin" size={18} />
                Creating Account...
              </motion.div>
            ) : (
              <motion.span
                key="register"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Create Account
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-slate-500">Already have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
      mt-2
      font-medium
      text-blue-600
      transition-colors
      hover:text-blue-700
    "
          >
            Sign In
          </button>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="mt-10 border-t border-slate-200 pt-5"
        >
          <p className="text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Atlas CRM
          </p>
        </motion.div>
      </motion.form>
      
    </div>
  );
};

export default Register;
