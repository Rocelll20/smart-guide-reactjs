"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

type DeviceType = "High" | "Average" | "Low";

type Device = {
  id: number;
  deviceId: string;
  type: DeviceType;

};

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [deviceId, setDeviceId] = useState<string>("");
  const [deviceType, setDeviceType] = useState<DeviceType | "">("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = () => {
    if (!deviceId.trim() || !deviceType) return;

    if (editingId !== null) {
      setDevices(
        devices.map((device) =>
          device.id === editingId
            ? { ...device, deviceId: deviceId, type: deviceType }
            : device
        )
      );

      showToast("Device updated successfully");
      setEditingId(null);
    } else {
      const newDevice: Device = {
        id: Date.now(),
        deviceId: deviceId,
        type: deviceType,

      };

      setDevices([...devices, newDevice]);
      showToast("Device added successfully");
    }

    setDeviceId("");
    setDeviceType("");
    setShowModal(false);
  };

  const handleDelete = () => {
    if (confirmDelete !== null) {
      setDevices(devices.filter((d) => d.id !== confirmDelete));
      showToast("Device deleted");
      setConfirmDelete(null);
    }
  };

  const filteredDevices = devices.filter((device) =>
    device.deviceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-[#0f172a] to-[#111827]">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Devices</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl"
        >
          <Plus size={18} />
          Add Device
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-3 top-3 text-white/80" />

        <input
          type="text"
          placeholder="Search device ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
        />
      </div>

      {/* Device List */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredDevices.map((device) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Device ID: {device.deviceId}
                  </h2>

                  <p className="text-sm text-white/60">
                    Type: {device.type}
                  </p>
                </div>

              
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    setDeviceId(device.deviceId);
                    setDeviceType(device.type);
                    setEditingId(device.id);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => setConfirmDelete(device.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400"
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-[#0f172a] p-8 rounded-2xl w-96 border border-white/10">

            <h2 className="text-xl mb-6">
              {editingId ? "Edit Device" : "Add Device"}
            </h2>

            {/* Device ID */}
            <input
              type="text"
              placeholder="Device ID"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full mb-4 p-3 rounded-xl bg-white/5 border border-white/10"
            />

            {/* Device Type Select */}
            <select
              value={deviceType}
              onChange={(e) =>
                setDeviceType(e.target.value as DeviceType)
              }
              className="w-full mb-6 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <option value="" className="bg-slate-800 text-white">Select Device Type</option>
              <option value="High" className="bg-slate-800 text-white">High Quality</option>
              <option value="Average" className="bg-slate-800 text-white">Average Quality</option>
              <option value="Low" className="bg-slate-800 text-white">Low Quality</option>
            </select>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setShowModal(false)}
                className="text-Black/60"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-600 px-5 py-2 rounded-lg"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Delete Confirm */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-[#111827] p-6 rounded-xl border border-white/10">

            <p className="mb-4">
              Are you sure you want to delete this device?
            </p>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setConfirmDelete(null)}
                className="text-white/60"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-blue-600 px-6 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

    </div>
  );
}