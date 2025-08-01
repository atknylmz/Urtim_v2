import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignNReg() {
  const [role, setRole] = useState("user"); // "admin" | "user"
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <>
      <div className="pr-24">
        <h1 className="text-5xl font-bold text-white">
          Urtim Akademiye Hoş Geldiniz!
        </h1>
        <p className="py-6 text-white text-xl">
          Burada Canias İle ilgili öğrenmek istediklerinizi videolu şekilde
          bulabilirsiniz.
        </p>
      </div>
      <div className="card bg-white w-96 h-88 max-w-sm shrink-0 shadow-2xl rounded-lg">
        <div className="w-96 max-w-sm">
          <div className="join w-full mb-1">
            <button
              type="button"
              className={`btn join-item w-48 bg-blue-600 text-white text-xl rounded-tl-lg ${
                role === "admin" ? "" : "btn-active bg-sky-400"
              }`}
              onClick={() => setRole("admin")}
            >
              Yönetici Girişi
            </button>
            <button
              type="button"
              className={`btn join-item w-48 bg-blue-600 text-white text-xl rounded-tr-lg ${
                role === "user" ? "" : "btn-active bg-sky-400"
              }`}
              onClick={() => setRole("user")}
            >
              Kullanıcı Girişi
            </button>
          </div>
        </div>
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label text-xl text-black">Kullanıcı Adı</label>
            <input
              type="email"
              className="input bg-white border-black text-black w-full"
            />
            <label className="label text-xl text-black mt-2">Şifre</label>
            <input
              type="password"
              className="input bg-white border-black text-black w-full"
            />
            <button
              className="btn btn-outline btn-info mt-8"
              onClick={handleLogin}
            >
              Giriş Yap
            </button>
          </fieldset>
        </div>
      </div>
    </>
  );
}
