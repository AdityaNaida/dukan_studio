/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { uploadChatImage } from "@/lib/api";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  image: any;
  setImage: any;
  placeholder?: string;
  disabled?: boolean;
};

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const EMPTY_IMAGE = {
  isLoading: false,
  error: "",
  dbData: {},
  aiData: {},
  previewUrl: "",
};

export default function Composer({
  value,
  onChange,
  onSubmit,
  image,
  setImage,
  placeholder = "Ask about your poster...",
  disabled = false,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const previewUrl = image?.previewUrl || image?.dbData?.filePath || "";
  const hasAttachment = Boolean(previewUrl || image?.error);
  const sendDisabled = disabled || image?.isLoading;

  const clearAttachment = () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setFileName("");
    setImage({ ...EMPTY_IMAGE });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setImage((prev: any) => ({
        ...prev,
        error: "Image must be under 10MB.",
      }));
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setImage((prev: any) => ({
        ...prev,
        error: "Use a JPEG, PNG, GIF or WebP image.",
      }));
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setFileName(file.name);

    // Base64 for Gemini's inlineData; the file itself goes to storage.
    const reader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result !== "string") {
        setImage((prev: any) => ({
          ...prev,
          error: "Could not read that file.",
          isLoading: false,
        }));
        return;
      }

      const aiData = {
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type,
        },
      };

      setImage({
        isLoading: true,
        error: "",
        dbData: {},
        aiData,
        previewUrl: localPreview,
      });

      try {
        const publicUrl = await uploadChatImage(file);
        setImage((prev: any) => ({
          ...prev,
          isLoading: false,
          dbData: { filePath: publicUrl },
        }));
      } catch (err) {
        console.error("Upload error:", err);
        setImage((prev: any) => ({
          ...prev,
          isLoading: false,
          aiData: {},
          error: "Upload failed — remove it and try again.",
        }));
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.onerror = () => {
      setImage((prev: any) => ({
        ...prev,
        error: "Could not read that file.",
        isLoading: false,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[calc(100%-24px)] md:w-full md:max-w-2xl absolute bottom-4 md:bottom-2 z-20 left-1/2 -translate-x-1/2 flex flex-col gap-2.5 rounded-xl border border-ink/15 bg-paper-raised p-3 shadow-[0_14px_36px_rgba(34,29,24,0.14)]"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />

      {hasAttachment && (
        <div className="flex items-center gap-3 border-b border-dashed border-ink/15 pb-2.5">
          {previewUrl && (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-ink/15 bg-paper-deep/50">
              <img
                src={previewUrl}
                alt="Attached poster"
                className="h-full w-full object-cover"
              />
              {image?.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/45">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-5 animate-spin text-paper-raised"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.437A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">
              {fileName || "poster image"}
            </p>
            <p
              className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                image?.error
                  ? "text-vermilion"
                  : image?.isLoading
                    ? "text-amber-700"
                    : "text-leaf"
              }`}
            >
              {image?.error
                ? image.error
                : image?.isLoading
                  ? "uploading…"
                  : "● attached — add your prompt"}
            </p>
          </div>
          <button
            type="button"
            onClick={clearAttachment}
            aria-label="Remove attached image"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-vermilion/50 hover:text-vermilion"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={image?.isLoading || disabled}
          aria-label="Attach a poster image"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-deep/60 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </button>

        <input
          type="text"
          placeholder={disabled ? "Please wait..." : placeholder}
          className="text-sm flex-1 min-w-0 bg-transparent outline-none placeholder:text-ink-soft/60"
          required
          name="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />

        <button
          type="submit"
          disabled={sendDisabled}
          aria-label="Send"
          className={
            sendDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 text-vermilion transition-transform hover:scale-105"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
