(function initPinniesApp() {
  const STORAGE_KEY = "pinnies_collection_v1";

  const FINISH_META = {
    brass: { label: "Brass Gold", css: "rarity-common" },
    nickel: { label: "Black Nickel", css: "rarity-uncommon" },
    rose: { label: "Rose Gold", css: "rarity-rare" },
    rainbow: { label: "Rainbow Anodized", css: "rarity-chase" }
  };

  const RARITY_WEIGHTS = {
    Common: 52,
    Uncommon: 28,
    Rare: 14,
    Chase: 6
  };

  // State
  let state = loadState();
  let currentPull = null;
  let isFlipped = false;
  let isUvOn = false;
  let checklistFilter = "all";
  let lastPulledId = null;

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

  // Audio Synthesizer (Zero External Assets Required)
  let audioCtx = null;
  function getAudio() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function playSfx(type) {
    const ctx = getAudio();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "crinkle") {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 2400;
      src.connect(filter).connect(ctx.destination);
      src.start();
    } else if (type === "rip") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.28);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.34);
    } else if (type === "train") {
      [587.33, 739.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.11, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.26);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.28);
      });
    } else if (type === "rev" || type === "bass") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === "thud" || type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "thud" ? 150 : 620, now);
      osc.frequency.exponentialRampToValueAtTime(48, now + 0.12);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      // Shimmer / Chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.12, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.38);
      });
    }
  }

  // Persistence
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { unlockedIds: [], mountedPins: [] };
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

  // Weighted Blind-Bag RNG across All Active Art Modules
  function rollBlindBag() {
    const activePool = window.PINNIES_ROSTER.filter((s) => Boolean(window.PINNIES_ART[s.id]));
    const candidates = activePool.length > 1 && lastPulledId
      ? activePool.filter((s) => s.id !== lastPulledId)
      : activePool;

    const weighted = candidates.map((s) => ({
      strain: s,
      weight: RARITY_WEIGHTS[s.rarity] || 25
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

    lastPulledId = chosen.id;

    // Map Rarity to Metallic Finish
    const finishMap = {
      Common: "brass",
      Uncommon: "nickel",
      Rare: "rose",
      Chase: "rainbow"
    };
    const finish = finishMap[chosen.rarity] || "brass";
    const serial = String(Math.floor(Math.random() * 499) + 1).padStart(3, "0");

    if (!state.unlockedIds.includes(chosen.id)) {
      state.unlockedIds.push(chosen.id);
      saveState();
    }

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

  // Slide-to-Rip Holographic Seal
  let ripping = false;
  let ripStartX = 0;
  let ripProgress = 0;
  let lastCrinkleStep = 0;

  tearStrip.addEventListener("pointerdown", (e) => {
    ripping = true;
    ripStartX = e.clientX;
    tearStrip.setPointerCapture(e.pointerId);
    getAudio();
  });

  tearStrip.addEventListener("pointermove", (e) => {
    if (!ripping) return;
    const maxTravel = tearStrip.clientWidth - 48;
    const dx = Math.max(0, Math.min(maxTravel, e.clientX - ripStartX));
    ripProgress = dx / maxTravel;

    tearHandle.style.transform = `translateX(${dx}px)`;
    tearFill.style.width = `${Math.round(ripProgress * 100)}%`;
    tearStrip.setAttribute("aria-valuenow", Math.round(ripProgress * 100));

    const step = Math.floor(ripProgress * 8);
    if (step > lastCrinkleStep) {
      lastCrinkleStep = step;
      playSfx("crinkle");
    }

    if (ripProgress >= 0.78) {
      ripping = false;
      completeBagRip();
    }
  });

  function resetRipSlider() {
    ripping = false;
    ripProgress = 0;
    lastCrinkleStep = 0;
    tearHandle.style.transform = "translateX(0px)";
    tearFill.style.width = "0%";
    pouchCap.classList.remove("ripped");
  }

  tearStrip.addEventListener("pointerup", () => {
    if (!ripping) return;
    if (ripProgress < 0.78) resetRipSlider();
  });

  tearStrip.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      completeBagRip();
    }
  });

  function spawnSparkles(cx, cy, count = 22) {
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

    specNumber.textContent = `#${strain.num} / ${window.PINNIES_ROSTER.length}`;
    const fMeta = FINISH_META[finish];
    specRarity.textContent = `${strain.rarity} • ${fMeta.label}`;
    specRarity.className = `spec-rarity ${fMeta.css}`;
    specName.textContent = strain.name;
    specTagline.textContent = strain.tagline;

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
    playSfx(art.sound || "chime");
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
    floatingPin.setPointerCapture(e.pointerId);
  });

  floatingPin.addEventListener("pointermove", (e) => {
    if (!pinDragging || !currentPull) return;
    const dist = Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y);

    if (!pinMoved && dist > 8) {
      pinMoved = true;
      // Pop Open Collector's Corkboard Overlay Automatically!
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
      // Quick click animates the pin
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

  // Render & Rearrange Pins on Corkboard
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
      el.title = `${strain.name} (#${strain.num}/60) — Click to animate or drag to move`;
      el.innerHTML = `
        <div class="mounted-pin-art">${art.renderFront(item.instanceId, item.finish)}</div>
        <button class="mounted-pin-remove" type="button" title="Remove from board">✕</button>
      `;

      // Remove button
      el.querySelector(".mounted-pin-remove").addEventListener("pointerdown", (ev) => {
        ev.stopPropagation();
      });
      el.querySelector(".mounted-pin-remove").addEventListener("click", (ev) => {
        ev.stopPropagation();
        state.mountedPins = state.mountedPins.filter((p) => p.instanceId !== item.instanceId);
        saveState();
        renderCorkboard();
      });

      // Drag to Rearrange or Click to Animate on Board
      let moving = false;
      let moved = false;
      let start = { x: 0, y: 0 };

      el.addEventListener("pointerdown", (ev) => {
        moving = true;
        moved = false;
        start = { x: ev.clientX, y: ev.clientY };
        el.setPointerCapture(ev.pointerId);
      });

      el.addEventListener("pointermove", (ev) => {
        if (!moving) return;
        if (!moved && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 5) {
          moved = true;
        }
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

  // Board & Checklist Modals
  document.getElementById("btnOpenBoard").addEventListener("click", () => {
    renderCorkboard();
    boardModal.classList.remove("hidden");
  });

  document.getElementById("btnCloseBoard").addEventListener("click", () => {
    boardModal.classList.add("hidden");
  });

  boardModal.addEventListener("click", (e) => {
    if (e.target === boardModal) boardModal.classList.add("hidden");
  });

  document.getElementById("btnOpenChecklist").addEventListener("click", () => {
    renderChecklist();
    checklistModal.classList.remove("hidden");
  });

  document.getElementById("btnCloseChecklist").addEventListener("click", () => {
    checklistModal.classList.add("hidden");
  });

  checklistModal.addEventListener("click", (e) => {
    if (e.target === checklistModal) checklistModal.classList.add("hidden");
  });

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
        const finishMap = { Common: "brass", Uncommon: "nickel", Rare: "rose", Chase: "rainbow" };
        thumbHtml = art.renderFront(`chk_${strain.id}`, finishMap[strain.rarity] || "brass");
      }

      const statusBadge = unlocked
        ? `<span class="check-badge">${strain.rarity}</span>`
        : art
          ? `<span class="check-badge upcoming">In Bags</span>`
          : `<span class="check-badge upcoming">Wave ${strain.wave}</span>`;

      card.innerHTML = `
        <div class="check-thumb">${thumbHtml}</div>
        <div class="check-num">#${strain.num} / 60</div>
        <div class="check-title">${strain.name}</div>
        ${statusBadge}
      `;
      checklistGrid.appendChild(card);
    });
  }

  // Initialize Counters on Boot
  updateCounters();
})();