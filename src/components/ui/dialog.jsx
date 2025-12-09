"use client";

import * as React from "react";
import { X } from "lucide-react";

export function Dialog({ open, onOpenChange, children }) {
  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => onOpenChange(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-4 w-full max-w-lg animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="space-y-4">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}
