import {
  Binary,
  Boxes,
  Braces,
  FileCode2,
  GitBranch,
  Hash,
  KeyRound,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

export default function Branding() {
  return (
    <div className="relative order-2 h-[420px] lg:order-1 lg:h-[560px]">
      <div className="relative hidden h-full w-full items-center justify-center lg:flex">
        {/* Ambient glow */}
        <div
          className="absolute rounded-full"
          style={{
            animation:
              "6s ease-in-out 0s infinite normal none running db-breathe",
            background:
              "radial-gradient(circle, rgba(63, 166, 107, 0.16), rgba(31, 107, 67, 0.06) 50%, transparent 70%)",
            filter: "blur(20px)",
            height: "320px",
            width: "320px",
          }}
        />

        {/* Outer orbit */}
        <div
          className="absolute rounded-full border"
          style={{
            animation:
              "40s linear 0s infinite normal none running db-spin-slow",
            borderColor: "var(--border)",
            borderStyle: "dashed",
            height: "360px",
            opacity: 0.4,
            width: "360px",
          }}
        />

        {/* Inner orbit */}
        <div
          className="absolute rounded-full border"
          style={{
            animation:
              "30s linear 0s infinite reverse none running db-spin-slow",
            borderColor: "var(--border-subtle)",
            height: "280px",
            opacity: 0.3,
            width: "280px",
          }}
        />

        {/* DevBox center */}
        <div
          className="db-anim-fade-up relative z-10 flex flex-col items-center gap-3"
          style={{ animationDelay: "0.3s" }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "var(--shadow-glow), 0 12px 30px rgba(0,0,0,0.3)",
              height: "72px",
              width: "72px",
            }}
          >
            <Boxes
              color="var(--primary-foreground)"
              size={36}
              strokeWidth={2}
            />
          </div>

          <span
            className="font-bold text-sm tracking-wide"
            style={{ color: "var(--foreground-muted)" }}
          >
            DevBox
          </span>
        </div>

        {/* Snippet Vault */}
        <div
          className="db-anim-float absolute"
          style={{ left: "12%", top: "8%" }}
        >
          <div
            className="db-anim-fade-up db-delay-1 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 text-card-foreground shadow-md"
            style={{
              borderRadius: "var(--radius-lg)",
              minWidth: "150px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="flex size-[30px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--surface-active)" }}
            >
              <span style={{ color: "var(--accent-mint)" }}>
                <Terminal size={18} />
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className="truncate font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                Snippet Vault
              </span>

              <span className="truncate text-[0.6875rem] text-text-subtle">
                12 saved
              </span>
            </div>

            <span
              className="ml-auto rounded px-1.5 py-0.5 font-semibold text-[0.625rem]"
              style={{
                background: "var(--border-subtle)",
                color: "var(--foreground-subtle)",
              }}
            >
              tools
            </span>
          </div>
        </div>

        {/* JSON Formatter */}
        <div
          className="db-anim-float-slow absolute"
          style={{ right: "10%", top: "14%" }}
        >
          <div
            className="db-anim-fade-up db-delay-2 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 text-card-foreground shadow-md"
            style={{
              borderRadius: "var(--radius-lg)",
              minWidth: "150px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="flex size-[30px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--surface-active)" }}
            >
              <span style={{ color: "var(--accent-sky)" }}>
                <Braces size={18} />
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className="truncate font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                JSON Formatter
              </span>

              <span className="truncate text-[0.6875rem] text-text-subtle">
                Auto-indent
              </span>
            </div>

            <span
              className="ml-auto rounded px-1.5 py-0.5 font-semibold text-[0.625rem]"
              style={{
                background: "var(--border-subtle)",
                color: "var(--foreground-subtle)",
              }}
            >
              formatter
            </span>
          </div>
        </div>

        {/* Diff Viewer */}
        <div
          className="db-anim-float-slow absolute"
          style={{ bottom: "16%", left: "8%" }}
        >
          <div
            className="db-anim-fade-up db-delay-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 text-card-foreground shadow-md"
            style={{
              borderRadius: "var(--radius-lg)",
              minWidth: "150px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="flex size-[30px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--surface-active)" }}
            >
              <span style={{ color: "var(--accent-lavender)" }}>
                <GitBranch size={18} />
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className="truncate font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                Diff Viewer
              </span>

              <span className="truncate text-[0.6875rem] text-text-subtle">
                3 files
              </span>
            </div>

            <span
              className="ml-auto rounded px-1.5 py-0.5 font-semibold text-[0.625rem]"
              style={{
                background: "var(--border-subtle)",
                color: "var(--foreground-subtle)",
              }}
            >
              compare
            </span>
          </div>
        </div>

        {/* Base64 */}
        <div
          className="db-anim-float absolute"
          style={{ bottom: "10%", right: "12%" }}
        >
          <div
            className="db-anim-fade-up db-delay-4 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 text-card-foreground shadow-md"
            style={{
              borderRadius: "var(--radius-lg)",
              minWidth: "150px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="flex size-[30px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--surface-active)" }}
            >
              <span style={{ color: "var(--accent-lime)" }}>
                <Binary size={18} />
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className="truncate font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                Base64
              </span>

              <span className="truncate text-[0.6875rem] text-text-subtle">
                Encode / Decode
              </span>
            </div>

            <span
              className="ml-auto rounded px-1.5 py-0.5 font-semibold text-[0.625rem]"
              style={{
                background: "var(--border-subtle)",
                color: "var(--foreground-subtle)",
              }}
            >
              encode
            </span>
          </div>
        </div>

        {/* UUID Generator */}
        <div
          className="db-anim-float absolute"
          style={{ left: "4%", top: "44%" }}
        >
          <div
            className="db-anim-fade-up db-delay-5 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 text-card-foreground shadow-md"
            style={{
              borderRadius: "var(--radius-lg)",
              minWidth: "150px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="flex size-[30px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--surface-active)" }}
            >
              <span style={{ color: "var(--accent-peach)" }}>
                <Hash size={18} />
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className="truncate font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                UUID Gen
              </span>

              <span className="truncate text-[0.6875rem] text-text-subtle">
                v4 · v7
              </span>
            </div>

            <span
              className="ml-auto rounded px-1.5 py-0.5 font-semibold text-[0.625rem]"
              style={{
                background: "var(--border-subtle)",
                color: "var(--foreground-subtle)",
              }}
            >
              generate
            </span>
          </div>
        </div>

        {/* Secret Vault */}
        <div
          className="db-anim-float-slow absolute"
          style={{ right: "4%", top: "46%" }}
        >
          <div
            className="db-anim-fade-up db-delay-6 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 text-card-foreground shadow-md"
            style={{
              borderRadius: "var(--radius-lg)",
              minWidth: "150px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="flex size-[30px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--surface-active)" }}
            >
              <span style={{ color: "var(--emerald)" }}>
                <KeyRound size={18} />
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className="truncate font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                Secret Vault
              </span>

              <span className="truncate text-[0.6875rem] text-text-subtle">
                AES-256
              </span>
            </div>

            <span
              className="ml-auto rounded px-1.5 py-0.5 font-semibold text-[0.625rem]"
              style={{
                background: "var(--border-subtle)",
                color: "var(--foreground-subtle)",
              }}
            >
              secure
            </span>
          </div>
        </div>

        {/* Team Workspace */}
        <div
          className="db-anim-fade-up db-delay-4 absolute opacity-100"
          style={{
            bottom: "38%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="db-anim-float flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground shadow-md"
            style={{
              animationDelay: "2s",
              borderRadius: "var(--radius-lg)",
              minWidth: "200px",
            }}
          >
            <div
              className="flex size-[34px] shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--primary-subtle)" }}
            >
              <Users color="var(--primary)" size={16} />
            </div>

            <div className="flex flex-col">
              <span
                className="font-semibold text-xs"
                style={{ color: "var(--foreground)" }}
              >
                Team Workspace
              </span>

              <span className="text-[0.6875rem] text-text-subtle">
                4 members · active
              </span>
            </div>

            <span
              className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold text-[0.6875rem]"
              style={{
                background: "var(--success-subtle)",
                color: "var(--success)",
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{
                  animation:
                    "2s ease 0s infinite normal none running db-breathe",
                  background: "var(--success)",
                }}
              />
              live
            </span>
          </div>
        </div>

        {/* Tools ready */}
        <div
          className="db-anim-fade-up db-delay-5 absolute flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            animationDelay: "0.5s",
            background: "var(--surface-raised)",
            border: "1px solid var(--border)",
            right: "50%",
            top: "30%",
          }}
        >
          <Zap color="var(--accent-lime)" size={13} />

          <span
            className="font-semibold text-[0.6875rem]"
            style={{ color: "var(--foreground-muted)" }}
          >
            24 tools ready
          </span>
        </div>

        {/* Code snippet */}
        <div
          className="db-anim-fade-up db-delay-3 absolute rounded-lg px-3 py-2 font-mono text-[0.6875rem] leading-relaxed"
          style={{
            animationDelay: "0.4s",
            background: "var(--surface)",
            border: "1px solid var(--border-subtle)",
            color: "var(--foreground-muted)",
            left: "50%",
            top: "24%",
            transform: "translateX(-50%)",
          }}
        >
          <span style={{ color: "var(--accent-lavender)" }}>const</span>{" "}
          <span style={{ color: "var(--accent-sky)" }}>box</span> ={" "}
          <span style={{ color: "var(--accent-mint)" }}>DevBox</span>
          <span className="text-text-subtle">.</span>
          <span style={{ color: "var(--primary)" }}>open</span>
          ()
        </div>

        {/* File code */}
        <div
          className="db-anim-fade-up db-delay-6 absolute flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
          style={{
            animationDelay: "0.6s",
            background: "var(--surface)",
            border: "1px solid var(--border-subtle)",
            bottom: "30%",
            right: "40%",
          }}
        >
          <FileCode2 color="var(--accent-sky)" size={13} />

          <span
            className="font-medium text-[0.6875rem]"
            style={{ color: "var(--foreground-muted)" }}
          >
            utils.ts
          </span>
        </div>
      </div>
    </div>
  );
}
