window.PINNIES_ART = window.PINNIES_ART || {};

(function registerWave1() {
  const FINISH_PALETTES = {
    brass: { hi: "#FFE98A", mid: "#E5B230", lo: "#9C6E10", back: "#C99622" },
    nickel: { hi: "#B8C4CC", mid: "#5C6873", lo: "#22282E", back: "#47525C" },
    rose: { hi: "#FFD1C7", mid: "#E08E79", lo: "#944A3A", back: "#C47360" },
    rainbow: { hi: "#7EF29D", mid: "#FF8CC6", lo: "#70E1F5", back: "#A685FF" }
  };

  function metalDefs(uid, finish) {
    const p = FINISH_PALETTES[finish] || FINISH_PALETTES.brass;
    return `
      <defs>
        <linearGradient id="m_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.hi}"/>
          <stop offset="48%" stop-color="${p.mid}"/>
          <stop offset="100%" stop-color="${p.lo}"/>
        </linearGradient>
        <linearGradient id="b_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.hi}"/>
          <stop offset="100%" stop-color="${p.back}"/>
        </linearGradient>
      </defs>
    `;
  }

  function standardBack(uid, finish, serial, shapePath, numStr) {
    return `
      <svg viewBox="0 0 240 240">
        ${metalDefs(uid, finish)}
        <g stroke="#0E1F16" stroke-width="5" stroke-linejoin="round">
          ${shapePath(`url(#b_${uid})`)}
        </g>
        <!-- Dual Rubber Clutches -->
        <circle cx="88" cy="126" r="16" fill="#1E2823" stroke="#0E1F16" stroke-width="3.5"/>
        <circle cx="88" cy="126" r="6" fill="#3B4D43"/>
        <circle cx="152" cy="126" r="16" fill="#1E2823" stroke="#0E1F16" stroke-width="3.5"/>
        <circle cx="152" cy="126" r="6" fill="#3B4D43"/>
        <!-- Engraved Backstamp -->
        <text x="120" y="92" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="14" fill="#0E1F16" opacity="0.72">PINNIES</text>
        <text x="120" y="168" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="11" fill="#0E1F16" opacity="0.72">#${numStr}/60 • ${serial}</text>
      </svg>
    `;
  }

  // #01 PINEAPPLE EXPRESS
  window.PINNIES_ART["pineapple-express"] = {
    animClass: "anim-train",
    sound: "train",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <!-- Billowing Enamel Steam Plume Carrying Strain Name -->
          <g class="steam-plume" stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <path d="M52 74 C36 74 28 60 36 48 C34 32 54 22 70 30 C82 16 112 16 124 30 C142 20 168 30 166 48 C184 48 194 64 184 78 C194 90 184 106 166 106 L64 106 C46 106 38 88 52 74 Z" fill="#FAF3DF"/>
            <text x="110" y="56" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="18.5" font-weight="700" fill="#143D29" letter-spacing="0.5">PINEAPPLE</text>
            <text x="112" y="83" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="20" font-weight="700" fill="#D97706" letter-spacing="1.2">EXPRESS</text>
          </g>

          <!-- Art-Deco Pineapple Locomotive -->
          <g class="loco-chassis" stroke="url(#m_${uid})" stroke-width="5" stroke-linejoin="round">
            <!-- Pineapple Frond Crown at Rear -->
            <path d="M40 132 L20 112 L46 122 L38 98 L58 118 L66 100 L68 124 Z" fill="#2BB673"/>
            <!-- Cab -->
            <rect x="44" y="122" width="46" height="58" rx="8" fill="#1B4D36"/>
            <rect x="53" y="132" width="26" height="20" rx="4" fill="#FFE66D"/>
            <!-- Smokestack -->
            <path d="M156 126 L150 104 L174 104 L168 126 Z" fill="#1B4D36"/>
            <!-- Faceted Pineapple Boiler -->
            <rect x="86" y="126" width="96" height="54" rx="22" fill="#F2B728"/>
            <path d="M104 126 L130 180 M128 126 L154 180 M152 128 L174 172 M154 126 L128 180 M130 126 L104 180" stroke="#B45309" stroke-width="2.5" opacity="0.55"/>
            <!-- Cowcatcher & Headlamp -->
            <path d="M180 156 L212 184 L178 184 Z" fill="#2BB673"/>
            <circle cx="186" cy="144" r="9" fill="#FFF7AE"/>
            <!-- Chassis Rail -->
            <rect x="38" y="176" width="152" height="10" rx="5" fill="#143D29"/>
          </g>

          <!-- Spinning Spoked Drive Wheels -->
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <g class="wheel-spin">
              <circle cx="68" cy="192" r="18" fill="#143D29"/>
              <circle cx="68" cy="192" r="7" fill="#FFE66D"/>
              <line x1="68" y1="175" x2="68" y2="209"/><line x1="51" y1="192" x2="85" y2="192"/>
            </g>
            <g class="wheel-spin">
              <circle cx="116" cy="192" r="18" fill="#143D29"/>
              <circle cx="116" cy="192" r="7" fill="#FFE66D"/>
              <line x1="116" y1="175" x2="116" y2="209"/><line x1="99" y1="192" x2="133" y2="192"/>
            </g>
            <g class="wheel-spin">
              <circle cx="164" cy="192" r="18" fill="#143D29"/>
              <circle cx="164" cy="192" r="7" fill="#FFE66D"/>
              <line x1="164" y1="175" x2="164" y2="209"/><line x1="147" y1="192" x2="181" y2="192"/>
            </g>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<rect x="32" y="34" width="176" height="172" rx="46" fill="${fill}"/>`, "01");
    }
  };

  // #02 BLUE DREAM
  window.PINNIES_ART["blue-dream"] = {
    animClass: "anim-dream",
    sound: "chime",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g class="moon-body" stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <!-- Crescent Moon -->
            <path d="M138 28 C82 28 42 68 42 118 C42 168 82 206 136 206 C158 206 178 198 192 185 C150 188 114 156 114 114 C114 74 144 42 182 38 C168 31 154 28 138 28 Z" fill="#3B82F6"/>
            <!-- Fluffy Dream Cloud -->
            <path d="M68 136 C54 136 46 124 54 112 C56 96 76 88 92 98 C106 84 134 86 144 102 C162 100 176 114 170 130 C178 140 170 154 154 154 L76 154 C62 154 56 142 68 136 Z" fill="#EFF6FF"/>
            <text x="114" y="122" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="18" font-weight="700" fill="#1E3A8A">BLUE</text>
            <text x="114" y="143" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="18.5" font-weight="700" fill="#2563EB" letter-spacing="0.8">DREAM</text>
          </g>
          <!-- Dangling Star Charms -->
          <g class="dream-charm" stroke="url(#m_${uid})" stroke-width="4" stroke-linejoin="round">
            <line x1="82" y1="154" x2="82" y2="180"/>
            <polygon points="82,174 86,184 97,184 88,191 92,201 82,195 72,201 76,191 67,184 78,184" fill="#FFE66D"/>
          </g>
          <g class="dream-charm" stroke="url(#m_${uid})" stroke-width="4" stroke-linejoin="round">
            <line x1="146" y1="154" x2="146" y2="188"/>
            <polygon points="146,182 150,192 161,192 152,199 156,209 146,203 136,209 140,199 131,192 142,192" fill="#93C5FD"/>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<circle cx="120" cy="120" r="88" fill="${fill}"/>`, "02");
    }
  };

  // #03 SOUR DIESEL
  window.PINNIES_ART["sour-diesel"] = {
    animClass: "anim-diesel",
    sound: "rev",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <!-- Jerrycan / Vintage Fuel Pump Body -->
          <g stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <path d="M56 54 L132 54 L164 86 L164 196 C164 206 156 214 146 214 L56 214 C46 214 38 206 38 196 L38 72 C38 62 46 54 56 54 Z" fill="#84CC16"/>
            <!-- Handle Cutout -->
            <rect x="64" y="68" width="48" height="16" rx="8" fill="#13291E"/>
            <!-- Fuel Cap -->
            <rect x="136" y="42" width="24" height="16" rx="4" transform="rotate(35 148 50)" fill="#FACC15"/>
            <!-- X Emboss -->
            <path d="M58 106 L144 192 M144 106 L58 192" stroke="#4D7C0F" stroke-width="8" stroke-linecap="round"/>
          </g>
          <!-- Pumping Nozzle & Toxic Drip -->
          <g class="fuel-nozzle" stroke="url(#m_${uid})" stroke-width="4.5" stroke-linejoin="round">
            <path d="M162 118 L198 96 L208 108 L184 128 L164 134 Z" fill="#FACC15"/>
          </g>
          <path class="acid-drip" d="M204 114 C204 114 195 130 195 138 C195 144 199 148 204 148 C209 148 213 144 213 138 C213 130 204 114 204 114 Z" fill="#D9F99D" stroke="url(#m_${uid})" stroke-width="4"/>
          <!-- Angled Hazard Placard -->
          <g transform="rotate(-7 104 148)" stroke="url(#m_${uid})" stroke-width="5">
            <rect x="30" y="122" width="148" height="54" rx="12" fill="#FEF08A"/>
            <text x="104" y="145" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="19" font-weight="700" fill="#1A2E05" letter-spacing="1">SOUR</text>
            <text x="104" y="167" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="20" font-weight="700" fill="#3F6212" letter-spacing="1">DIESEL</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<rect x="42" y="52" width="136" height="162" rx="22" fill="${fill}"/>`, "03");
    }
  };

  // #04 NORTHERN LIGHTS
  window.PINNIES_ART["northern-lights"] = {
    animClass: "anim-aurora",
    sound: "chime",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <!-- Night Sky Shield -->
            <path d="M120 22 C176 22 212 62 212 116 C212 172 170 212 120 218 C70 212 28 172 28 116 C28 62 64 22 120 22 Z" fill="#0F172A"/>
            <!-- Aurora Ribbons -->
            <path class="aurora-ribbon" d="M36 96 C68 62 112 108 148 74 C172 52 194 64 206 78 L206 112 C180 96 156 124 124 114 C90 104 62 128 34 118 Z" fill="#34D399" stroke="none"/>
            <path class="aurora-ribbon" d="M42 74 C76 44 116 82 154 52 C174 38 190 46 200 58 L200 78 C176 64 152 88 120 82 C88 76 62 96 38 90 Z" fill="#A855F7" stroke="none" opacity="0.85"/>
            <!-- Snow-Capped Mountains -->
            <polygon points="34,166 86,104 134,166" fill="#334155"/>
            <polygon points="86,104 70,124 82,120 90,128 102,122" fill="#F8FAFC" stroke="none"/>
            <polygon points="98,168 152,96 206,168" fill="#1E293B"/>
            <polygon points="152,96 135,120 148,116 156,124 169,118" fill="#F8FAFC" stroke="none"/>
            <!-- Foreground Pine Silhouette -->
            <path d="M32 164 Q120 152 208 164 C196 196 160 214 120 218 C80 214 44 196 32 164 Z" fill="#065F46"/>
            <!-- Enamel Banner Across Ridge -->
            <rect x="24" y="160" width="192" height="44" rx="14" fill="#FAF3DF"/>
            <text x="120" y="180" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="16" font-weight="700" fill="#065F46" letter-spacing="0.8">NORTHERN</text>
            <text x="120" y="198" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="16.5" font-weight="700" fill="#7E22CE" letter-spacing="1.2">LIGHTS</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<path d="M120 22 C176 22 212 62 212 116 C212 172 170 212 120 218 C70 212 28 172 28 116 C28 62 64 22 120 22 Z" fill="${fill}"/>`, "04");
    }
  };

  // #05 OG KUSH
  window.PINNIES_ART["og-kush"] = {
    animClass: "anim-og",
    sound: "bass",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <!-- West Coast Gold Crown -->
          <g class="og-crown" stroke="url(#m_${uid})" stroke-width="5" stroke-linejoin="round">
            <path d="M54 96 L44 50 L84 74 L120 36 L156 74 L196 50 L186 96 Z" fill="#FACC15"/>
            <circle cx="44" cy="46" r="6" fill="#10B981"/>
            <circle cx="120" cy="32" r="7" fill="#10B981"/>
            <circle cx="196" cy="46" r="6" fill="#10B981"/>
          </g>
          <!-- Embossed Lowrider Plate -->
          <g class="og-plate" stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <rect x="24" y="96" width="192" height="102" rx="18" fill="#14532D"/>
            <rect x="36" y="108" width="168" height="78" rx="10" fill="#FAF3DF"/>
            <text x="120" y="130" text-anchor="middle" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#15803D" letter-spacing="2.5">WEST COAST</text>
            <text x="120" y="172" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="38" font-weight="700" fill="#14532D" letter-spacing="1.5">OG KUSH</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<rect x="26" y="88" width="188" height="110" rx="20" fill="${fill}"/>`, "05");
    }
  };

  // #06 GRANDDADDY PURPLE
  window.PINNIES_ART["granddaddy-purple"] = {
    animClass: "anim-gdp",
    sound: "chime",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <!-- Floating Zzzs -->
          <g class="gdp-zzz" font-family="Fredoka, sans-serif" font-weight="700" fill="#E9D5FF" stroke="#0E1F16" stroke-width="2">
            <text x="174" y="54" font-size="20">Z</text>
            <text x="192" y="38" font-size="15">z</text>
          </g>
          <!-- Royal Tufted Velvet Armchair -->
          <g class="gdp-chair" stroke="url(#m_${uid})" stroke-width="5" stroke-linejoin="round">
            <!-- Chair Back -->
            <path d="M56 54 C56 36 184 36 184 54 L192 144 L48 144 Z" fill="#6B21A8"/>
            <!-- Heavy Grape Cluster Draped Over Back -->
            <g fill="#A855F7" stroke-width="3.5">
              <circle cx="156" cy="58" r="11"/><circle cx="174" cy="60" r="11"/>
              <circle cx="164" cy="74" r="11"/><circle cx="180" cy="76" r="10"/>
              <circle cx="170" cy="90" r="10"/>
            </g>
            <!-- Rolled Armrests & Cushion -->
            <rect x="30" y="106" width="34" height="76" rx="16" fill="#7E22CE"/>
            <rect x="176" y="106" width="34" height="76" rx="16" fill="#7E22CE"/>
            <rect x="60" y="128" width="120" height="48" rx="12" fill="#9333EA"/>
            <!-- Stitched Gold Banner -->
            <rect x="26" y="160" width="188" height="46" rx="14" fill="#FAF3DF"/>
            <text x="120" y="180" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="15.5" font-weight="700" fill="#581C87" letter-spacing="0.5">GRANDDADDY</text>
            <text x="120" y="199" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="17" font-weight="700" fill="#7E22CE" letter-spacing="1.2">PURPLE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<rect x="30" y="42" width="180" height="164" rx="34" fill="${fill}"/>`, "06");
    }
  };

  // #07 GELATO
  window.PINNIES_ART["gelato"] = {
    animClass: "anim-gelato",
    sound: "chime",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="5" stroke-linejoin="round">
            <!-- Waffle Cone -->
            <polygon points="74,126 166,126 120,222" fill="#D97706"/>
            <path d="M88 144 L136 192 M104 128 L150 174 M152 144 L104 192 M136 128 L90 174" stroke="#92400E" stroke-width="2.5"/>
          </g>
          <!-- Swirled Pastel Gelato Scoops -->
          <g class="gelato-scoop" stroke="url(#m_${uid})" stroke-width="5" stroke-linejoin="round">
            <circle cx="88" cy="108" r="32" fill="#F472B6"/>
            <circle cx="152" cy="108" r="32" fill="#6EE7B7"/>
            <circle cx="120" cy="78" r="36" fill="#FDE68A"/>
            <!-- Piped Script Banner -->
            <rect x="44" y="102" width="152" height="38" rx="19" fill="#FAF3DF"/>
            <text x="120" y="128" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="24" font-weight="700" fill="#BE185D" letter-spacing="1.5">GELATO</text>
          </g>
          <!-- Spinning Cherry Topper -->
          <g class="gelato-cherry" stroke="url(#m_${uid})" stroke-width="4">
            <path d="M120 42 C124 26 138 20 148 24" fill="none" stroke-linecap="round"/>
            <circle cx="120" cy="42" r="13" fill="#EF4444"/>
            <circle cx="116" cy="38" r="3" fill="#FFFFFF" stroke="none"/>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<polygon points="62,92 178,92 120,218" fill="${fill}"/>`, "07");
    }
  };

  // #08 WEDDING CAKE
  window.PINNIES_ART["wedding-cake"] = {
    animClass: "anim-cake",
    sound: "chime",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <!-- Crackling Gold Sparkler -->
          <g stroke="url(#m_${uid})" stroke-width="4.5" stroke-linecap="round">
            <line x1="120" y1="68" x2="120" y2="34"/>
            <g class="cake-spark" stroke="#FACC15" stroke-width="3.5">
              <line x1="120" y1="16" x2="120" y2="26"/>
              <line x1="102" y1="34" x2="112" y2="34"/>
              <line x1="128" y1="34" x2="138" y2="34"/>
              <line x1="107" y1="21" x2="114" y2="28"/>
              <line x1="133" y1="21" x2="126" y2="28"/>
            </g>
          </g>
          <!-- Three-Tier Frosted Cake -->
          <g stroke="url(#m_${uid})" stroke-width="5" stroke-linejoin="round">
            <!-- Top Tier -->
            <rect x="76" y="68" width="88" height="36" rx="10" fill="#FBCFE8"/>
            <!-- Middle Tier -->
            <rect x="52" y="104" width="136" height="44" rx="12" fill="#FAF3DF"/>
            <!-- Bottom Tier -->
            <rect x="30" y="148" width="180" height="54" rx="14" fill="#F9A8D4"/>
            <!-- Frosting Scallops -->
            <path d="M54 114 Q70 128 86 114 Q102 128 120 114 Q138 128 154 114 Q170 128 186 114" fill="none" stroke="#EC4899" stroke-width="3.5"/>
            <!-- Cake Typography -->
            <text x="120" y="140" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="18.5" font-weight="700" fill="#9D174D" letter-spacing="0.8">WEDDING</text>
            <text x="120" y="184" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="25" font-weight="700" fill="#FAF3DF" letter-spacing="2">CAKE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<rect x="32" y="72" width="176" height="130" rx="22" fill="${fill}"/>`, "08");
    }
  };

  // #09 JACK HERER
  window.PINNIES_ART["jack-herer"] = {
    animClass: "anim-compass",
    sound: "click",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <!-- Compass Top Bow Ring -->
            <circle cx="120" cy="26" r="14" fill="none"/>
            <!-- Compass Outer Case -->
            <circle cx="120" cy="126" r="88" fill="#14532D"/>
            <circle cx="120" cy="126" r="64" fill="#FAF3DF"/>
            <!-- Engraved Bezel Name -->
            <text x="120" y="56" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="14" font-weight="700" fill="#FFE66D" letter-spacing="1.6">JACK</text>
            <text x="120" y="206" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="14" font-weight="700" fill="#FFE66D" letter-spacing="1.6">HERER</text>
            <!-- Cardinal Points -->
            <text x="120" y="80" text-anchor="middle" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#14532D">N</text>
            <text x="120" y="182" text-anchor="middle" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#14532D">S</text>
            <text x="72" y="130" text-anchor="middle" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#14532D">W</text>
            <text x="168" y="130" text-anchor="middle" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#14532D">E</text>
          </g>
          <!-- Spinning Magnetic Needle -->
          <g class="compass-needle" stroke="#0E1F16" stroke-width="3" stroke-linejoin="round">
            <polygon points="120,82 131,126 109,126" fill="#EF4444"/>
            <polygon points="120,170 131,126 109,126" fill="#3B82F6"/>
            <circle cx="120" cy="126" r="7" fill="#FACC15"/>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<circle cx="120" cy="126" r="88" fill="${fill}"/>`, "09");
    }
  };

  // #10 GIRL SCOUT COOKIES (GSC)
  window.PINNIES_ART["girl-scout-cookies"] = {
    animClass: "anim-gsc",
    sound: "chime",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g class="gsc-cookie" stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <!-- Trefoil Cookie with Bite Taken Out on Top-Right -->
            <path d="M120 34 C94 34 74 52 72 76 C48 80 32 100 32 124 C32 152 54 174 82 174 C90 194 104 206 120 206 C136 206 150 194 158 174 C186 174 208 152 208 124 C208 112 204 100 196 92 C184 96 172 90 170 78 C158 80 148 70 150 58 C142 42 132 34 120 34 Z" fill="#3E2723"/>
            <!-- Mint Frosting Rim -->
            <circle cx="116" cy="124" r="56" fill="#6EE7B7"/>
            <circle cx="116" cy="124" r="44" fill="#4E342E"/>
            <!-- Stamped Cookie Emblem -->
            <text x="116" y="122" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="26" font-weight="700" fill="#A7F3D0" letter-spacing="1.5">GSC</text>
            <text x="116" y="142" text-anchor="middle" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800" fill="#FDE68A" letter-spacing="1.4">MINT BATCH</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) {
      return standardBack(uid, finish, serial, (fill) => `<circle cx="120" cy="124" r="86" fill="${fill}"/>`, "10");
    }
  };
})();
