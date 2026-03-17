"use client";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 h-screen">
        
        {/* Column 1: 1/12 */}
        <div className="col-span-1 bg-woodsmoke border-r p-4">
          <p className="text-xs text-gray-500">Col 1</p>
        </div>

        {/* Column 2: 3/12 (quarter) */}
        <div className="col-span-3 bg-charade border-r p-4">
          <p className="text-sm text-gray-500">Col 2</p>
        </div>

        {/* Column 3: 6/12 (half) */}
        <div className="col-span-6 bg-woodsmoke border-r p-4">
          <p className="text-sm text-gray-500">Col 3</p>
        </div>

        {/* Column 4: 2/12 (remainder) */}
        <div className="col-span-2 bg-charade p-4">
          <p className="text-sm text-gray-500">Col 4</p>
        </div>

      </div>
  );
}