"use client";

import { motion } from "framer-motion";

export default function ContourBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aged paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Primary grid lines */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Secondary grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-accent-alt) 0.5px, transparent 0.5px),
            linear-gradient(90deg, var(--color-accent-alt) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '25px 25px',
        }}
      />

      {/* Main SVG with all cartographic elements */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ============ COMPASS ROSE ============ */}
        <motion.g
          animate={{ rotate: [0, 3, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "1050px 150px" }}
        >
          <g transform="translate(1050, 150)">
            {/* Outer ring */}
            <circle r="60" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.4" fill="none" />
            <circle r="50" stroke="var(--color-accent-alt)" strokeWidth="1" opacity="0.3" fill="none" />
            <circle r="40" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.25" fill="none" strokeDasharray="4 2" />

            {/* Cardinal directions */}
            <g stroke="var(--color-accent)" strokeWidth="2" opacity="0.5">
              <line x1="0" y1="-55" x2="0" y2="-35" />
              <line x1="0" y1="35" x2="0" y2="55" />
              <line x1="-55" y1="0" x2="-35" y2="0" />
              <line x1="35" y1="0" x2="55" y2="0" />
            </g>

            {/* Intercardinal directions */}
            <g stroke="var(--color-accent-alt)" strokeWidth="1" opacity="0.4">
              <line x1="-38" y1="-38" x2="-25" y2="-25" />
              <line x1="38" y1="-38" x2="25" y2="-25" />
              <line x1="-38" y1="38" x2="-25" y2="25" />
              <line x1="38" y1="38" x2="25" y2="25" />
            </g>

            {/* North arrow */}
            <polygon points="0,-45 -8,-20 0,-28 8,-20" fill="var(--color-accent)" opacity="0.5" />

            {/* Direction labels */}
            <text x="0" y="-65" textAnchor="middle" fill="var(--color-accent)" fontSize="12" fontFamily="monospace" opacity="0.6">N</text>
            <text x="0" y="75" textAnchor="middle" fill="var(--color-accent)" fontSize="10" fontFamily="monospace" opacity="0.4">S</text>
            <text x="-68" y="4" textAnchor="middle" fill="var(--color-accent)" fontSize="10" fontFamily="monospace" opacity="0.4">W</text>
            <text x="68" y="4" textAnchor="middle" fill="var(--color-accent)" fontSize="10" fontFamily="monospace" opacity="0.4">E</text>
          </g>
        </motion.g>

        {/* ============ RIVER SYSTEM ============ */}
        <motion.g
          animate={{
            translateY: [0, 8, 0],
            translateX: [0, -5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main river */}
          <path
            d="M-50 200 Q 100 180, 200 220 Q 350 280, 450 250 Q 600 200, 750 240 Q 900 290, 1000 260 Q 1100 230, 1250 270"
            stroke="var(--color-accent-alt)"
            strokeWidth="4"
            opacity="0.25"
            fill="none"
          />
          {/* River banks */}
          <path
            d="M-50 195 Q 100 175, 200 215 Q 350 275, 450 245 Q 600 195, 750 235 Q 900 285, 1000 255 Q 1100 225, 1250 265"
            stroke="var(--color-accent-alt)"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.2"
            fill="none"
          />
          <path
            d="M-50 205 Q 100 185, 200 225 Q 350 285, 450 255 Q 600 205, 750 245 Q 900 295, 1000 265 Q 1100 235, 1250 275"
            stroke="var(--color-accent-alt)"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.2"
            fill="none"
          />

          {/* Tributary */}
          <path
            d="M300 50 Q 320 100, 350 150 Q 380 200, 400 240"
            stroke="var(--color-accent-alt)"
            strokeWidth="2"
            opacity="0.2"
            fill="none"
          />

          {/* River label */}
          <text x="600" y="215" fill="var(--color-accent-alt)" fontSize="10" fontFamily="serif" fontStyle="italic" opacity="0.35" transform="rotate(-5, 600, 215)">Ganga River</text>
        </motion.g>

        {/* ============ MAJOR CONTOUR LINES (Index contours - every 100m) ============ */}
        <motion.g
          animate={{
            translateY: [0, -35, 0],
            translateX: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M-100 350 Q 100 280, 350 320 T 700 280 T 1050 340 T 1300 300"
            stroke="var(--color-accent)"
            strokeWidth="3"
            opacity="0.45"
          />
          <path
            d="M-100 450 Q 150 380, 400 420 T 750 380 T 1100 440 T 1300 400"
            stroke="var(--color-accent)"
            strokeWidth="3"
            opacity="0.4"
          />
          <path
            d="M-100 550 Q 200 480, 450 520 T 800 480 T 1150 540 T 1300 500"
            stroke="var(--color-accent)"
            strokeWidth="3"
            opacity="0.35"
          />
        </motion.g>

        {/* ============ INTERMEDIATE CONTOURS ============ */}
        <motion.g
          animate={{
            translateY: [0, 30, 0],
            translateX: [0, -25, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <path d="M-50 320 Q 120 260, 380 300 T 720 260 T 1080 320 T 1250 280" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="10 5" opacity="0.35" />
          <path d="M-50 380 Q 140 320, 400 360 T 740 320 T 1100 380 T 1250 340" stroke="var(--color-moss)" strokeWidth="1.5" opacity="0.3" />
          <path d="M-50 420 Q 160 360, 420 400 T 760 360 T 1120 420 T 1250 380" stroke="var(--color-accent-alt)" strokeWidth="1" strokeDasharray="6 3" opacity="0.3" />
          <path d="M-50 480 Q 180 420, 440 460 T 780 420 T 1140 480 T 1250 440" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.3" />
          <path d="M-50 520 Q 200 460, 460 500 T 800 460 T 1160 520 T 1250 480" stroke="var(--color-moss)" strokeWidth="1" strokeDasharray="8 4" opacity="0.25" />
        </motion.g>

        {/* ============ HACHURE LINES (Slope indicators) ============ */}
        <motion.g
          animate={{ opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Steep slope area 1 */}
          <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.35">
            <line x1="180" y1="380" x2="175" y2="400" />
            <line x1="190" y1="378" x2="185" y2="398" />
            <line x1="200" y1="375" x2="195" y2="395" />
            <line x1="210" y1="373" x2="205" y2="393" />
            <line x1="220" y1="372" x2="215" y2="392" />
            <line x1="230" y1="374" x2="225" y2="394" />
            <line x1="240" y1="377" x2="235" y2="397" />
          </g>

          {/* Steep slope area 2 */}
          <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.3">
            <line x1="850" y1="420" x2="845" y2="445" />
            <line x1="860" y1="418" x2="855" y2="443" />
            <line x1="870" y1="415" x2="865" y2="440" />
            <line x1="880" y1="414" x2="875" y2="439" />
            <line x1="890" y1="416" x2="885" y2="441" />
            <line x1="900" y1="419" x2="895" y2="444" />
          </g>

          {/* Depression hachures */}
          <g stroke="var(--color-moss)" strokeWidth="1" opacity="0.3">
            <line x1="520" y1="580" x2="525" y2="560" />
            <line x1="530" y1="582" x2="535" y2="562" />
            <line x1="540" y1="583" x2="545" y2="563" />
            <line x1="550" y1="582" x2="555" y2="562" />
            <line x1="560" y1="580" x2="565" y2="560" />
          </g>
        </motion.g>

        {/* ============ ELEVATION RINGS ============ */}
        <motion.g
          animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "600px 420px" }}
        >
          <ellipse cx="600" cy="420" rx="120" ry="60" stroke="var(--color-accent)" strokeWidth="2.5" opacity="0.4" />
          <ellipse cx="600" cy="420" rx="200" ry="100" stroke="var(--color-accent-alt)" strokeWidth="2" strokeDasharray="12 6" opacity="0.35" />
          <ellipse cx="600" cy="420" rx="280" ry="140" stroke="var(--color-moss)" strokeWidth="1.5" opacity="0.3" />
          <ellipse cx="600" cy="420" rx="360" ry="180" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="8 4" opacity="0.25" />
        </motion.g>

        {/* Secondary peak */}
        <motion.g
          animate={{ scale: [1, 1.04, 1], rotate: [0, -3, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformOrigin: "200px 600px" }}
        >
          <ellipse cx="200" cy="600" rx="80" ry="40" stroke="var(--color-accent)" strokeWidth="2" opacity="0.35" />
          <ellipse cx="200" cy="600" rx="140" ry="70" stroke="var(--color-accent-alt)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.3" />
          <ellipse cx="200" cy="600" rx="200" ry="100" stroke="var(--color-moss)" strokeWidth="1" opacity="0.25" />
        </motion.g>

        {/* ============ SPOT ELEVATIONS (Triangular markers) ============ */}
        <motion.g
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Peak markers with triangles */}
          <g fill="var(--color-accent)" opacity="0.5">
            <polygon points="600,400 595,410 605,410" />
            <text x="610" y="405" fontSize="9" fontFamily="monospace">▲ 847m</text>
          </g>
          <g fill="var(--color-accent-alt)" opacity="0.45">
            <polygon points="200,585 195,595 205,595" />
            <text x="210" y="590" fontSize="8" fontFamily="monospace">▲ 623m</text>
          </g>
          <g fill="var(--color-moss)" opacity="0.4">
            <polygon points="900,320 895,330 905,330" />
            <text x="910" y="325" fontSize="8" fontFamily="monospace">▲ 412m</text>
          </g>

          {/* Spot heights */}
          <g fill="var(--color-accent)" fontSize="7" fontFamily="monospace" opacity="0.4">
            <circle cx="350" cy="450" r="2" />
            <text x="355" y="453">· 298</text>
            <circle cx="750" cy="380" r="2" />
            <text x="755" y="383">· 356</text>
            <circle cx="450" cy="550" r="2" />
            <text x="455" y="553">· 187</text>
          </g>
        </motion.g>

        {/* ============ SCALE BAR ============ */}
        <g transform="translate(80, 720)">
          <rect x="0" y="0" width="150" height="8" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" />
          <rect x="0" y="0" width="30" height="8" fill="var(--color-accent)" opacity="0.3" />
          <rect x="60" y="0" width="30" height="8" fill="var(--color-accent)" opacity="0.3" />
          <rect x="120" y="0" width="30" height="8" fill="var(--color-accent)" opacity="0.3" />
          <text x="0" y="20" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.5">0</text>
          <text x="73" y="20" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.5">5km</text>
          <text x="140" y="20" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.5">10km</text>
          <text x="50" y="-5" fill="var(--color-accent)" fontSize="7" fontFamily="monospace" opacity="0.4">SCALE 1:50,000</text>
        </g>

        {/* ============ MAP LEGEND ============ */}
        <g transform="translate(80, 80)">
          <text x="0" y="0" fill="var(--color-accent)" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.5">LEGEND</text>

          {/* Index contour */}
          <line x1="0" y1="20" x2="40" y2="20" stroke="var(--color-accent)" strokeWidth="2.5" opacity="0.4" />
          <text x="50" y="23" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.4">Index contour</text>

          {/* Intermediate contour */}
          <line x1="0" y1="35" x2="40" y2="35" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="6 3" opacity="0.35" />
          <text x="50" y="38" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.4">Contour line</text>

          {/* River */}
          <line x1="0" y1="50" x2="40" y2="50" stroke="var(--color-accent-alt)" strokeWidth="3" opacity="0.3" />
          <text x="50" y="53" fill="var(--color-accent-alt)" fontSize="8" fontFamily="monospace" opacity="0.4">Waterway</text>

          {/* Spot elevation */}
          <polygon points="10,62 5,72 15,72" fill="var(--color-accent)" opacity="0.4" />
          <text x="50" y="70" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.4">Spot elevation</text>
        </g>

        {/* ============ COORDINATE LABELS ============ */}
        <motion.g
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Latitude/Longitude markers */}
          <text x="50" y="35" fill="var(--color-accent)" fontSize="11" fontFamily="monospace" opacity="0.5">25°28'N</text>
          <text x="1100" y="35" fill="var(--color-accent)" fontSize="11" fontFamily="monospace" opacity="0.5">81°52'E</text>

          {/* Grid zone */}
          <text x="1050" y="780" fill="var(--color-accent-alt)" fontSize="9" fontFamily="monospace" opacity="0.4">UTM Zone 44R</text>

          {/* Survey info */}
          <text x="50" y="780" fill="var(--color-accent)" fontSize="8" fontFamily="monospace" opacity="0.35">Survey of India · Sheet 63K/12</text>

          {/* Tick marks along edges */}
          <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.3">
            {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((x) => (
              <g key={`tick-${x}`}>
                <line x1={x} y1="0" x2={x} y2="8" />
                <line x1={x} y1="792" x2={x} y2="800" />
              </g>
            ))}
            {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
              <g key={`tick-y-${y}`}>
                <line x1="0" y1={y} x2="8" y2={y} />
                <line x1="1192" y1={y} x2="1200" y2={y} />
              </g>
            ))}
          </g>
        </motion.g>

        {/* ============ CROSS MARKERS (Survey points) ============ */}
        <motion.g
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <g stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.4">
            {/* Survey crosses */}
            <g transform="translate(300, 350)">
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="0" y1="-8" x2="0" y2="8" />
              <circle r="12" fill="none" strokeDasharray="3 2" />
            </g>
            <g transform="translate(800, 500)">
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="0" y1="-8" x2="0" y2="8" />
              <circle r="12" fill="none" strokeDasharray="3 2" />
            </g>
            <g transform="translate(500, 650)">
              <line x1="-6" y1="0" x2="6" y2="0" />
              <line x1="0" y1="-6" x2="0" y2="6" />
            </g>
          </g>

          {/* Benchmark */}
          <g transform="translate(950, 600)" fill="var(--color-accent-alt)" opacity="0.35">
            <rect x="-8" y="-3" width="16" height="6" />
            <text x="15" y="3" fontSize="7" fontFamily="monospace">BM 156.3</text>
          </g>
        </motion.g>

        {/* ============ VEGETATION/TERRAIN SYMBOLS ============ */}
        <motion.g
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          {/* Marsh/wetland symbols */}
          <g stroke="var(--color-accent-alt)" strokeWidth="1" opacity="0.3">
            <path d="M680 650 Q 685 645, 690 650 Q 695 645, 700 650" fill="none" />
            <path d="M700 660 Q 705 655, 710 660 Q 715 655, 720 660" fill="none" />
            <path d="M720 650 Q 725 645, 730 650 Q 735 645, 740 650" fill="none" />
          </g>

          {/* Forest/vegetation dots */}
          <g fill="var(--color-moss)" opacity="0.25">
            <circle cx="380" cy="320" r="2" />
            <circle cx="390" cy="315" r="1.5" />
            <circle cx="400" cy="322" r="2" />
            <circle cx="395" cy="328" r="1.5" />
            <circle cx="410" cy="318" r="2" />
          </g>
        </motion.g>

        {/* ============ CONTOUR LABELS ============ */}
        <motion.g
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <text x="280" y="345" fill="var(--color-accent)" fontSize="9" fontFamily="monospace" opacity="0.5" transform="rotate(-8, 280, 345)">500</text>
          <text x="500" y="445" fill="var(--color-accent)" fontSize="9" fontFamily="monospace" opacity="0.5" transform="rotate(-5, 500, 445)">400</text>
          <text x="720" y="545" fill="var(--color-accent)" fontSize="9" fontFamily="monospace" opacity="0.5" transform="rotate(-3, 720, 545)">300</text>
        </motion.g>
      </svg>

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--color-bg-primary) 75%)',
          opacity: 0.5,
        }}
      />

      {/* Edge fades */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary opacity-25" />
    </div>
  );
}
