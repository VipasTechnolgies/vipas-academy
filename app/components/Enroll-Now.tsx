"use client";
import React, { useState } from "react";
import { X, PhoneCall } from "lucide-react";   // <-- Add PhoneCall import
import ContactForm from "@/app/components/expertguidence";

export default function EnrollModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-teal-600 hover:bg-blue-900 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
    <PhoneCall className="w-5 h-5" />
        Enroll Now
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[30%] max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 animate-fade-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <ContactForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>

  );
}

 