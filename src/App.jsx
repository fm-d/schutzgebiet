import { useEffect, useMemo, useState, useRef } from "react";
import logoLarge from "./assets/logo-150px.svg";
import logoSmall from "./assets/logo-75px.svg";
import buttonBrightToDark from "./assets/button-bright-to-dark.svg";
import buttonDarkToBright from "./assets/button-dark-to-bright.svg";

const HOME_INFO = `
is an 
independent 
music label and 
artist collective 
started 2026 in Vienna.`;

const RELEASES = [
  {
    id: "sg001",
    label: "SG001:",
    text: "DUUN - S/T (2026)",
    href: "https://schutzgebiet.bandcamp.com/album/s-t-2026",
    platform: "bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=3165251504/size=large/bgcol=ebf1f4/linkcol=061a44/package=238850783/transparent=true/",

  },
  {
    id: "sg00x-v7c",
    label: "SG00X:",
    text: "v7c - Horizon’s Blue Wing (2026)",
    href: "#",
  },
  {
    id: "sg00x-fmd",
    label: "SG00X:",
    text: "F.M. Deutsch - duun-2 pres. KABALAH (2026)",
    href: "#",
  },
  {
    id: "sg00x-oel",
    label: "SG00X:",
    text: "Ora Et Labora - Covercompilation (2026)",
    href: "#",
  },
  {
    id: "sg00x-tria",
    label: "SG00X:",
    text: "Tria - LP (2026)",
    href: "#",
  },
];

