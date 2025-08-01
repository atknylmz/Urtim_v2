import React, { useState } from "react";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      {/*<!-- Header --> */}
      <header className=" relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-sky-600"
            role="navigation">
            {/* <!-- Brand logo --> */}
            <img
              src="src\assets\logo_deneme_1.png"
              alt="Urtim"
              className="w-4xs m-3"
            />
            {/*  <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation">
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
              </div>
            </button>
            {/* <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 font-bold hover:text-blue-600 focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="https://urtim.com/kalip-iskele-tirmanir-kalip-sistemleri/"
                  target="_blank">
                  <span>Ürünlerimiz</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 font-bold hover:text-blue-600 focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="https://urtim.com/projeler/"
                  target="_blank">
                  <span>Projeler</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 font-bold hover:text-blue-600 focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="https://urtim.com/category/bizden-haberler/"
                  target="_blank">
                  <span>Bizden Haberler</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 font-bold hover:text-blue-600 focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="https://urtim.com/iletisim/"
                  target="_blank">
                  <span>iletişim</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 font-bold hover:text-blue-600 focus:text-blue-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="https://urtim.com/hakkimizda/"
                  target="_blank">
                  <span>Hakkımızda</span>
                </a>
              </li>
            </ul>
            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              {/* <!-- Avatar --> */}
              <a
                href="#"
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title description"
                  role="graphics-symbol">
                  <title id="title">Kullanıcı Fotoğrafı</title>
                  <desc id="description">Kullanıcı Fotoğrafı</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
              {/* <!-- End Avatar --> */}
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Avatar--> */}
    </>
  );
}
