"use client";
import { useState } from "react";
import RoomSidebar from "../components/RoomSidebar";
import DMList from "../components/DMList";
import RoomPanel from "../components/RoomPanel";
import { Room } from "../types/dashboard";
import MessagesPanel from "../components/MessagesPanel";
import UserPanel from "../components/UserPanel";

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showingDMs, setShowingDMs] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const dmRooms = rooms.filter((r) => r.type === "DIRECT_MESSAGE");

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowingDMs(false);
  };

  const handleSelectDMs = () => {
    setShowingDMs(true);
    setSelectedRoom(null);
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Column 1: 1/12 — Room sidebar */}
      <div className="col-span-1 bg-woodsmoke border-r border-charade">
        <RoomSidebar
          selectedRoomId={selectedRoom?.id ?? null}
          onSelectRoom={handleSelectRoom}
          onSelectDMs={handleSelectDMs}
          showingDMs={showingDMs}
          onRoomsLoaded={setRooms}
        />
      </div>

      {/* Column 2: 3/12 — DM list or room member list */}
      <div className="col-span-3 bg-charade border-r border-woodsmoke">
        {showingDMs ? (
          <DMList
            rooms={dmRooms}
            selectedRoomId={selectedRoom?.id ?? null}
            onSelectRoom={handleSelectRoom}
          />
        ) : selectedRoom ? (
          <RoomPanel room={selectedRoom} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">Select a room</p>
          </div>
        )}
      </div>

      {/* Column 3: 6/12 — Messages */}
      <div className="col-span-6 bg-woodsmoke overflow-hidden">
        <MessagesPanel room={selectedRoom} />
      </div>

      {/* Column 4: 2/12 — Members / info */}
      <div className="col-span-2 bg-charade">
        <UserPanel />
      </div>
    </div>
  );
}