const MIXES = [
  {
    id: "mix001",
    label: "SCHUTZ MIX 001:",
    text: "Studio am Stacheldraht",
    href: "https://soundcloud.com/schutzgebiet/schutz-mix-1-studio-am-stacheldraht",
    platform: "soundcloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2246564714&color=%23d30202&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  },
  {
    id: "mix002",
    label: "SCHUTZ MIX 002:",
    text: "Hitparade",
    href: "https://soundcloud.com/schutzgebiet/schutz-mix-002",
    platform: "soundcloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2256196379&color=%23d30202&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  },
  {
    id: "mix003",
    label: "SCHUTZ MIX 003:",
    text: "Ghosted by the USA",
    href: "https://soundcloud.com/schutzgebiet/schutz-mix-003",
    platform: "soundcloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2256248570&color=%23d30202&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  },
  {
    id: "mix004",
    label: "SCHUTZ MIX 004:",
    text: "Lend a Hand and Lift Me",
    href: "https://soundcloud.com/schutzgebiet/schutz-mix-004",
    platform: "soundcloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2268996284&color=%23d30202&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  },
];

const PRESENTED_WORKS = [
  {
    id: "7571",
    label: "☆7571 -",
    text: "Demos 4 You (2026)",
    href: "https://7571.bandcamp.com/album/demos-4-you-2025",
    platform: "bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=583838162/size=large/bgcol=ebf1f4/linkcol=061a44/package=752024074/transparent=true/",
  },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [mobilePage, setMobilePage] = useState("home");
  const [activeMedia, setActiveMedia] = useState(null);
  const [visibleMedia, setVisibleMedia] = useState(null);
  const [isMediaVisible, setIsMediaVisible] = useState(false);
  const mediaRef = useRef(null);

  const isBright = theme === "bright";

  const palette = useMemo(
    () => ({
      background: isBright ? "#EBF1F4" : "#061A44",
      text: isBright ? "#061A44" : "#EBF1F4",
      external: "#D30202",
      selectionBackground: isBright ? "#061A44" : "#EBF1F4",
      selectionText: isBright ? "#EBF1F4" : "#061A44",
      overlayBackground: isBright ? "rgba(235, 241, 244, 0.96)" : "rgba(6, 26, 68, 0.96)",
    }),
    [isBright]
  );

  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", palette.background);
    }
  }, [palette.background]);

  useEffect(() => {
    document.body.style.overflow = activeMedia && window.innerWidth < 768 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeMedia]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!activeMedia) return;

      const target = event.target;

      if (!(target instanceof Element)) return;

      if (
        target.closest("a") ||
        target.closest("button")
      ) {
        return;
      }

      if (mediaRef.current && !mediaRef.current.contains(target)) {
        setActiveMedia(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMedia]);

  useEffect(() => {
    if (activeMedia) {
      setIsMediaVisible(false);
      setVisibleMedia(activeMedia);

      const frame = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setIsMediaVisible(true);
        });

        return () => cancelAnimationFrame(frame2);
      });

      return () => cancelAnimationFrame(frame);
    }

    setIsMediaVisible(false);

    const timeout = setTimeout(() => {
      setVisibleMedia(null);
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeMedia]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "bright" ? "dark" : "bright"));
  };

  const handleCatalogueClick = (event) => {
    const isMobile = window.innerWidth < 780;

    if (isMobile) {
      event.preventDefault();
      setMobilePage("catalogue");
    }
  };

  const handleLogoClick = (event) => {
    const isMobile = window.innerWidth < 780;

    if (isMobile) {
      event.preventDefault();
      setMobilePage("home");
      setActiveMedia(null);
    }
  };

  const handleOpenMedia = (item) => {
    if (!item.embedUrl) return;
    setActiveMedia(item);
  };

  const handleCloseMedia = () => {
    setActiveMedia(null);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
      }}
    >
      <div className="mx-auto min-h-screen px-5 py-5 md:px-5 md:py-5">
        <div className="relative hidden h-[calc(100vh-40px)] md:block">
          <div className="absolute top-0 left-0 z-10">
            <ThemeButton theme={theme} onClick={handleThemeToggle} />
          </div>
          <div className="flex h-full justify-center gap-5">
            <DesktopHomeColumn
              palette={palette}
              theme={theme}
              onThemeToggle={handleThemeToggle}
            />
            <DesktopCatalogueColumn
              palette={palette}
              theme={theme}
              activeMedia={activeMedia}
              onOpenMedia={handleOpenMedia}
            />
          </div>

          {visibleMedia ? (
            <div
              className="absolute top-0 left-[calc(50%+10px+25vw)] h-full transition-opacity duration-300 ease-out"
              style={{ opacity: isMediaVisible ? 1 : 0 }}
            >
              <DesktopMediaColumn
                palette={palette}
                theme={theme}
                activeMedia={visibleMedia}
                onClose={handleCloseMedia}
                mediaRef={mediaRef}
              />
            </div>
          ) : null}
        </div>

        <div className="min-h-[calc(100vh-40px)] md:hidden">
          {mobilePage === "home" ? (
            <MobileHomePage
              palette={palette}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              onCatalogueClick={handleCatalogueClick}
            />
          ) : (
            <MobileCataloguePage
              palette={palette}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              onLogoClick={handleLogoClick}
              activeMedia={activeMedia}
              onOpenMedia={handleOpenMedia}
            />
          )}
        </div>
      </div>

      {visibleMedia ? (
        <MobileMediaOverlay
          palette={palette}
          theme={theme}
          activeMedia={visibleMedia}
          onClose={handleCloseMedia}
          isVisible={isMediaVisible}

        />
      ) : null}
    </div>
  );
}

function DesktopHomeColumn({ palette, theme, onThemeToggle }) {
  return (
    <div
      className="flex h-[calc(100vh-40px)] w-[25vw] min-w-[320px] flex-col justify-between"
      style={{ color: palette.text }}
    >
      <div className="flex items-start justify-end">
        <img
          src={logoLarge}
          alt="Schutzgebiet"
          className="h-auto w-[150px]"
          draggable="false"
        />
      </div>

      <div className="whitespace-pre-line text-right text-[16px] leading-[1.35]">
        {HOME_INFO}
      </div>

      <nav className="flex flex-col items-end gap-2 text-[24px] leading-none">
        <span
          className="line-through no-underline"
          style={{ color: palette.external, textDecorationLine: "line-through" }}
        >
          SPOTIFY→
        </span>
        <a
          href="https://schutzgebiet.bandcamp.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.external }}
        >
          BANDCAMP→
        </a>
        <a
          href="https://www.ninaprotocol.com/profiles/schutzgebiet/"
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.external }}
        >
          NINA PROTOCOL→
        </a>
        <a
          href="https://www.soundcloud.com/schutzgebiet/"
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.external }}
        >
          SOUNDCLOUD→
        </a>
      </nav>

      <div className="flex justify-end text-[16px] leading-none">
        <a href="mailto:f@schutzgebiet.at">CONTACT→</a>
      </div>
    </div>
  );
}

