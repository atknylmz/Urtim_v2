import React, { useState, useRef, useEffect } from "react";

export default function AdminPage({ videos, setVideos }) {
  const [tabSelected, setTabSelected] = useState({ currentTab: 1, noTabs: 4 });
  const [tagCategory, setTagCategory] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([
    { name: "Sevim Ayhan EROL", title: "ERP Project Manager", company: "Yönetici", role: "Admin", username: "SAE", password: "1234" },
    { name: "Murathan Karagöz", title: "ERP Specialist", company: "Çalışan", role: "Admin", username: "MHK", password: "abcd" },
    { name: "Birikan Özcan", title: "IT Specialist", company: "Çalışan", role: "Admin", username: "birikano", password: "xyz" },
    { name: "Hakan Enes Vatansever", title: "Stajyer", company: "Çalışan", role: "Kullanıcı", username: "HEV", password: "pass1" },
    { name: "Gülbanu Alır", title: "Stajyer", company: "Çalışan", role: "Kullanıcı", username: "Gülbanu", password: "pass2" },
    { name: "Atakan Yılmaz", title: "Stajyer", company: "Çalışan", role: "Kullanıcı", username: "Atakan", password: "pass3" },
  ]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [newUser, setNewUser] = useState({ name: "", title: "", company: "", role: "", username: "", password: "" });
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUploader, setVideoUploader] = useState("");

  const wrapperRef = useRef(null);
  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleKeyDown = (e) => {
    if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
      if (e.keyCode === 39) {
        setTabSelected((prev) =>
          prev.currentTab < prev.noTabs
            ? { ...prev, currentTab: prev.currentTab + 1 }
            : { ...prev, currentTab: 1 }
        );
      }
      if (e.keyCode === 37) {
        setTabSelected((prev) =>
          prev.currentTab > 1
            ? { ...prev, currentTab: prev.currentTab - 1 }
            : { ...prev, currentTab: prev.noTabs }
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

useEffect(() => {
  setShowUploadButton(isFormValid());
}, [videoTitle, videoUploader, selectedTags, selectedFiles]);


  const handleAddUser = () => {
    if (Object.values(newUser).every((val) => val.trim() !== "")) {
      setUsers((prev) => [...prev, newUser]);
      setNewUser({ name: "", title: "", company: "", role: "", username: "", password: "" });
      setTabSelected({ ...tabSelected, currentTab: 1 });
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

const isFormValid = () =>
  videoTitle.trim() !== "" &&
  videoUploader.trim() !== "" &&
  selectedTags.length > 0 &&
  selectedFiles.length > 0;



 const handleVideoUpload = () => {
  if (!isFormValid()) {
    alert("Lütfen tüm zorunlu alanları doldurun.");
    return;
  }

  const newVideos = selectedFiles.map((file) => ({
    title: videoTitle,
    description: videoDescription,
    uploader: videoUploader,
    tags: selectedTags,
    url: URL.createObjectURL(file),
  }));

  setVideos((prev) => [...prev, ...newVideos]);

  // Reset form
  setVideoTitle("");
  setVideoDescription("");
  setVideoUploader("");
  setSelectedTags([]);
  setSelectedFiles([]);
  setSelectedVideoIndex(null);
  setShowUploadButton(false);

  alert("Videolar başarıyla yüklendi!");
};


  const filteredVideos = videos.filter((v) =>
    selectedTags.length ? selectedTags.some((t) => v.tags.includes(t)) : true
  );

  const [expandedTag, setExpandedTag] = useState(null);

  const tooltipMap = {
    "Temel Bilgisayar Kullanımı": ["Bilgisayar açma-kapama", "Klasör oluşturma", "Dosya yönetimi", "Masaüstü kullanımı"],
    "Yazıcı & Tarayıcı Kullanımı": ["Ağa bağlı yazıcı kullanımı", "Tarayıcı ile belge dijitalleştirme", "Yazıcı sorun giderme"],
    "Microsoft Outlook Kullanımı": ["E-posta gönderme", "Klasörleme", "Takvim randevusu", "Kurumsal imza ayarları"],
    "Microsoft Excel Temelleri": ["Hücre işlemleri", "Formüller", "Filtreleme", "Grafik oluşturma"],
    "Microsoft Word Kullanımı": ["Biçimlendirme", "Başlık stilleri", "Tablo ekleme", "Belge hazırlama standartları"],
    "Bilgi Güvenliği ve Şifre Yönetimi": ["Güçlü şifre oluşturma", "Kimlik avı (phishing) uyarıları", "Parola yönetim sistemleri kullanımı"],
    "Dosya Paylaşım ve Bulut Sistemleri": ["OneDrive", "SharePoint", "Google Drive"],
    "ERP Sistemlerine Giriş": ["ERP’nin genel yapısı", "Kullanıcı arayüzü", "Temel modüllere genel bakış"],
    "Uzaktan Erişim ve VPN Kullanımı": ["Şirket ağına güvenli bağlanma", "AnyDesk", "TeamViewer"],
    "Dijital İletişim Kuralları": ["Kurumsal yazışma dili", "E-posta etiketleri", "Teams/Zoom toplantı kuralları"],
    "E-imza ve KEP Sistemleri Eğitimi": ["Elektronik imza kurulumu", "Kayıtlı E-posta işleyişi"],
    "IT Destek Süreçlerinin Tanıtımı": ["IT"]
  };

  return (
    <div className="h-screen flex flex-col">
      <section className="max-w-full">
        <ul className="flex items-center border-b border-slate-200" role="tablist" ref={wrapperRef}>
          {[1, 2, 3, 4].map((num) => {
            const titles = ["Kullanıcı Listesi", "Kullanıcı Ekle", "Kullanıcı Sil", "Video"];
            const icons = ["fa-users", "fa-user-plus", "fa-user-minus", "fa-play"];
            return (
              <li className="flex-1" key={num} role="presentation">
                <button
                  className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 border-b-2 px-6 text-sm font-medium transition ${
                    tabSelected.currentTab === num
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-slate-700 hover:border-blue-500 hover:text-blue-500"
                  }`}
                  onClick={() => setTabSelected({ ...tabSelected, currentTab: num })}
                >
                  <i className={`fa-solid ${icons[num - 1]} pr-2`} />
                  {titles[num - 1]}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex-grow overflow-auto px-6 py-4">
        {tabSelected.currentTab === 1 && (
          <div role="tabpanel">
            <table className="w-full text-left border-collapse border border-slate-100 rounded">
              <thead>
                <tr>
                  <th className="px-6 py-2 border bg-slate-100">
                    <div className="flex flex-col gap-1">
                      <span>Ad Soyadı</span>
                      <input
                        type="text"
                        placeholder="Ara..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-sm input-bordered w-full"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-2 border bg-slate-100">Departman</th>
                  <th className="px-6 py-2 border bg-slate-100">Pozisyon</th>
                  <th className="px-6 py-2 border bg-slate-100">Admin/Kullanıcı</th>
                  <th className="px-6 py-2 border bg-slate-100">Kullanıcı Adı</th>
                  <th className="px-6 py-2 border bg-slate-100">Şifre</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <tr key={i} className="border">
                    <td className="px-6 py-2 border text-sm text-slate-600">{u.name}</td>
                    <td className="px-6 py-2 border text-sm text-slate-600">{u.title}</td>
                    <td className="px-6 py-2 border text-sm text-slate-600">{u.company}</td>
                    <td className="px-6 py-2 border text-sm text-slate-600">{u.role}</td>
                    <td className="px-6 py-2 border text-sm text-slate-600">{u.username}</td>
                    <td className="px-6 py-2 border text-sm text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>{visiblePasswords[u.username] ? u.password : "********"}</span>
                      <button
                        className="ml-3 text-blue-600 text-xs underline"
                        onClick={() =>
                          setVisiblePasswords((prev) => ({
                            ...prev,
                            [u.username]: !prev[u.username],
                          }))
                        }
                      >
                        {visiblePasswords[u.username] ? "Gizle" : "Göster"}
                      </button>
                    </div>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tabSelected.currentTab === 2 && (
          <div role="tabpanel" className="space-y-4">
            {[
              { label: "Ad Soyad", key: "name" },
              { label: "Departman", key: "title" },
              { label: "Pozisyon", key: "company" },
              { label: "Admin/Kullanıcı", key: "role" },
              { label: "Kullanıcı Adı", key: "username" },
              { label: "Şifre", key: "password", type: "password" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block font-medium mb-1">{f.label}</label>
                <input
                  type={f.type || "text"}
                  className="input input-bordered w-full"
                  value={newUser[f.key]}
                  onChange={(e) => setNewUser({ ...newUser, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <button className="btn btn-primary mt-4" onClick={handleAddUser}>
              Kullanıcı Ekle
            </button>
          </div>
        )}

        {tabSelected.currentTab === 3 && (
          <div role="tabpanel" className="space-y-4">
            {/* Kullanıcı Sil */}
            <label className="block font-medium mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Silmek istediğiniz kullanıcı adını girin..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-error mt-4"
              onClick={() => {
                const u = searchText.trim().toLowerCase();
                if (users.some((x) => x.username.toLowerCase() === u)) {
                  setUsers((prev) => prev.filter((x) => x.username.toLowerCase() !== u));
                  setSearchText("");
                  setTabSelected({ ...tabSelected, currentTab: 1 });
                } else {
                  alert("Kullanıcı bulunamadı.");
                }
              }}
            >
              Kullanıcıyı Sil
            </button>
          </div>
        )}

        {tabSelected.currentTab === 4 && (
          <div role="tabpanel" className="space-y-4">
            {/* Video Yükleme */}
            <div>
              <label className="block font-medium mb-1">Video Başlığı *</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Video Açıklaması</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Yükleyen Kullanıcı *</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={videoUploader}
                onChange={(e) => setVideoUploader(e.target.value)}
              />
            </div>

            <label className="block font-medium mb-1">Kategori Seç / Tag Ekle *</label>

            {tagCategory === "" ? (
              <div className="flex gap-2 mb-2">
                {["Urtim", "Bilgi Sistemleri Eğitimleri", "Canias", "Departmanlar"].map(cat => (
                  <button key={cat} type="button" className="btn btn-outline btn-sm" onClick={() => {
                    if (tagCategory === cat) {
                      setTagCategory(""); setTagList([]);
                    } else {
                      setTagCategory(cat);
                      setTagList(
                        cat === "Urtim"
                          ? ["Urtim Tanıtım", "İSG"]
                          : cat === "Bilgi Sistemleri Eğitimleri"
                          ? ["Temel Bilgisayar Kullanımı", "Yazıcı & Tarayıcı Kullanımı", "Microsoft Outlook Kullanımı",
                            "Microsoft Excel Temelleri", "Microsoft Word Kullanımı", "Bilgi Güvenliği ve Şifre Yönetimi",
                            "Dosya Paylaşım ve Bulut Sistemleri", "ERP Sistemlerine Giriş", "Uzaktan Erişim ve VPN Kullanımı",
                            "Dijital İletişim Kuralları", "E-imza ve KEP Sistemleri Eğitimi", "IT Destek Süreçlerinin Tanıtımı"]
                          : cat === "CANİAS"
                          ? ["PUR‑Satın Alma Yönetimi","INV‑Depo Yönetimi","MRP‑Malzeme İhtiyaç Planlama",
                            "PRD‑Üretim Yönetimi","BAS‑Temel Yönetim","BOM‑Ürün Ağacı Yönetimi","ROU‑Rota Yönetimi",
                            "FIN‑Finans Yönetimi","VER‑Fatura Yönetimi","HCM‑İnsan Kaynakları Yönetimi",
                            "QLT‑Kalite Yönetimi","SAL‑Satış Yönetimi","AUT‑Otomasyon Yönetimi"]
                          : ["Muhasebe","Finans","Planlama","Satın Alma","Ar‑GE","Teknik Ofis","Satış","Kalite","Üretim","Depo","Lojistik","İdari İşler"]
                      );
                    }
                  }}>{cat}</button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mb-2">
  {!expandedTag ? (
    tagList.map(tag => (
      <button
        key={tag}
        type="button"
        className="btn btn-sm btn-outline"
        onClick={() => {
          if (tagCategory === "Bilgi Sistemleri Eğitimleri" && tooltipMap[tag]) {
            setExpandedTag(tag);
          } else {
            const full = `${tagCategory} > ${tag}`;
            if (!selectedTags.includes(full)) {
              setSelectedTags([...selectedTags, full]);
            }
          }
        }}
      >
        {tag}
      </button>
    ))
  ) : (
    tooltipMap[expandedTag]?.map((subtag, i) => {
      const full = `${tagCategory} > ${expandedTag} > ${subtag}`;
      return (
        <button
          key={i}
          type="button"
          className="btn btn-sm btn-outline"
          onClick={() => {
            if (!selectedTags.includes(full)) {
              setSelectedTags([...selectedTags, full]);
            }
          }}
        >
          {subtag}
        </button>
      );
    })
  )}
  <button
    className="btn btn-sm btn-error"
    onClick={() => {
      if (expandedTag) {
        setExpandedTag(null);
      } else {
        setTagCategory("");
        setTagList([]);
      }
    }}
  >
    Geri Dön
  </button>
</div>

            )}

            <div className="flex flex-wrap gap-2">
              {selectedTags.map((t,i) => (
                <span key={i} className="badge badge-primary">
                  {t} <button type="button" onClick={() => setSelectedTags(prev => prev.filter(x => x !== t))}>×</button>
                </span>
              ))}
            </div>

            <div
              className="w-full h-40 border-2 border-dashed border-blue-400 rounded flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-blue-50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && /\.(mp4|mov|wmv|avi)$/i.test(file.name)) {
                  setSelectedFile(file);
                } else {
                  alert("Sadece MP4, MOV, WMV, AVI desteklenir.");
                }
              }}
            >
              <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2"></i>
              <p className="text-sm">Sürükleyip bırakın veya dosya seçin</p>
              <input
  type="file"
  accept=".mp4,.mov,.wmv,.avi"
  multiple
  className="mt-2 file-input file-input-bordered w-full max-w-xs"
  onChange={(e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      /\.(mp4|mov|wmv|avi)$/i.test(file.name)
    );
    if (validFiles.length) {
      setSelectedFiles(validFiles);
    } else {
      alert("Sadece MP4, MOV, WMV, AVI desteklenir.");
    }
  }}
/>

              {selectedFiles.length > 0 && (
  <ul className="text-xs text-slate-500 mt-2 list-disc list-inside">
    {selectedFiles.map((file, i) => (
      <li key={i}>{file.name}</li>
    ))}
  </ul>
)}

            </div>

            {showUploadButton && (
              <button className="btn btn-primary mt-4" onClick={handleVideoUpload}>
                Video Yükle
              </button>
            )}


            {videos.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Yüklü Videolar</h3>
                <div className="space-y-4">
                  {filteredVideos.map((v, i) => (
  <div
    key={i}
    className={`border p-3 rounded-lg relative cursor-pointer ${
      selectedVideoIndex === i ? "bg-blue-50 ring-2 ring-blue-400" : ""
    }`}
    onClick={() => setSelectedVideoIndex(i)}
  >
    <strong>{v.title}</strong> by <em>{v.uploader}</em>
    <p className="text-sm">{v.description}</p>
    <p className="mt-1 text-xs text-slate-600">
      Tags: {v.tags.join(", ")}
    </p>
    {v.url && <video src={v.url} controls className="mt-2 w-full max-w-md" />}
    {selectedVideoIndex === i && (
      <button
        className="absolute top-2 right-2 btn btn-xs btn-error"
        onClick={(e) => {
          e.stopPropagation();
          setVideos((prev) => prev.filter((_, index) => index !== i));
          setSelectedVideoIndex(null);
        }}
      >
        Videoyu Kaldır
      </button>
    )}
  </div>
))}

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
