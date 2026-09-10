const { useComposition, animate, Easing, clamp } = window;

const INK = '#16181C';
const SUN = '#D9A21B';
const HORIZON_Y = 720;
const W = 1920, H = 1080;
const R = 236;

const MOTION = {
  rise: (o) => animate({ ...o, ease: Easing.easeOutCubic }),
  reveal: (o) => animate({ ...o, ease: Easing.easeOutQuart }),
  exit: (o) => animate({ ...o, ease: Easing.easeInQuart }),
};

const WORD = 'SUN INDUSTRIES';

const LOUVRES = (() => {
  const rows = [];
  let y = 0, i = 0;
  while (y < R * 2) {
    const t = y / (R * 2);
    const h = 3 + 15 * (1 - t) * (1 - t);
    rows.push({ y, h, i });
    y += h + 2 + 20 * t * t;
    i += 1;
  }
  return rows;
})();

const GLARE_PERIOD = 1.6;

function Wordmark({ T, CUES, total }) {
  const letters = WORD.split('');
  const inStart = CUES.Wordmark - 0.35;
  const outStart = CUES.Complete - 0.12;
  const glareOn = clamp(
    MOTION.rise({ from: 0, to: 1, start: CUES.Loading - 0.5, end: CUES.Loading + 0.2 })(T)
    + MOTION.exit({ from: 0, to: -1, start: CUES.Complete - 0.25, end: CUES.Complete + 0.1 })(T), 0, 1);
  const phase = ((T - CUES.Loading + GLARE_PERIOD) % GLARE_PERIOD) / GLARE_PERIOD;
  const head = -0.25 + 1.5 * phase;
  const n = letters.length;

  return (
    <div style={{
      position: 'absolute', left: 0, top: HORIZON_Y - 248, width: W,
      display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
      fontFamily: 'Archivo, Helvetica, sans-serif', fontWeight: 500,
      fontSize: 94, lineHeight: 1, color: INK,
    }}>
      {letters.map((ch, i) => {
        if (ch === ' ') return <div key={i} style={{ width: 52 }} />;
        const s = inStart + i * 0.065;
        const yIn = MOTION.reveal({ from: 122, to: 0, start: s, end: s + 0.8 })(T);
        const e = outStart + i * 0.02;
        const yOut = MOTION.exit({ from: 0, to: -128, start: e, end: e + 0.4 })(T);
        const d = (i / (n - 1) - head) / 0.12;
        const glare = glareOn * Math.exp(-d * d);
        const settle = MOTION.reveal({ from: 1.05, to: 1, start: s, end: s + 0.9 })(T);
        return (
          <div key={i} style={{ overflow: 'hidden', height: 148, display: 'flex', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              transform: `translateY(${yIn + yOut}%) scale(${settle})`,
              letterSpacing: '0.3em', paddingLeft: '0.3em',
              backgroundImage: 'linear-gradient(178deg, #0C0E12 0%, #2C313A 46%, #14161A 74%, #05060A 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              {ch}
              <div style={{
                position: 'absolute', left: 0, top: 0, letterSpacing: '0.3em', paddingLeft: '0.3em',
                backgroundImage: 'linear-gradient(104deg, #B9821A 0%, #E8B93F 34%, #FBF0C6 50%, #E8B93F 66%, #B9821A 100%)',
                backgroundSize: '260% 100%',
                backgroundPosition: `${(1 - phase) * 100}% 50%`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                opacity: glare,
              }}>{ch}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Sun({ T, CUES, total }) {
  const y = MOTION.rise({ from: HORIZON_Y + 300, to: HORIZON_Y - 132, start: CUES.Sunrise, end: CUES.Loading - 0.2 })(T)
    + MOTION.exit({ from: 0, to: 432, start: CUES.Complete, end: total - 0.08 })(T);
  const n = LOUVRES.length;
  const ringOpacity = 0.24 * clamp(
    MOTION.rise({ from: 0, to: 1, start: CUES.Sunrise + 0.6, end: CUES.Wordmark })(T)
    + MOTION.exit({ from: 0, to: -1, start: CUES.Complete, end: CUES.Complete + 0.5 })(T), 0, 1);

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: HORIZON_Y, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: W / 2 - R, top: y - R, width: R * 2, height: R * 2,
        borderRadius: '50%', overflow: 'hidden',
      }}>
        {LOUVRES.map((row) => {
          const d = (n - 1 - row.i) * 0.045;
          const sx = MOTION.reveal({ from: 0, to: 1, start: CUES.Sunrise + 0.25 + d, end: CUES.Sunrise + 1.05 + d })(T)
            + MOTION.exit({ from: 0, to: -1, start: CUES.Complete - 0.05 + row.i * 0.008, end: CUES.Complete + 0.4 + row.i * 0.008 })(T);
          return (
            <div key={row.i} style={{
              position: 'absolute', left: 0, top: row.y, width: '100%', height: row.h,
              background: SUN, transform: `scaleX(${clamp(sx, 0, 1)})`, transformOrigin: '50% 50%',
            }} />
          );
        })}
      </div>
      <div style={{
        position: 'absolute', left: W / 2 - R - 34, top: y - R - 34, width: (R + 34) * 2, height: (R + 34) * 2,
        borderRadius: '50%', border: `1px solid ${INK}`, opacity: ringOpacity,
      }} />
    </div>
  );
}

function Horizon({ T, CUES, total }) {
  const w = MOTION.reveal({ from: 0, to: 1, start: 0.1, end: CUES.Sunrise + 0.5 })(T)
    + MOTION.exit({ from: 0, to: -1, start: total - 0.7, end: total - 0.08 })(T);
  const tipOpacity = clamp(
    MOTION.rise({ from: 0, to: 1, start: 0.08, end: 0.3 })(T)
    + MOTION.exit({ from: 0, to: -1, start: CUES.Sunrise + 0.2, end: CUES.Sunrise + 0.75 })(T), 0, 1);
  const pulse = 0.55 + 0.45 * Math.sin((T - 0.2) * 4.2);
  const dawn = clamp(
    MOTION.rise({ from: 0, to: 0.85, start: 0.25, end: CUES.Sunrise })(T)
    + MOTION.exit({ from: 0, to: -0.85, start: CUES.Sunrise + 0.35, end: CUES.Sunrise + 1.1 })(T), 0, 1) * pulse;
  return (
    <React.Fragment>
      <div style={{
        position: 'absolute', left: 200, top: HORIZON_Y, width: W - 400, height: 3,
        background: INK, transform: `scaleX(${clamp(w, 0, 1)})`, transformOrigin: '50% 50%',
      }} />
      <div style={{
        position: 'absolute', left: 200, top: HORIZON_Y + 46, width: W - 400, height: 1,
        background: INK, opacity: 0.18,
        transform: `scaleX(${clamp(w * 0.86, 0, 1)})`, transformOrigin: '50% 50%',
      }} />
      {[-1, 1].map((dir) => (
        <div key={dir} style={{
          position: 'absolute', left: W / 2 - 1, top: HORIZON_Y - 26, width: 2, height: 52,
          background: SUN, opacity: tipOpacity,
          transform: `translateX(${dir * clamp(w, 0, 1) * (W / 2 - 200)}px)`,
        }} />
      ))}
      <div style={{
        position: 'absolute', left: W / 2 - 300, top: HORIZON_Y - 4, width: 600, height: 5,
        background: `linear-gradient(90deg, transparent, ${SUN}, transparent)`,
        opacity: dawn, filter: 'blur(3px)',
      }} />
    </React.Fragment>
  );
}

function Status({ T, CUES, total }) {
  const o = clamp(
    MOTION.reveal({ from: 0, to: 1, start: CUES.Loading - 0.7, end: CUES.Loading })(T)
    + MOTION.exit({ from: 0, to: -1, start: CUES.Complete - 0.3, end: CUES.Complete + 0.1 })(T), 0, 1);
  const dots = 1 + (Math.floor(T * 2.4) % 3);
  const tick = ((T - CUES.Loading + GLARE_PERIOD) % GLARE_PERIOD) / GLARE_PERIOD;
  return (
    <React.Fragment>
      <div style={{
        position: 'absolute', left: 200, top: HORIZON_Y + 96, opacity: o,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 22,
        letterSpacing: '0.42em', color: INK,
      }}>{'LOADING' + '.'.repeat(dots)}</div>
      <div style={{
        position: 'absolute', left: 200, top: HORIZON_Y + 138, width: W - 400, height: 2,
        background: INK, opacity: 0.12 * o,
      }} />
      <div style={{
        position: 'absolute', left: 200, top: HORIZON_Y + 138, width: 240, height: 2,
        background: SUN, opacity: o,
        transform: `translateX(${tick * (W - 400 - 240)}px)`,
      }} />
    </React.Fragment>
  );
}

function SunPiece() {
  const { T, CUES, authoredTotal } = useComposition();
  const total = authoredTotal || 8;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F4F2ED', overflow: 'hidden' }}>
      <Sun T={T} CUES={CUES} total={total} />
      <Wordmark T={T} CUES={CUES} total={total} />
      <Horizon T={T} CUES={CUES} total={total} />
      <Status T={T} CUES={CUES} total={total} />
    </div>
  );
}

window.SunPiece = SunPiece;
