"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CircleX, CircleCheckBig } from "lucide-react";
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-x-2 items-center">
              {title === "error" ? (
                <ToastTitle>
                  <CircleX className="text-red-600" size={30} />
                </ToastTitle>
              ) : title === "success" ? (
                <ToastTitle>
                  <CircleCheckBig className="text-green-600" size={30} />
                </ToastTitle>
              ) : (
                ""
              )}

              {description && (
                <ToastDescription className="text-xl font-bold">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
