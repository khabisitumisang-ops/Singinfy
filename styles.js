const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');`;

export const css = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; color: #f0ede8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  :root {
    --gold: #c9a84c;
    --gold-dim: #7a6129;
    --gold-pale: #f5e9cc;
    --dark: #0a0a0a;
    --dark2: #111111;
    --dark3: #1a1a1a;
    --dark4: #242424;
    --border: rgba(201,168,76,0.18);
    --border-bright: rgba(201,168,76,0.45);
    --text: #f0ede8;
    --text-dim: #8a8070;
    --text-mid: #c2b99a;
    --bebas: 'Bebas Neue', sans-serif;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark2); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 64px;
    background: rgba(10,10,10,0.85); backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
  }
  .nav-logo { font-family: var(--bebas); font-size: 28px; letter-spacing: 2px; color: var(--gold); cursor: pointer; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-links a { color: var(--text-dim); font-size: 14px; font-weight: 300; text-decoration: none; cursor: pointer; transition: color 0.2s; }
  .nav-links a:hover { color: var(--text); }
  .nav-cta { background: var(--gold); color: #000; font-size: 13px; font-weight: 500; padding: 8px 20px; border-radius: 2px; border: none; cursor: pointer; letter-spacing: 0.5px; transition: opacity 0.2s; }
  .nav-cta:hover { opacity: 0.85; }

  /* Buttons */
  .btn-gold { background: var(--gold); color: #000; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; padding: 12px 28px; border-radius: 2px; border: none; cursor: pointer; letter-spacing: 0.5px; transition: opacity 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-gold:hover { opacity: 0.85; }
  .btn-outline { background: transparent; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; padding: 12px 28px; border-radius: 2px; border: 0.5px solid var(--border-bright); cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  /* ─── LANDING ─── */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 6rem 2rem 4rem; position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 80%);
  }
  .hero-label { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); font-weight: 400; margin-bottom: 1.5rem; position: relative; z-index: 1; }
  .hero-h1 { font-family: var(--bebas); font-size: clamp(72px, 12vw, 140px); line-height: 0.9; letter-spacing: 2px; color: var(--text); position: relative; z-index: 1; }
  .hero-h1 span { color: var(--gold); }
  .hero-sub { font-size: 18px; font-weight: 300; color: var(--text-mid); max-width: 540px; line-height: 1.7; margin: 2rem auto 2.5rem; position: relative; z-index: 1; }
  .hero-actions { display: flex; gap: 1rem; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }
  .hero-social-proof { margin-top: 4rem; font-size: 12px; color: var(--text-dim); letter-spacing: 1px; position: relative; z-index: 1; }
  .hero-avatars { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 0.5rem; }
  .avatar-dot { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--dark); margin-left: -8px; background: var(--dark3); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: var(--text-mid); }

  .section { padding: 6rem 2rem; }
  .section-label { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); font-weight: 400; margin-bottom: 0.75rem; }
  .section-h2 { font-family: var(--bebas); font-size: clamp(40px, 5vw, 64px); letter-spacing: 1px; line-height: 1; margin-bottom: 1rem; }
  .section-sub { font-size: 16px; font-weight: 300; color: var(--text-mid); max-width: 480px; line-height: 1.7; }
  .container { max-width: 1100px; margin: 0 auto; }

  /* How it works */
  .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5px; background: var(--border); border: 0.5px solid var(--border); margin-top: 3rem; }
  .step { background: var(--dark2); padding: 2.5rem 2rem; }
  .step-num { font-family: var(--bebas); font-size: 56px; color: var(--gold-dim); line-height: 1; margin-bottom: 1rem; }
  .step-title { font-size: 16px; font-weight: 500; margin-bottom: 0.5rem; }
  .step-desc { font-size: 14px; font-weight: 300; color: var(--text-mid); line-height: 1.6; }

  /* Features */
  .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: var(--border); border: 0.5px solid var(--border); margin-top: 3rem; }
  .feature { background: var(--dark2); padding: 2rem; transition: background 0.2s; }
  .feature:hover { background: var(--dark3); }
  .feature-icon { width: 40px; height: 40px; border: 0.5px solid var(--border-bright); display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 1.25rem; color: var(--gold); }
  .feature-title { font-size: 15px; font-weight: 500; margin-bottom: 0.5rem; }
  .feature-desc { font-size: 13px; font-weight: 300; color: var(--text-mid); line-height: 1.6; }

  /* Demo strip */
  .demo-strip { background: var(--dark2); border-top: 0.5px solid var(--border); border-bottom: 0.5px solid var(--border); padding: 2rem; display: flex; align-items: center; gap: 1.5rem; overflow: hidden; }
  .demo-waveform { flex: 1; height: 48px; position: relative; }

  /* Pricing */
  .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1px; background: var(--border); border: 0.5px solid var(--border); margin-top: 3rem; }
  .plan { background: var(--dark2); padding: 2.5rem 2rem; position: relative; }
  .plan.featured { background: var(--dark3); border: 0.5px solid var(--gold-dim); }
  .plan-badge { position: absolute; top: -1px; left: 2rem; background: var(--gold); color: #000; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; font-weight: 500; }
  .plan-name { font-family: var(--bebas); font-size: 32px; letter-spacing: 1px; margin-bottom: 0.25rem; }
  .plan-price { font-family: var(--bebas); font-size: 56px; line-height: 1; color: var(--gold); }
  .plan-price sup { font-size: 22px; vertical-align: super; color: var(--text-mid); }
  .plan-price span { font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text-dim); font-weight: 300; }
  .plan-divider { border: none; border-top: 0.5px solid var(--border); margin: 1.5rem 0; }
  .plan-feature { font-size: 13px; font-weight: 300; color: var(--text-mid); padding: 0.4rem 0; display: flex; align-items: center; gap: 8px; }
  .plan-feature.yes { color: var(--text); }
  .plan-feature .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .plan-feature .cross { width: 4px; height: 4px; border-radius: 50%; background: var(--dark4); flex-shrink: 0; }
  .plan-btn { width: 100%; margin-top: 1.5rem; }

  /* Footer */
  footer { border-top: 0.5px solid var(--border); padding: 3rem 2rem; text-align: center; }
  .footer-logo { font-family: var(--bebas); font-size: 36px; letter-spacing: 2px; color: var(--gold); margin-bottom: 0.5rem; }
  .footer-sub { font-size: 13px; font-weight: 300; color: var(--text-dim); }

  /* ─── DASHBOARD ─── */
  .app-shell { display: flex; min-height: 100vh; padding-top: 64px; }
  .sidebar { width: 220px; flex-shrink: 0; border-right: 0.5px solid var(--border); padding: 2rem 0; position: sticky; top: 64px; height: calc(100vh - 64px); overflow-y: auto; }
  .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 10px 1.5rem; font-size: 13px; font-weight: 400; color: var(--text-dim); cursor: pointer; transition: all 0.15s; border-left: 2px solid transparent; }
  .sidebar-item:hover { color: var(--text); background: rgba(255,255,255,0.02); }
  .sidebar-item.active { color: var(--gold); border-left-color: var(--gold); background: rgba(201,168,76,0.04); }
  .sidebar-section { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim); padding: 1.5rem 1.5rem 0.5rem; opacity: 0.5; }
  .main-content { flex: 1; padding: 2.5rem; overflow-y: auto; }

  /* Upload zones */
  .upload-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px; background: var(--border); border: 0.5px solid var(--border); margin-bottom: 2rem; }
  .upload-zone { background: var(--dark2); padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; cursor: pointer; transition: background 0.15s; min-height: 160px; text-align: center; border: 1.5px dashed transparent; }
  .upload-zone:hover, .upload-zone.drag { background: var(--dark3); border-color: var(--border-bright); }
  .upload-zone.done { background: rgba(201,168,76,0.04); border-color: var(--gold-dim); }
  .upload-icon { font-size: 28px; color: var(--text-dim); }
  .upload-label { font-size: 14px; font-weight: 400; color: var(--text-mid); }
  .upload-hint { font-size: 12px; font-weight: 300; color: var(--text-dim); }
  .upload-file-name { font-size: 13px; font-weight: 500; color: var(--gold); }
  .upload-input { display: none; }

  /* Generate config */
  .config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px; background: var(--border); border: 0.5px solid var(--border); margin-bottom: 2rem; }
  .config-cell { background: var(--dark2); padding: 1.5rem; }
  .config-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.75rem; }
  .config-select { width: 100%; background: var(--dark3); color: var(--text); border: 0.5px solid var(--border); padding: 10px 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; border-radius: 2px; appearance: none; cursor: pointer; }
  .config-select:focus { outline: none; border-color: var(--gold-dim); }
  .style-textarea { width: 100%; background: var(--dark3); color: var(--text); border: 0.5px solid var(--border); padding: 10px 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; border-radius: 2px; resize: none; height: 72px; }
  .style-textarea:focus { outline: none; border-color: var(--gold-dim); }
  .style-textarea::placeholder { color: var(--text-dim); }

  /* Job type toggle */
  .toggle-row { display: flex; gap: 1px; background: var(--border); border: 0.5px solid var(--border); margin-bottom: 2rem; }
  .toggle-opt { flex: 1; padding: 12px; text-align: center; font-size: 13px; font-weight: 400; color: var(--text-dim); cursor: pointer; background: var(--dark2); transition: all 0.15s; }
  .toggle-opt.active { background: var(--dark3); color: var(--gold); }
  .toggle-opt small { display: block; font-size: 11px; color: var(--text-dim); margin-top: 2px; font-weight: 300; }
  .toggle-opt.active small { color: var(--gold-dim); }

  /* Generate button row */
  .generate-row { display: flex; align-items: center; gap: 1rem; }
  .credits-pill { background: var(--dark3); border: 0.5px solid var(--border); padding: 6px 14px; font-size: 13px; color: var(--text-mid); border-radius: 2px; display: flex; align-items: center; gap: 6px; }
  .credits-pill strong { color: var(--gold); }

  /* Progress */
  .progress-box { background: var(--dark2); border: 0.5px solid var(--border); padding: 2rem; margin-top: 2rem; }
  .progress-title { font-family: var(--bebas); font-size: 22px; letter-spacing: 1px; margin-bottom: 0.25rem; }
  .progress-status { font-size: 13px; font-weight: 300; color: var(--text-mid); margin-bottom: 1.25rem; }
  .progress-bar-bg { height: 3px; background: var(--dark4); border-radius: 2px; overflow: hidden; }
  .progress-bar-fill { height: 100%; background: var(--gold); border-radius: 2px; transition: width 0.5s ease; }
  .progress-steps { display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }
  .pstep { font-size: 11px; padding: 4px 10px; border: 0.5px solid var(--border); color: var(--text-dim); }
  .pstep.done { border-color: var(--gold-dim); color: var(--gold); }
  .pstep.active { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.07); }

  /* Tracks list */
  .tracks-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 0.5px solid var(--border); }
  .track-row { background: var(--dark2); padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1.5rem; cursor: pointer; transition: background 0.15s; }
  .track-row:hover { background: var(--dark3); }
  .track-row.active { background: var(--dark3); border-left: 2px solid var(--gold); }
  .track-thumb { width: 44px; height: 44px; background: var(--dark4); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; color: var(--text-dim); }
  .track-info { flex: 1; min-width: 0; }
  .track-name { font-size: 14px; font-weight: 500; }
  .track-meta { font-size: 12px; font-weight: 300; color: var(--text-dim); margin-top: 2px; }
  .track-badge { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 2px 8px; border: 0.5px solid; }
  .track-badge.preview { border-color: var(--gold-dim); color: var(--gold-dim); }
  .track-badge.full { border-color: rgba(255,255,255,0.2); color: var(--text-mid); }
  .track-duration { font-size: 12px; color: var(--text-dim); font-weight: 300; }

  /* ─── PLAYER ─── */
  .player-page { padding: 3rem 2rem; max-width: 760px; margin: 0 auto; }
  .player-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-dim); cursor: pointer; margin-bottom: 2rem; transition: color 0.15s; }
  .player-back:hover { color: var(--text); }
  .player-card { background: var(--dark2); border: 0.5px solid var(--border); padding: 2.5rem; }
  .player-header { display: flex; align-items: flex-start; gap: 2rem; margin-bottom: 2rem; }
  .player-art { width: 120px; height: 120px; background: var(--dark3); display: flex; align-items: center; justify-content: center; font-size: 40px; flex-shrink: 0; position: relative; }
  .player-art-badge { position: absolute; bottom: -1px; right: -1px; background: var(--gold); color: #000; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; padding: 3px 6px; font-weight: 500; }
  .player-title { font-family: var(--bebas); font-size: 40px; letter-spacing: 1px; line-height: 1; margin-bottom: 0.5rem; }
  .player-by { font-size: 13px; font-weight: 300; color: var(--text-dim); margin-bottom: 1rem; }
  .player-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .player-tag { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--text-dim); border: 0.5px solid var(--border); padding: 3px 8px; }
  .waveform-container { height: 72px; position: relative; margin: 1.5rem 0; cursor: pointer; }
  .waveform-playhead { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--gold); pointer-events: none; }
  .player-controls { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; }
  .ctrl-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 20px; transition: color 0.15s; padding: 0; display: flex; }
  .ctrl-btn:hover { color: var(--text); }
  .play-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--gold); border: none; color: #000; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.15s; flex-shrink: 0; }
  .play-btn:hover { opacity: 0.85; }
  .time-display { font-size: 12px; font-weight: 300; color: var(--text-dim); margin-left: auto; letter-spacing: 0.5px; }
  .volume-row { display: flex; align-items: center; gap: 10px; font-size: 16px; color: var(--text-dim); margin-bottom: 2rem; }
  .volume-slider { -webkit-appearance: none; flex: 1; max-width: 120px; height: 2px; background: var(--dark4); border-radius: 2px; outline: none; }
  .volume-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: var(--gold); cursor: pointer; }
  .action-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  /* Lyrics panel */
  .lyrics-panel { background: var(--dark); border: 0.5px solid var(--border); padding: 2rem; margin-top: 1.5px; }
  .lyrics-title { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 1.25rem; }
  .lyrics-text { font-size: 15px; font-weight: 300; line-height: 2; color: var(--text-mid); white-space: pre-wrap; }
  .lyrics-text em { color: var(--gold); font-style: normal; font-weight: 400; }

  /* Paywall overlay */
  .paywall-overlay { background: var(--dark2); border: 0.5px solid var(--gold-dim); padding: 2rem; text-align: center; margin-top: 1.5px; }
  .paywall-icon { font-size: 32px; color: var(--gold); margin-bottom: 1rem; }
  .paywall-title { font-family: var(--bebas); font-size: 28px; letter-spacing: 1px; margin-bottom: 0.5rem; }
  .paywall-sub { font-size: 14px; font-weight: 300; color: var(--text-mid); margin-bottom: 1.5rem; line-height: 1.6; }
  .paywall-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

  /* Stats row */
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1px; background: var(--border); border: 0.5px solid var(--border); margin-bottom: 2.5rem; }
  .stat-cell { background: var(--dark2); padding: 1.25rem 1.5rem; }
  .stat-val { font-family: var(--bebas); font-size: 36px; color: var(--gold); line-height: 1; }
  .stat-lbl { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); margin-top: 4px; }

  /* Page header */
  .page-header { margin-bottom: 2rem; }
  .page-title { font-family: var(--bebas); font-size: 40px; letter-spacing: 1px; }
  .page-sub { font-size: 14px; font-weight: 300; color: var(--text-mid); margin-top: 4px; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .pulsing { animation: pulse 1.5s infinite; }
  @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .slide-up { animation: slideUp 0.4s ease forwards; }
`;
