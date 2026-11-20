(function initPinniesApp() {
  const STORAGE_KEY = "pinnies_collection_v2";

  const FINISH_META = {
    brass: { label: "Brass Gold", css: "rarity-common" },
    nickel: { label: "Black Nickel", css: "rarity-uncommon" },
    rose: { label: "Rose Gold", css: "rarity-rare" },
    platinum: { label: "Holo Platinum", css: "rarity-double-rare" },
    rainbow: { label: "Rainbow Anodized", css: "rarity-chase" }
  };

  const RARITY_WEIGHTS = {
    Common: 48,
    Uncommon: 26,
    Rare: 14,
    "Double Rare": 7,
    Chase: 5
  };

  // State
  let state = loadState();
  let currentPull = null;
  let isFlipped = false;
  let isUvOn = false;
  let checklistFilter = "all";

  // DOM Refs
  const bagStage = document.getElementById("bagStage");
  const revealStage = document.getElementById("revealStage");
  const pouchWrapper = document.getElementById("pouchWrapper");
  const pouchCap = document.getElementById("pouchCap");
  const tearStrip = document.getElementById("tearStrip");
  const tearHandle = document.getElementById("tearHandle");
  const tearFill = document.getElementById("tearFill");

  const burstLayer = document.getElementById("burstLayer");
  const floatingPin = document.getElementById("floatingPin");
  const pin3D = document.getElementById("pin3D");
  const pinShadow = document.getElementById("pinShadow");
  const pinFront = document.getElementById("pinFront");
  const pinBack = document.getElementById("pinBack");

  const specNumber = document.getElementById("specNumber");
  const specRarity = document.getElementById("specRarity");
  const specName = document.getElementById("specName");
  const specTagline = document.getElementById("specTagline");
  const specTerpLabel = document.getElementById("specTerpLabel");
  const specTerpenes = document.getElementById("specTerpenes");

  const btnAnimatePin = document.getElementById("btnAnimatePin");
  const btnFlipPin = document.getElementById("btnFlipPin");
  const btnUvPin = document.getElementById("btnUvPin");
  const btnTearAnother = document.getElementById("btnTearAnother");

  const dragGhost = document.getElementById("dragGhost");
  const boardModal = document.getElementById("boardModal");
  const corkSurface = document.getElementById("corkSurface");
  const dropTargetRing = document.getElementById("dropTargetRing");
  const boardEmptyState = document.getElementById("boardEmptyState");
  const mountedPinsLayer = document.getElementById("mountedPinsLayer");

  const checklistModal = document.getElementById("checklistModal");
  const checklistGrid = document.getElementById("checklistGrid");
  const checklistCount = document.getElementById("checklistCount");
  const boardCount = document.getElementById("boardCount");
  const checklistProgressText = document.getElementById("checklistProgressText");
  const checklistProgressBar = document.getElementById("checklistProgressBar");

  // 14-Sound Procedural Web Audio Synthesizer
  let audioCtx = null;
  function getAudio() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(ctx, type, freqStart, freqEnd, startTime, duration, vol = 0.14) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, startTime);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), startTime + duration);
    }
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  function playSfx(type) {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;

    switch (type) {
      case "crinkle": {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 2600;
        src.connect(filter).connect(ctx.destination);
        src.start();
        break;
      }
      case "rip":
        tone(ctx, "triangle", 300, 940, now, 0.28, 0.2);
        break;
      case "train":
        tone(ctx, "sawtooth", 587.33, 587.33, now, 0.22, 0.11);
        tone(ctx, "sawtooth", 739.99, 739.99, now + 0.18, 0.34, 0.12);
        tone(ctx, "triangle", 140, 90, now + 0.48, 0.12, 0.16);
        break;
      case "dream":
        [523.25, 659.25, 783.99, 987.77, 1174.66].forEach((f, i) => {
          tone(ctx, "sine", f, f * 1.02, now + i * 0.07, 0.42, 0.11);
        });
        break;
      case "acid":
        tone(ctx, "sawtooth", 140, 420, now, 0.25, 0.13);
        tone(ctx, "sine", 520, 880, now + 0.18, 0.14, 0.14);
        tone(ctx, "sine", 640, 1080, now + 0.3, 0.14, 0.14);
        break;
      case "aurora":
        [329.63, 493.88, 659.25, 830.61].forEach((f, i) => {
          tone(ctx, "triangle", f, f * 1.01, now + i * 0.05, 0.65, 0.09);
        });
        break;
      case "lowrider":
        tone(ctx, "sawtooth", 110, 52, now, 0.22, 0.22);
        tone(ctx, "sawtooth", 125, 55, now + 0.24, 0.28, 0.22);
        break;
      case "snore":
        tone(ctx, "sine", 260, 195, now, 0.38, 0.13);
        tone(ctx, "sine", 523.25, 659.25, now + 0.35, 0.32, 0.1);
        break;
      case "scoop":
        tone(ctx, "sine", 380, 760, now, 0.14, 0.16);
        tone(ctx, "triangle", 520, 1040, now + 0.12, 0.18, 0.15);
        break;
      case "sparkler":
        [980, 1320, 1140, 1560, 1280, 1760].forEach((f, i) => {
          tone(ctx, "square", f, f * 0.85, now + i * 0.055, 0.07, 0.07);
        });
        break;
      case "compass":
        [720, 840, 960, 1080, 880, 920].forEach((f, i) => {
          tone(ctx, "triangle", f, f * 0.7, now + i * 0.06, 0.05, 0.14);
        });
        break;
      case "crunch":
        [240, 180, 310, 150].forEach((f, i) => {
          tone(ctx, "square", f, 70, now + i * 0.055, 0.06, 0.14);
        });
        break;
      case "terp_rare":
        [587.33, 880, 1174.66].forEach((f, i) => {
          tone(ctx, "sine", f, f, now + i * 0.08, 0.45, 0.13);
        });
        break;
      case "terp_double":
        [659.25, 987.77, 1318.51, 1567.98, 1975.53].forEach((f, i) => {
          tone(ctx, "triangle", f, f * 1.015, now + i * 0.065, 0.52, 0.13);
        });
        break;
      case "thud":
        tone(ctx, "sine", 150, 48, now, 0.12, 0.24);
        break;
      default:
        tone(ctx, "sine", 620, 880, now, 0.1, 0.16);
    }
  }

  // Persistence
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          unlockedIds: Array.isArray(parsed.unlockedIds) ? parsed.unlockedIds : [],
          mountedPins: Array.isArray(parsed.mountedPins) ? parsed.mountedPins : [],
          recentPulls: Array.isArray(parsed.recentPulls) ? parsed.recentPulls : []
        };
      }
    } catch (_) {}
    return { unlockedIds: [], mountedPins: [], recentPulls: [] };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
    updateCounters();
  }

  function updateCounters() {
    const total = window.PINNIES_ROSTER.length;
    const unlocked = state.unlockedIds.length;
    checklistCount.textContent = `${unlocked} / ${total}`;
    boardCount.textContent = `${state.mountedPins.length}`;
    checklistProgressText.textContent = `${unlocked} of ${total} Botanical Pins Unlocked`;
    checklistProgressBar.style.width = `${Math.round((unlocked / total) * 100)}%`;
  }

  // Shuffle-Bag Diversity RNG (Prevents Back-to-Back & Short-Cycle Repeats)
  function rollBlindBag() {
    const activePool = window.PINNIES_ROSTER.filter((s) => Boolean(window.PINNIES_ART[s.id]));
    const cooldownSize = Math.min(activePool.length - 1, Math.max(4, Math.floor(activePool.length * 0.65)));
    const blockedSet = new Set(state.recentPulls.slice(-cooldownSize));

    let candidates = activePool.filter((s) => !blockedSet.has(s.id));
    if (candidates.length === 0) {
      const lastId = state.recentPulls[state.recentPulls.length - 1];
      candidates = activePool.filter((s) => s.id !== lastId);
    }

    const weighted = candidates.map((s) => ({
      strain: s,
      weight: RARITY_WEIGHTS[s.rarity] || 20
    }));
    const totalWeight = weighted.reduce((acc, item) => acc + item.weight, 0);
    let r = Math.random() * totalWeight;
    let chosen = weighted[0].strain;

    for (const item of weighted) {
      if (r < item.weight) {
        chosen = item.strain;
        break;
      }
      r -= item.weight;
    }

    // Record in cooldown history
    state.recentPulls.push(chosen.id);
    if (state.recentPulls.length > 30) {
      state.recentPulls = state.recentPulls.slice(-30);
    }

    const finishMap = {
      Common: "brass",
      Uncommon: "nickel",
      Rare: "rose",
      "Double Rare": "platinum",
      Chase: "rainbow"
    };
    const finish = finishMap[chosen.rarity] || "brass";
    const serial = String(Math.floor(Math.random() * 499) + 1).padStart(3, "0");

    if (!state.unlockedIds.includes(chosen.id)) {
      state.unlockedIds.push(chosen.id);
    }
    saveState();

    return { strain: chosen, finish, serial };
  }

  // Holo Foil Pointer Shader on Pouch
  document.addEventListener("pointermove", (e) => {
    if (bagStage.classList.contains("hidden")) return;
    const rect = pouchWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const angle = 110 + ((e.clientX - rect.left) / rect.width - 0.5) * 90;
    pouchWrapper.style.setProperty("--glare-x", `${Math.max(0, Math.min(100, x))}%`);
    pouchWrapper.style.setProperty("--glare-y", `${Math.max(0, Math.min(100, y))}%`);
    pouchWrapper.style.setProperty("--holo-angle", `${angle}deg`);
  });

  // Mobile + Desktop Slide-to-Rip Holographic Seal
  let ripping = false;
  let ripStartX = 0;
  let ripProgress = 0;
  let lastCrinkleStep = 0;

  function beginRip(clientX, pointerId) {
    ripping = true;
    ripStartX = clientX;
    if (pointerId !== undefined && tearStrip.setPointerCapture) {
      try { tearStrip.setPointerCapture(pointerId); } catch (_) {}
    }
    getAudio();
  }

  function moveRip(clientX) {
    if (!ripping) return;
    const maxTravel = Math.max(120, tearStrip.clientWidth - 48);
    const dx = Math.max(0, Math.min(maxTravel, clientX - ripStartX));
    ripProgress = dx / maxTravel;

    tearHandle.style.transform = `translateX(${dx}px)`;
    tearFill.style.width = `${Math.round(ripProgress * 100)}%`;
    tearStrip.setAttribute("aria-valuenow", Math.round(ripProgress * 100));

    const step = Math.floor(ripProgress * 8);
    if (step > lastCrinkleStep) {
      lastCrinkleStep = step;
      playSfx("crinkle");
    }

    if (ripProgress >= 0.72) {
      ripping = false;
      completeBagRip();
    }
  }

  function endRip() {
    if (!ripping) return;
    if (ripProgress < 0.72) resetRipSlider();
  }

  tearStrip.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    beginRip(e.clientX, e.pointerId);
  });

  tearStrip.addEventListener("pointermove", (e) => {
    if (!ripping) return;
    e.preventDefault();
    moveRip(e.clientX);
  });

  tearStrip.addEventListener("pointerup", endRip);
  tearStrip.addEventListener("pointercancel", endRip);

  // Touch fallback for older mobile WebViews
  tearStrip.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      e.preventDefault();
      beginRip(e.touches[0].clientX);
    }
  }, { passive: false });

  tearStrip.addEventListener("touchmove", (e) => {
    if (!ripping || e.touches.length === 0) return;
    e.preventDefault();
    moveRip(e.touches[0].clientX);
  }, { passive: false });

  tearStrip.addEventListener("touchend", endRip);

  function resetRipSlider() {
    ripping = false;
    ripProgress = 0;
    lastCrinkleStep = 0;
    tearHandle.style.transform = "translateX(0px)";
    tearFill.style.width = "0%";
    pouchCap.classList.remove("ripped");
  }

  tearStrip.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      completeBagRip();
    }
  });

  function spawnSparkles(cx, cy, count = 24) {
    const colors = ["#FFE66D", "#8CE052", "#FAF3DF", "#FF8CC6", "#70E1F5"];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "sparkle-particle";
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 70 + Math.random() * 140;
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      burstLayer.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  function completeBagRip() {
    playSfx("rip");
    pouchCap.classList.add("ripped");
    const rect = tearStrip.getBoundingClientRect();
    spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);

    setTimeout(() => {
      currentPull = rollBlindBag();
      renderReveal(currentPull);
      bagStage.classList.add("hidden");
      revealStage.classList.remove("hidden");
      triggerPinAnimation(pinFront, currentPull.strain.id);
    }, 360);
  }

  function renderReveal(pull) {
    const { strain, finish, serial } = pull;
    const art = window.PINNIES_ART[strain.id];
    const uid = `rev_${Date.now()}`;

    isFlipped = false;
    isUvOn = false;
    pin3D.classList.remove("flipped");
    floatingPin.classList.remove("uv-active");
    btnUvPin.classList.remove("active");

    pinFront.innerHTML = art.renderFront(uid, finish);
    pinBack.innerHTML = art.renderBack(uid, finish, serial);

    const isTerp = strain.category === "terpene";
    specNumber.textContent = isTerp ? `TERPENE #${strain.num}` : `#${strain.num} / 60`;
    const fMeta = FINISH_META[finish];
    specRarity.textContent = `${strain.rarity} • ${fMeta.label}`;
    specRarity.className = `spec-rarity ${fMeta.css}`;
    specName.textContent = strain.name;
    specTagline.textContent = strain.tagline;
    specTerpLabel.textContent = isTerp ? "AROMA & BOTANICAL NOTES" : "DOMINANT TERPENES";

    specTerpenes.innerHTML = strain.terpenes
      .map((t) => `<span class="terp-pill">${t}</span>`)
      .join("");
  }

  function triggerPinAnimation(containerEl, strainId) {
    const art = window.PINNIES_ART[strainId];
    if (!art) return;
    containerEl.classList.remove(art.animClass);
    void containerEl.offsetWidth;
    containerEl.classList.add(art.animClass);
    playSfx(art.sound || "dream");
  }

  // Interactive Controls on Floating Pin
  btnAnimatePin.addEventListener("click", () => {
    if (!currentPull) return;
    triggerPinAnimation(pinFront, currentPull.strain.id);
  });

  btnFlipPin.addEventListener("click", () => {
    isFlipped = !isFlipped;
    pin3D.classList.toggle("flipped", isFlipped);
    playSfx("click");
  });

  btnUvPin.addEventListener("click", () => {
    isUvOn = !isUvOn;
    floatingPin.classList.toggle("uv-active", isUvOn);
    btnUvPin.classList.toggle("active", isUvOn);
    playSfx("click");
  });

  function goBackToBag() {
    boardModal.classList.add("hidden");
    revealStage.classList.add("hidden");
    bagStage.classList.remove("hidden");
    resetRipSlider();
  }

  btnTearAnother.addEventListener("click", goBackToBag);
  document.getElementById("btnBoardTearAnother").addEventListener("click", goBackToBag);

  // 3D Tilt + Drag-to-Open-Board Gesture on Floating Pin
  let pinDragging = false;
  let pinMoved = false;
  let dragStart = { x: 0, y: 0 };

  floatingPin.addEventListener("pointermove", (e) => {
    if (pinDragging) return;
    const rect = floatingPin.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pin3D.style.setProperty("--rx", `${(-ny * 26).toFixed(1)}deg`);
    pin3D.style.setProperty("--ry", `${(nx * 26).toFixed(1)}deg`);
    pinShadow.style.setProperty("--sx", `${(-nx * 24).toFixed(1)}px`);
    pinShadow.style.setProperty("--sy", `${(22 - ny * 18).toFixed(1)}px`);
  });

  floatingPin.addEventListener("pointerleave", () => {
    if (pinDragging) return;
    pin3D.style.setProperty("--rx", "0deg");
    pin3D.style.setProperty("--ry", "0deg");
    pinShadow.style.setProperty("--sx", "0px");
    pinShadow.style.setProperty("--sy", "24px");
  });

  floatingPin.addEventListener("pointerdown", (e) => {
    if (!currentPull) return;
    pinDragging = true;
    pinMoved = false;
    dragStart = { x: e.clientX, y: e.clientY };
    try { floatingPin.setPointerCapture(e.pointerId); } catch (_) {}
  });

  floatingPin.addEventListener("pointermove", (e) => {
    if (!pinDragging || !currentPull) return;
    const dist = Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y);

    if (!pinMoved && dist > 10) {
      pinMoved = true;
      boardModal.classList.remove("hidden");
      renderCorkboard();

      const art = window.PINNIES_ART[currentPull.strain.id];
      dragGhost.innerHTML = art.renderFront(`ghost_${Date.now()}`, currentPull.finish);
      dragGhost.classList.remove("hidden");
    }

    if (pinMoved) {
      dragGhost.style.left = `${e.clientX}px`;
      dragGhost.style.top = `${e.clientY}px`;
      updateDropIndicator(e.clientX, e.clientY);
    }
  });

  floatingPin.addEventListener("pointerup", (e) => {
    if (!pinDragging) return;
    pinDragging = false;
    dragGhost.classList.add("hidden");
    dropTargetRing.classList.add("hidden");
    corkSurface.classList.remove("drop-active");

    if (!pinMoved && currentPull) {
      triggerPinAnimation(pinFront, currentPull.strain.id);
      return;
    }

    if (pinMoved && currentPull) {
      const rect = corkSurface.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        const xPct = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
        const yPct = Math.max(14, Math.min(86, ((e.clientY - rect.top) / rect.height) * 100));
        mountPinToBoard(currentPull, xPct, yPct);
      }
    }
  });

  function updateDropIndicator(clientX, clientY) {
    const rect = corkSurface.getBoundingClientRect();
    const inside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;

    corkSurface.classList.toggle("drop-active", inside);
    if (inside) {
      dropTargetRing.classList.remove("hidden");
      dropTargetRing.style.left = `${clientX - rect.left}px`;
      dropTargetRing.style.top = `${clientY - rect.top}px`;
    } else {
      dropTargetRing.classList.add("hidden");
    }
  }

  function mountPinToBoard(pull, xPct, yPct) {
    const instanceId = `pin_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    state.mountedPins.push({
      instanceId,
      strainId: pull.strain.id,
      finish: pull.finish,
      serial: pull.serial,
      xPct,
      yPct
    });
    saveState();
    playSfx("thud");
    renderCorkboard(instanceId);
  }

  function renderCorkboard(highlightInstanceId = null) {
    boardEmptyState.classList.toggle("hidden", state.mountedPins.length > 0);
    mountedPinsLayer.innerHTML = "";

    state.mountedPins.forEach((item) => {
      const art = window.PINNIES_ART[item.strainId];
      const strain = window.PINNIES_ROSTER.find((s) => s.id === item.strainId);
      if (!art || !strain) return;

      const el = document.createElement("div");
      el.className = "mounted-pin";
      if (item.instanceId === highlightInstanceId) el.classList.add("just-pinned");
      el.style.left = `${item.xPct}%`;
      el.style.top = `${item.yPct}%`;
      el.title = `${strain.name} — Tap to animate or drag to move`;
      el.innerHTML = `
        <div class="mounted-pin-art">${art.renderFront(item.instanceId, item.finish)}</div>
        <button class="mounted-pin-remove" type="button" title="Remove from board">✕</button>
      `;

      el.querySelector(".mounted-pin-remove").addEventListener("pointerdown", (ev) => ev.stopPropagation());
      el.querySelector(".mounted-pin-remove").addEventListener("click", (ev) => {
        ev.stopPropagation();
        state.mountedPins = state.mountedPins.filter((p) => p.instanceId !== item.instanceId);
        saveState();
        renderCorkboard();
      });

      let moving = false;
      let moved = false;
      let start = { x: 0, y: 0 };

      el.addEventListener("pointerdown", (ev) => {
        moving = true;
        moved = false;
        start = { x: ev.clientX, y: ev.clientY };
        try { el.setPointerCapture(ev.pointerId); } catch (_) {}
      });

      el.addEventListener("pointermove", (ev) => {
        if (!moving) return;
        if (!moved && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) moved = true;
        if (moved) {
          const rect = corkSurface.getBoundingClientRect();
          const xPct = Math.max(8, Math.min(92, ((ev.clientX - rect.left) / rect.width) * 100));
          const yPct = Math.max(12, Math.min(88, ((ev.clientY - rect.top) / rect.height) * 100));
          item.xPct = xPct;
          item.yPct = yPct;
          el.style.left = `${xPct}%`;
          el.style.top = `${yPct}%`;
        }
      });

      el.addEventListener("pointerup", () => {
        if (!moving) return;
        moving = false;
        if (moved) {
          saveState();
          playSfx("thud");
        } else {
          triggerPinAnimation(el.querySelector(".mounted-pin-art"), item.strainId);
        }
      });

      mountedPinsLayer.appendChild(el);
    });
  }

  // Modals
  document.getElementById("btnOpenBoard").addEventListener("click", () => {
    renderCorkboard();
    boardModal.classList.remove("hidden");
  });

  document.getElementById("btnCloseBoard").addEventListener("click", () => boardModal.classList.add("hidden"));
  boardModal.addEventListener("click", (e) => { if (e.target === boardModal) boardModal.classList.add("hidden"); });

  document.getElementById("btnOpenChecklist").addEventListener("click", () => {
    renderChecklist();
    checklistModal.classList.remove("hidden");
  });

  document.getElementById("btnCloseChecklist").addEventListener("click", () => checklistModal.classList.add("hidden"));
  checklistModal.addEventListener("click", (e) => { if (e.target === checklistModal) checklistModal.classList.add("hidden"); });

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      checklistFilter = chip.dataset.filter;
      renderChecklist();
    });
  });

  function renderChecklist() {
    checklistGrid.innerHTML = "";
    const filtered = window.PINNIES_ROSTER.filter((s) => {
      const unlocked = state.unlockedIds.includes(s.id);
      if (checklistFilter === "unlocked") return unlocked;
      if (checklistFilter === "terpenes") return s.category === "terpene";
      if (checklistFilter === "missing") return !unlocked;
      return true;
    });

    filtered.forEach((strain) => {
      const unlocked = state.unlockedIds.includes(strain.id);
      const art = window.PINNIES_ART[strain.id];
      const card = document.createElement("div");
      card.className = `check-card ${unlocked ? "" : "locked"}`;

      let thumbHtml = `<div class="check-silhouette">?</div>`;
      if (unlocked && art) {
        const finishMap = { Common: "brass", Uncommon: "nickel", Rare: "rose", "Double Rare": "platinum", Chase: "rainbow" };
        thumbHtml = art.renderFront(`chk_${strain.id}`, finishMap[strain.rarity] || "brass");
      }

      const statusBadge = unlocked
        ? `<span class="check-badge">${strain.rarity}</span>`
        : art
          ? `<span class="check-badge upcoming">In Bags</span>`
          : `<span class="check-badge upcoming">Wave ${strain.wave}</span>`;

      card.innerHTML = `
        <div class="check-thumb">${thumbHtml}</div>
        <div class="check-num">${strain.category === "terpene" ? `TERPENE #${strain.num}` : `#${strain.num} / 60`}</div>
        <div class="check-title">${strain.name}</div>
        ${statusBadge}
      `;
      checklistGrid.appendChild(card);
    });
  }

  updateCounters();
})();
