import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import reg from "../../assets/reg.jpg"
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

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://crm-api.iatlasstudy.com/api/v1/authentication/login",
        formData,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  
  >
   

      
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
  style={{
    backgroundImage: `url(${reg})`,
  }}
       >
        <div className="absolute inset-0  z-0 right-0 bg-black/50"></div>
      <motion.form
        onSubmit={handleLogin}
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
        {/* <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
      > */}
        {/* Logo */}

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

        {/* Heading */}

        <motion.div variants={itemVariants} className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500 leading-6">
            Sign in to continue managing your workspace.
          </p>
        </motion.div>
        {/* Error */}

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

        {/* Email */}

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Email Address
          </label>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileFocus={{ scale: 1.01 }}
            className="relative"
          >
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

        {/* Password */}

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
              placeholder="Enter your password"
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
                  key={showPassword ? "open" : "close"}
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
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Remember + Forgot */}

        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center justify-between"
        >
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="
      h-4
      w-4
      rounded
      border-slate-300
      text-slate-900
      focus:ring-slate-300
      "
            />

            <span className="text-sm text-slate-600">Remember me</span>
          </label>

          <motion.button
            whileHover={{
              x: 2,
            }}
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="
    text-sm
    font-medium
    text-blue-600
    hover:text-blue-700
    "
          >
            Forgot Password?
          </motion.button>
        </motion.div>
        {/* Login */}

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
                Signing In...
              </motion.div>
            ) : (
              <motion.span
                key="signin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign In
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Register */}

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-slate-500">Don't have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
    mt-2
    font-medium
    text-blue-600
    transition-colors
    hover:text-blue-700
    "
          >
            Create an account
          </button>
        </motion.div>
        {/* </form> */}
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
    </div>

  );
};

export default Login;
