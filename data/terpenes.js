window.PINNIES_ART = window.PINNIES_ART || {};

(function registerTerpenes() {
  const FINISH_PALETTES = {
    brass: { hi: "#FFE98A", mid: "#E5B230", lo: "#9C6E10", back: "#C99622" },
    nickel: { hi: "#B8C4CC", mid: "#5C6873", lo: "#22282E", back: "#47525C" },
    rose: { hi: "#FFD1C7", mid: "#E08E79", lo: "#944A3A", back: "#C47360" },
    platinum: { hi: "#F4F9FF", mid: "#A3D5FF", lo: "#5B6EAE", back: "#8EB8E5" },
    rainbow: { hi: "#7EF29D", mid: "#FF8CC6", lo: "#70E1F5", back: "#A685FF" }
  };

  function metalDefs(uid, finish) {
    const p = FINISH_PALETTES[finish] || FINISH_PALETTES.rose;
    return `
      <defs>
        <linearGradient id="m_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.hi}"/>
          <stop offset="50%" stop-color="${p.mid}"/>
          <stop offset="100%" stop-color="${p.lo}"/>
        </linearGradient>
        <linearGradient id="b_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.hi}"/>
          <stop offset="100%" stop-color="${p.back}"/>
        </linearGradient>
      </defs>
    `;
  }

  function terpeneBack(uid, finish, serial, codeStr) {
    return `
      <svg viewBox="0 0 240 240">
        ${metalDefs(uid, finish)}
        <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="url(#b_${uid})" stroke="#0E1F16" stroke-width="5.5" stroke-linejoin="round"/>
        <circle cx="90" cy="144" r="15" fill="#1E2823" stroke="#0E1F16" stroke-width="3.5"/>
        <circle cx="90" cy="144" r="5.5" fill="#3B4D43"/>
        <circle cx="150" cy="144" r="15" fill="#1E2823" stroke="#0E1F16" stroke-width="3.5"/>
        <circle cx="150" cy="144" r="5.5" fill="#3B4D43"/>
        <text x="120" y="108" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="13" fill="#0E1F16" opacity="0.78">TERPENE VAULT</text>
        <text x="120" y="184" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="11" fill="#0E1F16" opacity="0.78">#${codeStr} • ${serial}</text>
      </svg>
    `;
  }

  // T1: MYRCENE (Rare)
  window.PINNIES_ART["terp-myrcene"] = {
    animClass: "anim-terp-myrcene",
    sound: "terp_rare",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="#FFF7ED"/>
          </g>
          <g class="terp-orbit" stroke="url(#m_${uid})" stroke-width="4" stroke-linejoin="round">
            <!-- Mango & Hop Motif -->
            <ellipse cx="114" cy="116" rx="34" ry="26" transform="rotate(-24 114 116)" fill="#FB923C"/>
            <path d="M138 92 C152 84 166 92 162 106 C150 108 140 102 138 92 Z" fill="#4ADE80"/>
            <circle cx="84" cy="128" r="14" fill="#84CC16"/>
          </g>
          <g class="terp-rings" fill="none" stroke="#F97316" stroke-width="3" opacity="0.75">
            <circle cx="120" cy="124" r="46" stroke-dasharray="10 8"/>
          </g>
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <rect x="42" y="156" width="156" height="40" rx="20" fill="#9A3412"/>
            <text x="120" y="182" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="20" font-weight="700" fill="#FFEDD5" letter-spacing="1.2">MYRCENE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) { return terpeneBack(uid, finish, serial, "T1"); }
  };

  // T2: LIMONENE (Rare)
  window.PINNIES_ART["terp-limonene"] = {
    animClass: "anim-terp-limonene",
    sound: "terp_rare",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="#FEFCE8"/>
          </g>
          <g class="citrus-wheel" stroke="url(#m_${uid})" stroke-width="4">
            <circle cx="120" cy="116" r="42" fill="#FACC15"/>
            <circle cx="120" cy="116" r="33" fill="#FEF08A"/>
            <line x1="120" y1="83" x2="120" y2="149"/><line x1="87" y1="116" x2="153" y2="116"/>
            <line x1="97" y1="93" x2="143" y2="139"/><line x1="143" y1="93" x2="97" y2="139"/>
          </g>
          <g class="zest-sparks" fill="#F59E0B">
            <circle cx="72" cy="96" r="4"/><circle cx="168" cy="94" r="4.5"/><circle cx="164" cy="138" r="3.5"/>
          </g>
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <rect x="40" y="156" width="160" height="40" rx="20" fill="#CA8A04"/>
            <text x="120" y="182" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="19.5" font-weight="700" fill="#FEF9C3" letter-spacing="1.2">LIMONENE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) { return terpeneBack(uid, finish, serial, "T2"); }
  };

  // T3: CARYOPHYLLENE (Rare)
  window.PINNIES_ART["terp-caryophyllene"] = {
    animClass: "anim-terp-caryo",
    sound: "terp_rare",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="5.5" stroke-linejoin="round">
            <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="#FEF2F2"/>
          </g>
          <g class="spice-burst" stroke="url(#m_${uid})" stroke-width="4" stroke-linejoin="round">
            <polygon points="120,72 132,96 158,92 142,114 160,134 134,134 120,156 106,134 80,134 98,114 82,92 108,96" fill="#EF4444"/>
            <circle cx="120" cy="114" r="20" fill="#451A03"/>
            <circle cx="114" cy="108" r="4" fill="#FDE68A" stroke="none"/>
          </g>
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <rect x="26" y="156" width="188" height="40" rx="20" fill="#7F1D1D"/>
            <text x="120" y="181" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="15.5" font-weight="700" fill="#FEE2E2" letter-spacing="0.8">CARYOPHYLLENE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) { return terpeneBack(uid, finish, serial, "T3"); }
  };

  // T4: PINENE (Double Rare)
  window.PINNIES_ART["terp-pinene"] = {
    animClass: "anim-terp-pinene",
    sound: "terp_double",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="6" stroke-linejoin="round">
            <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="#ECFDF5"/>
          </g>
          <g class="pine-sway" stroke="url(#m_${uid})" stroke-width="4" stroke-linejoin="round">
            <polygon points="120,66 94,102 108,102 86,132 104,132 82,156 158,156 136,132 154,132 132,102 146,102" fill="#059669"/>
            <circle cx="120" cy="60" r="6" fill="#FFE66D"/>
          </g>
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <rect x="44" y="156" width="152" height="40" rx="20" fill="#064E3B"/>
            <text x="120" y="182" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="21" font-weight="700" fill="#A7F3D0" letter-spacing="1.6">PINENE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) { return terpeneBack(uid, finish, serial, "T4"); }
  };

  // T5: TERPINOLENE (Double Rare)
  window.PINNIES_ART["terp-terpinolene"] = {
    animClass: "anim-terp-terpinolene",
    sound: "terp_double",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="6" stroke-linejoin="round">
            <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="#FDF4FF"/>
          </g>
          <g class="kaleido-spin" stroke="url(#m_${uid})" stroke-width="3.5" stroke-linejoin="round">
            <circle cx="120" cy="114" r="38" fill="#E879F9"/>
            <polygon points="120,76 134,114 120,152 106,114" fill="#FEF08A"/>
            <polygon points="82,114 120,100 158,114 120,128" fill="#38BDF8"/>
            <circle cx="120" cy="114" r="11" fill="#FFFFFF"/>
          </g>
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <rect x="32" y="156" width="176" height="40" rx="20" fill="#701A75"/>
            <text x="120" y="181" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="16.5" font-weight="700" fill="#FAE8FF" letter-spacing="1">TERPINOLENE</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) { return terpeneBack(uid, finish, serial, "T5"); }
  };

  // T6: LINALOOL (Double Rare)
  window.PINNIES_ART["terp-linalool"] = {
    animClass: "anim-terp-linalool",
    sound: "terp_double",
    renderFront(uid, finish) {
      return `
        <svg viewBox="0 0 240 240">
          ${metalDefs(uid, finish)}
          <g stroke="url(#m_${uid})" stroke-width="6" stroke-linejoin="round">
            <path d="M120 20 C120 20 44 102 44 156 C44 198 78 222 120 222 C162 222 196 198 196 156 C196 102 120 20 120 20 Z" fill="#F5F3FF"/>
          </g>
          <g class="lavender-mist" stroke="url(#m_${uid})" stroke-width="4" stroke-linejoin="round">
            <line x1="120" y1="150" x2="120" y2="74" stroke="#15803D" stroke-width="5"/>
            <ellipse cx="108" cy="92" rx="10" ry="6" transform="rotate(-25 108 92)" fill="#A78BFA"/>
            <ellipse cx="132" cy="92" rx="10" ry="6" transform="rotate(25 132 92)" fill="#A78BFA"/>
            <ellipse cx="106" cy="112" rx="11" ry="6.5" transform="rotate(-25 106 112)" fill="#8B5CF6"/>
            <ellipse cx="134" cy="112" rx="11" ry="6.5" transform="rotate(25 134 112)" fill="#8B5CF6"/>
            <ellipse cx="120" cy="74" rx="8" ry="11" fill="#C4B5FD"/>
          </g>
          <g stroke="url(#m_${uid})" stroke-width="4.5">
            <rect x="40" y="156" width="160" height="40" rx="20" fill="#4C1D95"/>
            <text x="120" y="182" text-anchor="middle" stroke="none" font-family="Fredoka, sans-serif" font-size="19.5" font-weight="700" fill="#EDE9FE" letter-spacing="1.4">LINALOOL</text>
          </g>
        </svg>
      `;
    },
    renderBack(uid, finish, serial) { return terpeneBack(uid, finish, serial, "T6"); }
  };
})();
