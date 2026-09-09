import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Gate } from "@/components/lunar/Gate";
import { LocaleProvider } from "@/components/lunar/Locale";
import { AuthProvider } from "@/lib/auth/provider";

import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Lunar Spark";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;700&family=Noto+Sans+Thai:wght@400;700&family=Noto+Serif+Thai:wght@400&display=swap";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#05080d" },
      {
        name: "description",
        content:
          "Lunar Spark is Gemini Spark: a quiet non-clinical Healing Partner and a Secret Room for what you do not want the world to know. Not a clinic, not a score.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "preload",
        href: "/house/poster-sm.webp",
        as: "image",
        type: "image/webp",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", href: FONT_HREF, as: "style" },
      { rel: "stylesheet", href: FONT_HREF },
    ],
  }),
  component: () => (
    <html lang="th" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <Gate>
              <Outlet />
            </Gate>
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
