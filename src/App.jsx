import { useEffect, useMemo, useState } from "react";
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
  { label: "SG001:", text: "DUUN - S/T (2026)", href: "https://schutzgebiet.bandcamp.com/album/s-t-2026" },
  { label: "SG00X:", text: "v7c - Horizon’s Blue Wing (2026)", href: "#" },
  { label: "SG00X:", text: "F.M. Deutsch - duun-2 pres. KABALAH (2026)", href: "#" },
  { label: "SG00X:", text: "Ora Et Labora - Covercompilation (2026)", href: "#" },
  { label: "SG00X:", text: "Tria - LP (2026)", href: "#" },
];

const MIXES = [
  { label: "SCHUTZ MIX 001:", text: "Studio am Stacheldraht", href: "https://soundcloud.com/schutzgebiet/schutz-mix-1-studio-am-stacheldraht" },
  { label: "SCHUTZ MIX 002:", text: "Hitparade", href: "https://soundcloud.com/schutzgebiet/schutz-mix-002" },
  { label: "SCHUTZ MIX 003:", text: "Ghosted by the USA", href: "https://soundcloud.com/schutzgebiet/schutz-mix-003" },
  { label: "SCHUTZ MIX 004:", text: "Lend a Hand and Lift Me", href: "https://soundcloud.com/schutzgebiet/schutz-mix-004" },
];

const PRESENTED_WORKS = [
  { label: "☆7571 -", text: "Demos 4 You (2026)", href: "#" },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [mobilePage, setMobilePage] = useState("home");

  const isBright = theme === "bright";

  const palette = useMemo(
    () => ({
      background: isBright ? "#EBF1F4" : "#061A44",
      text: isBright ? "#061A44" : "#EBF1F4",
      external: "#D30202",
    }),
    [isBright]
  );

  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", palette.background);
    }
  }, [palette.background]);

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
    }
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
        <div className="hidden min-h-[calc(100vh-40px)] justify-center gap-5 md:flex">
          <DesktopHomeColumn
            palette={palette}
            theme={theme}
            onThemeToggle={handleThemeToggle}
          />
          <DesktopCatalogueColumn palette={palette} />
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
              onLogoClick={handleLogoClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopHomeColumn({ palette, theme, onThemeToggle }) {
  return (
    <div
      className="flex min-h-[calc(100vh-40px)] w-[25vw] min-w-[320px] flex-col justify-between"
      style={{ color: palette.text }}
    >
      <div className="flex items-start justify-between">
        <ThemeButton theme={theme} onClick={onThemeToggle} />
        <img
          src={logoLarge}
          alt="Schutzgebiet"
          className="h-auto w-[150px]"
          draggable="false"
        />
      </div>

      <div className="whitespace-pre-line text-right text-[20px] leading-[1.2]">
        {HOME_INFO}
      </div>

      <nav className="flex flex-col items-end gap-2 text-[24px] leading-none">
        <span
          className="line-through no-underline"
          style={{ color: palette.external, textDecorationLine: "line-through" }}
        >
          SPOTIFY→
        </span>
        <a href="https://schutzgebiet.bandcamp.com/" target="_blank" rel="noreferrer" style={{ color: palette.external }}>
          BANDCAMP→
        </a>
        <a href="https://www.ninaprotocol.com/profiles/schutzgebiet/" target="_blank" rel="noreferrer" style={{ color: palette.external }}>
          NINA PROTOCOL→
        </a>
        <a href="https://www.soundcloud.com/schutzgebiet/" target="_blank" rel="noreferrer" style={{ color: palette.external }}>
          SOUNDCLOUD→
        </a>
      </nav>

      <div className="flex justify-end text-[24px] leading-none">
        <a href="mailto:f@schutzgebiet.at">CONTACT→</a>
      </div>
    </div>
  );
}

function DesktopCatalogueColumn({ palette }) {
  return (
    <div
      id="catalogue"
      className="flex h-[calc(100vh-40px)] w-[25vw] min-w-[320px] flex-col"
      style={{ color: palette.text }}
    >
      <CatalogueContent desktop />
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

      <div className="whitespace-pre-line text-[20px] leading-[1.3]">
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
        <a href="https://schutzgebiet.bandcamp.com/" target="_blank" rel="noreferrer" style={{ color: palette.external }}>
          BANDCAMP→
        </a>
        <a href="https://www.ninaprotocol.com/profiles/schutzgebiet/" target="_blank" rel="noreferrer" style={{ color: palette.external }}>
          NINA PROTOCOL→
        </a>
        <a href="https://www.soundcloud.com/schutzgebiet/" target="_blank" rel="noreferrer" style={{ color: palette.external }}>
          SOUNDCLOUD→
        </a>
      </nav>

      <div className="flex items-end justify-between text-[24px] leading-none">
        <a href="mailto:f@schutzgebiet.at">CONTACT→</a>
        <a href="#legal">LEGAL→</a>
      </div>
    </div>
  );
}

function MobileCataloguePage({ palette, onLogoClick }) {
  return (
    <div
      className="flex min-h-[calc(100vh-40px)] flex-col"
      style={{ color: palette.text }}
    >
      <a href="#home" onClick={onLogoClick} className="w-fit">
        <img
          src={logoSmall}
          alt="Schutzgebiet"
          className="h-auto w-[75px]"
          draggable="false"
        />
      </a>

      <div className="mt-8">
        <h1 className="text-[24px] leading-none">CATALOGUE</h1>
      </div>

      <div className="mt-14">
        <CatalogueContent mobile />
      </div>
    </div>
  );
}

function CatalogueContent({ mobile = false, desktop = false }) {
  const headingClass = "text-[24px] leading-none";
  const listClass = "mt-3 space-y-1 text-[16px] leading-[1.35]";

  if (desktop) {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="pt-1 text-[24px] leading-none">CATALOGUE</div>

        <section>
          <h2 className={headingClass}>RELEASES</h2>
          <div className={listClass}>
            {RELEASES.map((item) => (
              <CatalogueItem
                key={item.label + item.text}
                label={item.label}
                text={item.text}
                href={item.href}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className={headingClass}>MIXES</h2>
          <div className={listClass}>
            {MIXES.map((item) => (
              <CatalogueStackedItem
                key={item.label + item.text}
                label={item.label}
                text={item.text}
                href={item.href}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className={headingClass}>PRESENTED WORKS</h2>
          <div className={listClass}>
            {PRESENTED_WORKS.map((item) => (
              <CatalogueItem
                key={item.label + item.text}
                label={item.label}
                text={item.text}
                href={item.href}
              />
            ))}
          </div>
        </section>

        <div className="text-[24px] leading-none">
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
              key={item.label + item.text}
              label={item.label}
              text={item.text}
              href={item.href}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className={headingClass}>MIXES</h2>
        <div className={listClass}>
          {MIXES.map((item) => (
            <CatalogueStackedItem
              key={item.label + item.text}
              label={item.label}
              text={item.text}
              href={item.href}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className={headingClass}>PRESENTED WORKS</h2>
        <div className={listClass}>
          {PRESENTED_WORKS.map((item) => (
            <CatalogueItem
              key={item.label + item.text}
              label={item.label}
              text={item.text}
              href={item.href}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CatalogueItem({ label, text, href }) {
  return (
    <div className="leading-[1.25]">
      <div>{label}</div>
      <a href={href} target="_blank" rel="noreferrer">
        {text}
      </a>
    </div>
  );
}

function CatalogueStackedItem({ label, text, href }) {
  return (
    <div className="leading-[1.25]">
      <a href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
      <div>{text}</div>
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

export default App;