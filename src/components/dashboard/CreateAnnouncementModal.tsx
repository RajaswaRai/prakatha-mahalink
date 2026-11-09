// src/components/dashboard/CreateAnnouncementModal.jsx
import { Calendar, Paperclip, Send, X } from "lucide-react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAnnouncementModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-5 border border-gray-100">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
              <Send className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              Buat Pengumuman Baru
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-4 text-xs"
        >
          <div className="space-y-1.5">
            <label className="block font-semibold text-gray-700">
              Judul Pengumuman
            </label>
            <input
              type="text"
              placeholder="Contoh: Seleksi Gemastik 2027"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-200 rounded-xl font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#15224F] text-white rounded-xl font-semibold"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
