import { useEffect, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Search,
  Mic,
  Sparkles,
  ArrowUpRight,
  X,
} from "lucide-react";

const ALLOWED_MODES = ["EXPLORE", "LEARN", "CAREER", "RESEARCH"];

const animation = {
  duration: 0.25,
  ease: [0.22, 1, 0.36, 1],
};

export function SearchBar({
  initialValue = "",
  compact = false,
  initialMode = "EXPLORE",
}) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const currentSearch = useRouterState({
    select: (state) => state.location.search,
  });

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;

      if (recognition) {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;

        try {
          recognition.abort();
        } catch {
          // Recognition may already have stopped.
        }

        recognitionRef.current = null;
      }
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery) return;

    const requestedMode =
      typeof currentSearch?.mode === "string"
        ? currentSearch.mode.toUpperCase()
        : initialMode.toUpperCase();

    const mode = ALLOWED_MODES.includes(requestedMode)
      ? requestedMode
      : "EXPLORE";

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Recognition may already have stopped.
      }

      recognitionRef.current = null;
      setIsListening(false);
    }

    navigate({
      to: "/search",
      search: {
        q: searchQuery,
        mode,
      },
    });
  }

  function handleVoiceSearch() {
    setVoiceError("");

    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Voice search is not supported in this browser. Try Chrome or Edge.",
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Recognition may already have stopped.
      }

      setIsListening(false);
      return;
    }

    let recognition;

    try {
      recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError("");
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setQuery(transcript);
      };

      recognition.onerror = (event) => {
        setIsListening(false);

        if (event.error === "not-allowed") {
          setVoiceError("Allow microphone access to use voice search.");
        } else if (
          event.error !== "no-speech" &&
          event.error !== "aborted"
        ) {
          setVoiceError("Voice search could not start. Please try again.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);

        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
        }
      };

      recognition.start();
    } catch {
      if (recognition) {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
      }

      recognitionRef.current = null;
      setIsListening(false);
      setVoiceError("Voice search could not start. Please try again.");
    }
  }

  function clearSearch() {
    setQuery("");
    setVoiceError("");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      animate={{ y: isFocused ? -1 : 0 }}
      transition={animation}
      className="w-full"
      role="search"
    >
      <div
        className="relative flex items-center gap-2 overflow-hidden rounded-[16px] border px-3 transition-all duration-300 sm:gap-3 sm:px-4"
        style={{
          minHeight: compact ? 48 : 66,
          borderColor: isFocused
            ? "rgba(145,71,255,0.55)"
            : "rgba(255,255,255,0.09)",
          background: isFocused
            ? "linear-gradient(120deg, #100c17 0%, #0b0910 100%)"
            : "linear-gradient(120deg, #0e0b13 0%, #09080d 100%)",
          boxShadow: isFocused
            ? "0 0 0 1px rgba(145,71,255,0.08), 0 12px 38px rgba(0,0,0,0.25), 0 0 35px rgba(91,33,182,0.07)"
            : "0 8px 28px rgba(0,0,0,0.15)",
        }}
      >
        <Search
          size={19}
          strokeWidth={1.7}
          aria-hidden="true"
          className={`ml-0.5 shrink-0 transition-colors duration-300 ${
            isFocused ? "text-[#bda5ff]" : "text-white/35"
          }`}
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask a question. Follow your curiosity."
          aria-label="Search QUIXO"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-3 text-[14px] text-[#f2eefb] outline-none placeholder:text-white/30 sm:text-[15px]"
        />

        {query && (
          <button
            type="button"
            aria-label="Clear search"
            title="Clear search"
            onClick={clearSearch}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-white/35 transition-colors hover:bg-white/[0.05] hover:text-white/80"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}

        {!compact && (
          <span className="hidden items-center gap-2 border-l border-white/[0.09] pl-3 text-[10px] tracking-[0.12em] text-white/30 sm:flex">
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="size-1.5 rounded-full bg-[#a78bfa]"
              style={{
                boxShadow: "0 0 9px rgba(167,139,250,0.65)",
              }}
            />
            QUIXO
          </span>
        )}

        <motion.button
          type="button"
          aria-label={isListening ? "Stop voice search" : "Search by voice"}
          title={isListening ? "Stop listening" : "Search by voice"}
          whileTap={{ scale: 0.93 }}
          onClick={handleVoiceSearch}
          className={`relative grid size-9 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
            isListening
              ? "border-violet-300/35 bg-violet-500/[0.13] text-[#c4b5fd]"
              : "border-white/[0.08] bg-white/[0.025] text-white/45 hover:border-violet-300/25 hover:text-[#c4b5fd]"
          }`}
        >
          {isListening && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl border border-violet-300/40"
              animate={{ opacity: [0.8, 0], scale: [1, 1.35] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}

          <motion.span
            animate={isListening ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{
              duration: 1,
              repeat: isListening ? Infinity : 0,
            }}
          >
            <Mic size={16} aria-hidden="true" />
          </motion.span>
        </motion.button>

        <motion.button
          type="submit"
          aria-label="Submit search"
          title="Search"
          disabled={!query.trim()}
          whileHover={query.trim() ? { scale: 1.045 } : undefined}
          whileTap={query.trim() ? { scale: 0.95 } : undefined}
          className="group relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-violet-300/20 text-[#f2eaff] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            background:
              "linear-gradient(145deg, #342050 0%, #21132f 48%, #120d1b 100%)",
            boxShadow: query.trim()
              ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 18px rgba(109,40,217,0.1)"
              : "none",
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(196,181,253,0.12), transparent 65%)",
            }}
          />

          <ArrowUpRight size={17} className="relative" aria-hidden="true" />
        </motion.button>
      </div>

      {voiceError && (
        <p role="status" className="mt-2 text-xs text-amber-200/80">
          {voiceError}
        </p>
      )}

      {!compact && (
        <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/30">
          <Sparkles size={12} className="text-[#a78bfa]/80" aria-hidden="true" />
          Search with intention. Explore with confidence.
        </p>
      )}
    </motion.form>
  );
}

