import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import api from "../utils/api";
import toast from "react-hot-toast";

const Index = () => {
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const user_register = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await api.post("/api/user-register", state);
      setLoader(false);
      localStorage.setItem("canva_token", data.token);
      setState({
        name: "",
        email: "",
        password: "",
      });
      window.location.href = "/";
    } catch (error) {
      setLoader(false);

      toast.error(error.response.data.message);
    }
  };
  //end method

  const user_login = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await api.post("/api/user-login", state);
      setLoader(false);

      localStorage.setItem("canva_token", data.token);
      setState({
        email: "",
        password: "",
      });

      window.location.href = "/";
    } catch (error) {
      setLoader(false);

      toast.error(error.response.data.message);
    }
  };
  //end method

  return (
    <div className="bg-[#18191b] min-h-screen w-full ">
      <div
        className={`w-screen ${
          show ? "visible opacity-100" : "invisible opacity-30"
        } transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center `}
      >
        <div className="w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative">
          <div
            onClick={() => setShow(false)}
            className="absolute right-4 top-4 text-xl cursor-pointer text-white"
          >
            <RxCross2 />
          </div>
          <h2 className="text-white pb-4 text-center text-xl">
            Đăng nhập và Đăng ký trong vài giây
          </h2>

          {type === "signin" && (
            <form onSubmit={user_login}>
              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandle}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button
                  disabled={loader}
                  className="px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white"
                >
                  {loader ? "loading.." : "Đăng nhập"}
                </button>
              </div>
            </form>
          )}
          {type === "signup" && (
            <form onSubmit={user_register}>
              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="name">Tên</label>
                <input
                  onChange={inputHandle}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Tên"
                  value={state.name}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandle}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button
                  disabled={loader}
                  className="px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white"
                >
                  {loader ? "loading.." : "Đăng ký"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="bg-[#c8cdd1] shadow-md">
        <div className="w-[93%] m-auto py-3">
          <div className="flex justify-between items-center">
            <div className="w-[80px] h-[55px]">
              <img
                className="w-full h-full"
                src="https://res.cloudinary.com/dd7fcqtnn/image/upload/v1739705997/img_oddaeq.png"
                alt=""
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setType("signin");
                  setShow(true);
                }}
                className="py-2 w-[80px] text-center bg-teal-700 text-white transition-all hover:bg-teal-500 rounded-[5px] font-medium"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => {
                  setType("signup");
                  setShow(true);
                }}
                className="py-2 w-[80px] text-center bg-purple-700 text-white transition-all hover:bg-purple-500 rounded-[5px] font-medium"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full justify-center items-center p-4">
        <div className="py-[170px] flex justify-center items-center flex-col gap-6">
          <h2 className="text-5xl text-[#c7c5c5] font-bold">
            Hôm nay bạn sẽ thiết kế gì?
          </h2>
          <span className="text-[#aca9a9] text-2xl font-medium">
            Pixora giúp bạn dễ dàng tạo và chia sẻ các thiết kế chuyên nghiệp.
          </span>
          <button
            onClick={() => {
              setType("signup");
              setShow(true);
            }}
            className="py-2 w-[200px] text-center bg-purple-700 text-white transition-all hover:bg-purple-500 rounded-[5px] font-medium"
          >
            Đăng ký miễn phí
          </button>
        </div>
      </div>
    </div>
  );
};
export default Index;