function DesktopCatalogueColumn({ palette, theme, activeMedia, onOpenMedia }) {
  return (
    <div
      id="catalogue"
      className="flex h-[calc(100vh-40px)] w-[25vw] min-w-[320px] flex-col"
      style={{ color: palette.text }}
    >
      <CatalogueContent
        desktop
        palette={palette}
        theme={theme}
        activeMedia={activeMedia}
        onOpenMedia={onOpenMedia}
      />
    </div>
  );
}

function DesktopMediaColumn({
  palette,
  theme,
  activeMedia,
  onClose,
  mediaRef,
}) {
  return (
    <div
      ref={mediaRef}
      className="flex h-[calc(100vh-40px)] w-[calc(25vw-30px)] min-w-[290px] flex-col"
    >
      <MediaPanel
        palette={palette}
        theme={theme}
        activeMedia={activeMedia}
        onClose={onClose}
        mobile={false}
      />
    </div>
  );
}

function MobileHomePage({ palette, theme, onThemeToggle, onCatalogueClick }) {
  return (
    <div
      className="flex min-h-[calc(100vh-40px)] flex-col justify-between"
      style={{ color: palette.text }}
    >
      <div className="flex items-start justify-between">
        <img
          src={logoLarge}
          alt="Schutzgebiet"
          className="h-auto w-[112px]"
          draggable="false"
        />
        <ThemeButton theme={theme} onClick={onThemeToggle} />
      </div>

      <div className="whitespace-pre-line text-[16px] leading-[1.35]">
        {HOME_INFO}
      </div>

      <nav className="flex flex-col items-end gap-3 text-[24px] leading-none">
        <a href="#catalogue" onClick={onCatalogueClick} style={{ color: palette.external }}>
          CATALOGUE→
        </a>
        <span
          className="line-through no-underline"
          style={{ color: palette.external, textDecorationLine: "line-through" }}
        >
          SPOTIFY→
        </span>
        <a
          href="https://schutzgebiet.bandcamp.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.external }}
        >
          BANDCAMP→
        </a>
        <a
          href="https://www.ninaprotocol.com/profiles/schutzgebiet/"
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.external }}
        >
          NINA PROTOCOL→
        </a>
        <a
          href="https://www.soundcloud.com/schutzgebiet/"
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.external }}
        >
          SOUNDCLOUD→
        </a>
      </nav>

      <div className="flex items-end justify-between text-[16px] leading-none">
        <a href="mailto:f@schutzgebiet.at">CONTACT→</a>
        <a href="#legal">LEGAL→</a>
      </div>
    </div>
  );
}

function MobileCataloguePage({
  palette,
  theme,
  onThemeToggle,
  onLogoClick,
  activeMedia,
  onOpenMedia,
}) {
  return (
    <div
      className="flex min-h-[calc(100vh-40px)] flex-col"
      style={{ color: palette.text }}
    >
      <div className="flex items-start justify-between">
        <a href="#home" onClick={onLogoClick} className="w-fit">
          <img
            src={logoSmall}
            alt="Schutzgebiet"
            className="h-auto w-[75px]"
            draggable="false"
          />
        </a>

        <ThemeButton theme={theme} onClick={onThemeToggle} />
      </div>

      <div className="mt-8">
        <h1 className="text-[24px] leading-none">CATALOGUE</h1>
      </div>

      <div className="mt-14">
        <CatalogueContent
          mobile
          palette={palette}
          theme={theme}
          activeMedia={activeMedia}
          onOpenMedia={onOpenMedia}
        />
      </div>
    </div>
  );
}

