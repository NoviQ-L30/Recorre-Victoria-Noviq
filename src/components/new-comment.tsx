"use client";

import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export function NewComment() {
  const [comment, setComment] = useState("");

  const emojis = ["👍", "😊", "😄", "😍", "😢", "😡"];

  const handleEmojiClick = (emoji: string) => {
    setComment((prev) => prev + " " + emoji);
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
      <textarea
        className="w-full p-3 border-none rounded resize-none focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400"
        rows={4}
        placeholder="Ingresa un comentario..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* línea divisora */}
      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
        <div className="flex gap-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition">
          <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
        </button>
      </div>
    </div>
  );
}
