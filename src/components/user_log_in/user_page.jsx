import React, { useState, useRef, useEffect } from "react";
import VideoGallery from "./video_gallery"; // doğru dosya yolu olduğundan emin ol


export default function UserPage({ videos, setVideos, currentUser }) {
  const [tabSelected, setTabSelected] = useState({ currentTab: 1, noTabs: 3 });
  const [hoveredTab, setHoveredTab] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [watched, setWatched] = useState({});
  const [showWatchedAlert, setShowWatchedAlert] = useState({});
  const [tagCategory, setTagCategory] = useState(null);
  const [expandedTag, setExpandedTag] = useState(null);

  const wrapperRef = useRef(null);

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
    "IT Destek Süreçlerinin Tanıtımı": ["BT yardım süreci", "Destek talepleri"]
  };

  const dropdownTags = {
    1: ["Urtim Tanıtım", "İSG"],
    2: Object.keys(tooltipMap),
    3: ["PUR‑Satın Alma Yönetimi", "INV‑Depo Yönetimi", "MRP‑Malzeme İhtiyaç Planlama", "PRD‑Üretim Yönetimi", "BAS‑Temel Yönetim", "BOM-Ürün Ağacı Yönetimi", "ROU-Rota Yönetimi", "FIN-Finans Yönetimi", "VER- Fatura Yönetimi", "HCM-İnsan Kaynakları Yönetimi", "QLT-Kalite Yönetimi", "SAL-Satış Yönetimi", "AUT-Otomasyon Yönetimi"],
    4: ["Muhasebe", "Finans", "Planlama", "Satın Alma", "Ar-GE", "Teknik Ofis", "Satış", "Kalite", "Üretim", "Depo", "Lojistik", "İdari İşler"]
};

const [isLarge, setIsLarge] = useState(false);

useEffect(() => {
  const handleFullscreenToggle = (e) => {
    if (e.key.toLowerCase() === "f" && currentUser?.role !== "Admin") {
      const hoverIndex = videoRefs.current.findIndex(
        (video) => video && video.matches(":hover")
      );
      if (hoverIndex !== -1) {
        e.preventDefault();
        setIsLarge((prev) => ({
          ...prev,
          [hoverIndex]: !prev[hoverIndex],
        }));
      }
    }
  };

  window.addEventListener("keydown", handleFullscreenToggle);
  return () => window.removeEventListener("keydown", handleFullscreenToggle);
}, [currentUser]);



  const handleKeyDown = (e) => {
    if (wrapperRef.current?.contains(e.target)) {
      if (e.keyCode === 39) {
        setTabSelected((prev) => ({
          ...prev,
          currentTab: prev.currentTab < prev.noTabs ? prev.currentTab + 1 : 1,
        }));
      }
      if (e.keyCode === 37) {
        setTabSelected((prev) => ({
          ...prev,
          currentTab: prev.currentTab > 1 ? prev.currentTab - 1 : prev.noTabs,
        }));
      }
    }
  };

const videoRefs = useRef([]);
const [fullscreenVideoIndex, setFullscreenVideoIndex] = useState(null);

useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key.toLowerCase() === "f" && currentUser?.role !== "Admin") {
      const hoveredIndex = videoRefs.current.findIndex(
        (video) => video && video.matches(":hover")
      );
      if (hoveredIndex !== -1) {
        const video = videoRefs.current[hoveredIndex];
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setFullscreenVideoIndex(null);
        } else {
          video?.requestFullscreen?.().then(() => {
            setFullscreenVideoIndex(hoveredIndex);
          });
        }
      }
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, [currentUser]);


useEffect(() => {
  const handleKeyPress = (e) => {
    const focusedVideo = videoRefs.current.find((video) =>
      video?.matches(':hover')
    );
    if (!focusedVideo) return;

    if (e.code === "Space") {
      e.preventDefault();
      if (focusedVideo.paused) {
        focusedVideo.play();
      } else {
        focusedVideo.pause();
      }
    }

    if (e.key.toLowerCase() === "f") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        focusedVideo.requestFullscreen?.();
      }
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, []);

const [isFullscreen, setIsFullscreen] = useState(false);

useEffect(() => {
  const handleKeydown = (e) => {
    if (e.key.toLowerCase() === "f") {
      const playingVideo = videoRefs.current.find(v => v && !v.paused);
      if (playingVideo) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          playingVideo.requestFullscreen?.();
        }
      }
    }
  };

  window.addEventListener("keydown", handleKeydown);
  return () => window.removeEventListener("keydown", handleKeydown);
}, []);


useEffect(() => {
  const handleFsChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  document.addEventListener('fullscreenchange', handleFsChange);
  return () => document.removeEventListener('fullscreenchange', handleFsChange);
}, []);

