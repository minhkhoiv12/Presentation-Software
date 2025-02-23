import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";

const Layout = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const create = () => {
    navigate("/design/create", {
      state: {
        type: "create",
        width: 600,
        height: 450,
      },
    });
  };
  const logout = () => {
    localStorage.removeItem("canva_token");
    window.location.href = "/";
  };

  return (
    <div className="bg-[#18191b] min-h-screen w-full ">
      <div className="bg-[#c8cdd1] shadow-md fixed left-0 top-0 w-full z-20">
        <div className="w-[93%] m-auto py-3">
          <div className="flex justify-between items-center">
            <div className="w-[80px] h-[55px]">
              <img
                className="w-full h-full"
                src="https://res.cloudinary.com/dd7fcqtnn/image/upload/v1739705997/img_oddaeq.png"
                alt=""
              />
            </div>

            <div className="flex gap-4 justify-center items-center relative">
              <button
                onClick={create}
                className="py-2 px-2 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium"
              >
                Tạo bản thiết kế
              </button>
              <div onClick={() => setShow(!show)} className=" cursor-pointer">
                <img
                  className="w-[48px] h-[45px] rounded-full"
                  src="https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg"
                  alt=""
                />
              </div>

              <div
                className={`absolute top-[60px] right-0 w-[250px] bg-[#313030] p-3 border border-gray-700 transition duration-500 ${
                  show ? "visible opacity-100" : "invisible opacity-30"
                } `}
              >
                <div className="px-2 py-2 flex justify-start gap-5 items-center">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src="https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg"
                    alt=""
                  />
                </div>

                <ul className="text-[#e0dddd] font-semibold">
                  <li>
                    <div onClick={logout} className="p-2 cursor-pointer">
                      <span>Đăng xuất </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex mt-16">
        <div className="sidebar w-[300px] p-5 h-[calc(100vh-70px)] fixed bg-[#34569f]">
          <div className="px-2 py-2 flex justify-start gap-5 items-center mb-3">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src="https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg"
              alt="image"
            />
          </div>

          <ul className="px-4 flex flex-col gap-2">
            <li>
              <Link
                to="/"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${
                  pathname === "/" ? "bg-[#ffffff26]" : ""
                } rounded-md `}
              >
                <span className="text-xl">
                  <FaHome />
                </span>
                <span className="font-medium">Trang chủ</span>
              </Link>
            </li>

            <li>
              <Link
                to="/projects"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${
                  pathname === "/projects" ? "bg-[#ffffff26]" : ""
                } rounded-md `}
              >
                <span className="text-xl">
                  <FaFolderOpen />
                </span>
                <span className="font-medium">Dư án của bạn</span>
              </Link>
            </li>

            <li>
              <Link
                to="/templates"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${
                  pathname === "/templates" ? "bg-[#ffffff26]" : ""
                } rounded-md `}
              >
                <span className="text-xl">
                  <LuLayoutTemplate />
                </span>
                <span className="font-medium">Templates</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="ml-[300px] w-[calc(100%-300px)]">
          <div className="py-4 pr-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
