import { cn } from "@/lib/utils/tailwind-util";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

export interface DialogRef {
  showModal: () => void;
  close: () => void;
}

interface DialogProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const Dialog = forwardRef<DialogRef, DialogProps>(
  ({ children, className = "", onClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      showModal: () => {
        dialogRef.current?.showModal();
      },
      close: () => {
        dialogRef.current?.close();
      },
    }));

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog || !onClose) return;

      const handleClose = () => {
        onClose();
      };

      dialog.addEventListener("close", handleClose);
      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }, [onClose]);

    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <dialog
          ref={dialogRef}
          className={cn([
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center backdrop:bg-black/50 backdrop:backdrop-blur-sm p-4 min-w-96",
            className,
          ])}
          style={{
            margin: 0,
            border: "none",
            borderRadius: "0.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {children}
        </dialog>
      </>
    );
  }
);

Dialog.displayName = "Dialog";

export default Dialog;