useEffect(() => {
  const handler = (e) => {
    if (e.key.toLowerCase() === 'f') {
      const video = videoRefs.current.find(v => v && !v.paused);
      if (video) {
        e.preventDefault();
        if (!isFullscreen) video.requestFullscreen?.();
        else document.exitFullscreen();
      }
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, [isFullscreen]);



  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);




const renderDropdown = (tabId) => {
  const categoryName =
    tabId === 1 ? "Urtim" :
    tabId === 2 ? "Bilgi Sistemleri Eğitimleri" :
    tabId === 3 ? "Canias" :
    "Departmanlar";

  const tagList = dropdownTags[tabId];

  return (
    <div className="absolute left-1/2 top-full z-10 w-full -translate-x-1/2 rounded-md border border-slate-200 bg-white text-sm shadow-lg">
      <ul className="py-2 max-h-80 overflow-auto">
        {!expandedTag ? (
          tagList.map((tag, idx) => {
            const isExpandable = tooltipMap[tag];
            return (
              <li
                key={idx}
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                onClick={() =>
                  isExpandable
                    ? setExpandedTag({ tag, category: categoryName })
                    : setSelectedFilter(`${categoryName} > ${tag}`)
                }
              >
                {tag}
              </li>
            );
          })
        ) : (
          tooltipMap[expandedTag.tag].map((sub, idx) => (
            <li
              key={idx}
              className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
              onClick={() =>
                setSelectedFilter(`${expandedTag.category} > ${expandedTag.tag} > ${sub}`)
              }
            >
              {sub}
            </li>
          ))
        )}
      </ul>
      <div className="border-t px-4 py-2 text-right">
        <button
          className="btn btn-xs btn-error"
          onClick={() => setExpandedTag(null)}
        >
          {expandedTag ? "Geri Dön" : "Kapat"}
        </button>
      </div>
    </div>
  );
};


  const handleDeleteVideo = (indexToDelete) => {
    const confirmDelete = window.confirm("Bu videoyu silmek istiyor musunuz?");
    if (confirmDelete) {
      setVideos((prev) => prev.filter((_, i) => i !== indexToDelete));
    }
  };

  const VideoGallery = ({ filterTag, onClear }) => {
    const filteredVideos = videos.filter((v) =>
      !filterTag || v.tags.includes(filterTag)
    );

    return (
      <>
        <div className="mb-4 flex items-center gap-2">
          <span className="font-medium">Filtre:</span>
          {filterTag ? (
            <>
              <span className="badge badge-primary">{filterTag}</span>
              <button className="btn btn-xs btn-error" onClick={onClear}>
                Filtreyi Temizle
              </button>
            </>
          ) : (
            <span className="text-slate-500 text-sm">Seçilmedi</span>
          )}
        </div>

        <div className="grid gap-4">
          {filteredVideos.length ? (
            filteredVideos.map((vid, idx) => (
              <div
    key={idx}
    className={`border p-4 rounded shadow-sm space-y-2 relative ${
      watched[idx] ? "bg-green-50" : "bg-red-50"
    }`}
  >
                {currentUser?.role === "Admin" && (
                  <div className="absolute top-2 right-2 group relative">
                    <i className="fa-solid fa-gear text-gray-500 hover:text-blue-600 cursor-pointer"></i>
                    <div className="hidden group-hover:block absolute top-6 right-0 z-10 bg-white border rounded shadow p-2">
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => handleDeleteVideo(idx)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                )}
                <h3 className="text-lg font-bold">{vid.title}</h3>
                <p className="text-sm text-slate-600">{vid.description}</p>
                <p className="text-xs text-slate-500">
                  Yükleyen: <strong>{vid.uploader}</strong>
                </p>
                <p className="text-xs">
                  Etiketler:{" "}
                  {vid.tags.map((t, i) => (
                    <span key={i} className="badge badge-outline mr-1">
                      {t}
                    </span>
                  ))}
                </p>
<video
  ref={(el) => (videoRefs.current[idx] = el)}
  src={vid.url}
  className={`rounded mt-2 transition-all duration-300 w-full max-w-xl`}
  controls={currentUser?.role === "Admin"}
  onEnded={() => {
    setWatched((prev) => ({ ...prev, [idx]: true }));
    setShowWatchedAlert((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setShowWatchedAlert((prev) => ({ ...prev, [idx]: false }));
    }, 3000);
  }}
/>


                <div>
  {watched[idx] ? (<><button className="btn btn-xs btn-success mt-2">İzlendi</button>

  </>
    
    
  ) : (<>    <button className="btn btn-xs btn-error mt-2">İzlenmedi</button>
  
  </>

  )}
</div>
{showWatchedAlert[idx] && (
  <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded shadow">
    🎉 Video izlendi!
  </div>
)}

              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm">Gösterilecek video bulunamadı.</p>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <section className="max-w-full" aria-multiselectable="false">
        <ul
          className="flex items-center border-b border-slate-200"
          role="tablist"
          ref={wrapperRef}
        >
          {[1, 2, 3, 4].map((tabId) => (
            <li
              className="relative flex-1"
              role="presentation"
              key={tabId}
              onMouseEnter={() => setHoveredTab(tabId)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 ${
                  tabSelected.currentTab === tabId
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-slate-700 hover:border-blue-500 hover:text-blue-500"
                }`}
                onClick={() => {
                  setExpandedTag(null);
                  setTabSelected({ ...tabSelected, currentTab: tabId });
                }}
              >
                <span>
                  {tabId === 1
                    ? "Urtim"
                    : tabId === 2
                    ? "Bilgi Sistemleri Eğitimleri"
                    : tabId === 3
                    ? "Canias"
                    : "Departmanlar"}
                </span>
              </button>
              {hoveredTab === tabId && renderDropdown(tabId)}
            </li>
          ))}
        </ul>

        <div className="px-6 py-8 bg-slate-50 border-t mt-10">
  <h2 className="text-xl font-semibold mb-4">Eğitim Videoları</h2>
  <VideoGallery
    filterTag={selectedFilter}
    onClear={() => setSelectedFilter("")}
    videos={videos}
    setVideos={setVideos}
    currentUser={currentUser}
  />
</div>

      </section>
    </>
  );
}