function MobileMediaOverlay({
  palette,
  theme,
  activeMedia,
  onClose,
  isVisible,
}) {
  return (
    <div
      className="fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
      style={{
        backgroundColor: palette.overlayBackground,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="h-full w-full p-5">
        <MediaPanel
          palette={palette}
          theme={theme}
          activeMedia={activeMedia}
          onClose={onClose}
          mobile
        />
      </div>
    </div>
  );
}

function CatalogueContent({
  mobile = false,
  desktop = false,
  palette,
  theme,
  activeMedia,
  onOpenMedia,
}) {
  const headingClass = "text-[24px] leading-none";
  const listClass = mobile
    ? "mt-3 space-y-1 text-[14px] leading-[1.35]"
    : "mt-3 space-y-1 text-[16px] leading-[1.35]";

  if (desktop) {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="pt-1 text-[24px] leading-none">CATALOGUE</div>

        <section>
          <h2 className={headingClass}>RELEASES</h2>
          <div className={listClass}>
            {RELEASES.map((item) => (
              <CatalogueItem
                key={item.id}
                item={item}
                palette={palette}
                activeMedia={activeMedia}
                onOpenMedia={onOpenMedia}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className={headingClass}>MIXES</h2>
          <div className={listClass}>
            {MIXES.map((item) => (
              <CatalogueStackedItem
                key={item.id}
                item={item}
                palette={palette}
                activeMedia={activeMedia}
                onOpenMedia={onOpenMedia}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className={headingClass}>PRESENTED WORKS</h2>
          <div className={listClass}>
            {PRESENTED_WORKS.map((item) => (
              <CatalogueItem
                key={item.id}
                item={item}
                palette={palette}
                activeMedia={activeMedia}
                onOpenMedia={onOpenMedia}
              />
            ))}
          </div>
        </section>

        <div className="text-[16px] leading-none">
          <a href="#legal">LEGAL→</a>
        </div>
      </div>
    );
  }

  const blockClass = mobile ? "space-y-12" : "space-y-10";

  return (
    <div className={blockClass}>
      <section>
        <h2 className={headingClass}>RELEASES</h2>
        <div className={listClass}>
          {RELEASES.map((item) => (
            <CatalogueItem
              key={item.id}
              item={item}
              palette={palette}
              activeMedia={activeMedia}
              onOpenMedia={onOpenMedia}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className={headingClass}>MIXES</h2>
        <div className={listClass}>
          {MIXES.map((item) => (
            <CatalogueStackedItem
              key={item.id}
              item={item}
              palette={palette}
              activeMedia={activeMedia}
              onOpenMedia={onOpenMedia}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className={headingClass}>PRESENTED WORKS</h2>
        <div className={listClass}>
          {PRESENTED_WORKS.map((item) => (
            <CatalogueItem
              key={item.id}
              item={item}
              palette={palette}
              activeMedia={activeMedia}
              onOpenMedia={onOpenMedia}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CatalogueItem({ item, palette, activeMedia, onOpenMedia }) {
  const isActive = activeMedia?.id === item.id;
  const isEmbedded = Boolean(item.embedUrl);

  if (isEmbedded) {
    return (
      <button
        type="button"
        onClick={() => onOpenMedia(item)}
        className="block w-full text-left leading-[1.25] transition-colors duration-300 ease-out"
        style={{
          backgroundColor: isActive
            ? palette.selectionBackground
            : "transparent",

          color: isActive
            ? palette.selectionText
            : "inherit",

          transition: "background-color 300ms ease-out, color 300ms ease-out",

          marginLeft: isActive ? "-3px" : "0px",
          paddingLeft: isActive ? "3px" : "0px",

          width: isActive ? "calc(100% + 3px)" : "100%",
          paddingRight: isActive ? "3px" : "0px",
        }}
      >
        <div>{item.label}</div>
        <div className="underline hover:no-underline">{item.text}</div>
      </button>
    );
  }

  const isPlaceholder = item.href === "#";

  return (
    <div className="leading-[1.25]">
      <div>{item.label}</div>

      {isPlaceholder ? (
        <div>{item.text}</div>
      ) : (
        <a href={item.href} target="_blank" rel="noreferrer">
          {item.text}
        </a>
      )}
    </div>
  );
}

function CatalogueStackedItem({ item, palette, activeMedia, onOpenMedia }) {
  const isActive = activeMedia?.id === item.id;
  const isEmbedded = Boolean(item.embedUrl);

  if (isEmbedded) {
    return (
      <button
        type="button"
        onClick={() => onOpenMedia(item)}
        className="block w-full text-left leading-[1.25] transition-colors duration-300 ease-out"
        style={{
          backgroundColor: isActive ? palette.selectionBackground : "transparent",
          color: isActive ? palette.selectionText : "inherit",
          transition: "background-color 300ms ease-out, color 300ms ease-out",
          marginLeft: isActive ? "-3px" : "0px",
          paddingLeft: isActive ? "3px" : "0px",

          width: isActive ? "calc(100% + 3px)" : "100%",
          paddingRight: isActive ? "3px" : "0px",
        }}
      >
        <div className="underline hover:no-underline">{item.label}</div>
        <div>{item.text}</div>
      </button>
    );
  }

  const isPlaceholder = item.href === "#";

  return (
    <div className="leading-[1.25]">
      {isPlaceholder ? (
        <div>{item.label}</div>
      ) : (
        <a href={item.href} target="_blank" rel="noreferrer">
          {item.label}
        </a>
      )}

      <div>{item.text}</div>
    </div>
  );
}

function MediaPanel({ palette, theme, activeMedia, onClose, mobile = false }) {
  const embedUrl = getEmbedUrl(activeMedia, theme);
  const openLabel =
    activeMedia.platform === "bandcamp" ? "OPEN IN BANDCAMP" : "OPEN IN SOUNDCLOUD";

  const actionTextClass = mobile ? "text-[16px] leading-none" : "text-[16px] leading-none";

  return (
    <div
      className="flex h-full flex-col border"
      style={{
        borderColor: palette.selectionBackground,
        backgroundColor: palette.selectionBackground,
      }}
    >
      <div className="min-h-0 flex-1 border-b" style={{ borderColor: palette.selectionBackground }}>
        <iframe
          title={activeMedia.text}
          src={embedUrl}
          className="h-full w-full"
          style={{
            border: 0,
            display: "block",
            backgroundColor: palette.selectionBackground,
          }}
          allow="autoplay"
          scrolling="no"
        />
      </div>

      <div
        className={`flex items-end justify-between px-5 py-2 ${actionTextClass}`}
        style={{ color: palette.selectionText }}
      >
        <a
          href={activeMedia.href}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer hover:no-underline"
          style={{ cursor: "pointer" }}
        >
          {openLabel}
        </a>
        <button
          type="button"
          onClick={onClose}
          className="bg-transparent p-0 underline hover:no-underline cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

function ThemeButton({ theme, onClick }) {
  const icon = theme === "bright" ? buttonBrightToDark : buttonDarkToBright;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle bright and dark mode"
      className="cursor-pointer border-0 bg-transparent p-0"
    >
      <img
        src={icon}
        alt=""
        className="h-[24px] w-[24px]"
        draggable="false"
      />
    </button>
  );
}

function getEmbedUrl(item, theme) {
  if (!item?.embedUrl) return "";
  if (typeof item.embedUrl === "string") return item.embedUrl;
  return item.embedUrl[theme] || item.embedUrl.dark || item.embedUrl.bright || "";
}

export default App;