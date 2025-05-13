// components/CommentsSection.tsx
"use client";
import { useState } from "react";
import CommentCard from "./comment-card";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const emojis = ["👍", "😊", "😄", "😍", "😢", "😡"];

const dummyComments = [
  {
    img: "/image/user1.jpg",
    name: "Mary Lewis",
    desc: "Just watched the latest Bollywood blockbuster! The songs were so catchy, and the dance numbers were breathtaking...",
    hours: "2 weeks ago",
  },
];

export default function CommentsSection() {
  const [comment, setComment] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setComment((prev) => prev + " " + emoji);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      <div className="bg-white border rounded-lg p-4 shadow-sm mb-2">
        <textarea
          className="w-full p-3 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows={4}
          placeholder="Enter your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
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

      <h3 className="text-lg font-semibold my-4">12 Comments</h3>
      <div className="space-y-6">
        {dummyComments.map((comment, i) => (
          <CommentCard key={i} {...comment} />
        ))}
      </div>
    </div>
  );
}
