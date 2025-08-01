// VideoGallery.jsx
import React, { useRef, useState, useEffect } from "react";

export default function VideoGallery({
  filterTag,
  onClear,
  videos,
  setVideos,
  currentUser,
}) {
  const [watched, setWatched] = useState({});
  const [showWatchedAlert, setShowWatchedAlert] = useState({});
  const [watchedTime, setWatchedTime] = useState({});
  const lastUpdateRef = useRef({});
  const videoRefs = useRef([]);

  const [modalVideoIdx, setModalVideoIdx] = useState(null);

  const handleTimeUpdate = (idx) => {
    const video = videoRefs.current[idx];
    if (!video || watched[idx]) return;
    const now = video.currentTime;
    const last = lastUpdateRef.current[idx] ?? now;
    const delta = now - last;
    lastUpdateRef.current[idx] = now;
    if (delta > 1.5) return;
    setWatchedTime((prev) => {
      const updated = (prev[idx] ?? 0) + delta;
      if (updated >= video.duration) {
        setWatched((w) => ({ ...w, [idx]: true }));
        setShowWatchedAlert((a) => ({ ...a, [idx]: true }));
        setTimeout(() => {
          setShowWatchedAlert((a) => ({ ...a, [idx]: false }), 3000);
        }, 3000);
      }
      return { ...prev, [idx]: updated };
    });
  };

  // Klavye tuş bloklama
  useEffect(() => {
    const blockKeys = (e) => {
      if (
        modalVideoIdx === null &&
        ["ArrowLeft", "ArrowRight", " ", "k", "j", "l"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", blockKeys);
    return () => window.removeEventListener("keydown", blockKeys);
  }, [modalVideoIdx]);

  // Modal dışında alan tıklayınca kapat
  const handleOverlayClick = (e) => {
    if (e.target.id === "video-modal-overlay") {
      setModalVideoIdx(null);
    }
  };

  const filtered = videos.filter((v) => !filterTag || v.tags.includes(filterTag));

  return (
    <>
      {/* Filtre */}
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
        {filtered.map((vid, idx) => (
          <div
            key={idx}
            className={`border p-4 rounded shadow-sm space-y-2 relative ${
              watched[idx] ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <h3 className="text-lg font-bold">{vid.title}</h3>
            <p className="text-sm text-slate-600">{vid.description}</p>
            <p className="text-xs text-slate-500">
              Yükleyen: <strong>{vid.uploader}</strong>
            </p>

            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              className={`w-full rounded ${
                currentUser?.role !== "Admin"
                  ? "pointer-events-none select-none"
                  : ""
              }`}
              src={vid.url}
              controls={currentUser?.role === "Admin"}
              onTimeUpdate={() => handleTimeUpdate(idx)}
              onContextMenu={(e) => e.preventDefault()}
              onDoubleClick={(e) => e.preventDefault()}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
            />

            <button
              className="btn btn-sm btn-outline mt-2"
              onClick={() => setModalVideoIdx(idx)}
            >
              ▶️ Büyüt
            </button>

            <div>
              {watched[idx] ? (
                <button className="btn btn-xs btn-success mt-2">İzlendi</button>
            ) : (
                <button className="btn btn-xs btn-error mt-2">İzlenmedi</button>
              )}
            </div>

            {showWatchedAlert[idx] && (
              <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded shadow">
                🎉 Video izlendi!
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalVideoIdx !== null && (
        <div
          id="video-modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-2 rounded max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-700"
              onClick={() => setModalVideoIdx(null)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2">
              {videos[modalVideoIdx].title}
            </h3>
            <video
              ref={(el) => (videoRefs.current[modalVideoIdx] = el)}
              className="w-full h-full rounded"
              src={videos[modalVideoIdx].url}
              controls={false}
              onContextMenu={(e) => e.preventDefault()}
              onDoubleClick={(e) => e.preventDefault()}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
}
