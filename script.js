// ===== DATE CHIP =====
(function () {
  const dateChip = document.getElementById('date-chip');
  if (dateChip) {
    const d = new Date();
    dateChip.textContent = d.toLocaleDateString('en-US', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
  }
})();

// ===== DASHBOARD INIT =====
document.addEventListener('DOMContentLoaded', function () {
  const content = document.getElementById('main-content');
  if (content) {
    buildBarChart();
    overviewHTML = content.innerHTML;
  }
});

// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('visible');
}
function closeSidebar() {
  const s = document.querySelector('.sidebar');
  const o = document.getElementById('sidebar-overlay');
  if (s) s.classList.remove('open');
  if (o) o.classList.remove('visible');
}

// ===== AUTH =====
function doLogin() {
  const btn = event && event.currentTarget;
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true; }
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 350);
}
function doSignup() {
  const btn = event && event.currentTarget;
  if (btn) { btn.textContent = 'Creating account…'; btn.disabled = true; }
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 350);
}

// ===== ROUTER =====
let overviewHTML = '';

const pageRenderers = {
  'Overview':       renderOverview,
  'Campaigns':      renderCampaigns,
  'Lead Funnel':    renderFunnel,
  'Regional Pulse': renderRegional,
  'Social Radar':   renderSocial,
  'Reports':        renderReports,
  'Settings':       renderSettings,
};

function setNav(el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  const label = el.textContent.trim().replace(/\s*\d+$/, '').trim().replace(/^\S+\s+/, '');
  document.getElementById('page-title').textContent = label;
  const content = document.getElementById('main-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(6px)';
  setTimeout(() => {
    (pageRenderers[label] || renderOverview)();
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 150);
  closeSidebar();
}

// ===========================
//  PAGE: OVERVIEW
// ===========================
function renderOverview() {
  const h = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const banner = `
    <div class="welcome-banner">
      <div class="welcome-text">
        <div class="welcome-greeting">${greeting}, Aytirik 👋</div>
        <div class="welcome-sub">Here's your marketing performance snapshot. All metrics are live for today.</div>
      </div>
      <div class="welcome-stats">
        <div class="welcome-stat"><div class="welcome-stat-val">2,847</div><div class="welcome-stat-lbl">Leads Today</div></div>
        <div class="welcome-stat-div"></div>
        <div class="welcome-stat"><div class="welcome-stat-val">312%</div><div class="welcome-stat-lbl">Blended ROI</div></div>
        <div class="welcome-stat-div"></div>
        <div class="welcome-stat"><div class="welcome-stat-val">4 Live</div><div class="welcome-stat-lbl">Campaigns</div></div>
        <div class="welcome-stat-div"></div>
        <div class="welcome-stat"><div class="welcome-stat-val">72%</div><div class="welcome-stat-lbl">Goal Progress</div></div>
      </div>
    </div>`;
  document.getElementById('main-content').innerHTML = banner + overviewHTML;
  buildBarChart();
}

// ===========================
//  PAGE: CAMPAIGNS
// ===========================
function renderCampaigns() {
  const campaigns = [
    { name:'MENA FX Awareness',    dates:'Apr 1 – Apr 30',  channel:'Meta Ads',     status:'live',   leads:1240, budgetUsed:12400, budgetTotal:18000, roi:'340%', ctr:'5.2%', cvr:'9.2%' },
    { name:'EU Retail Trader',     dates:'Mar 15 – Apr 15', channel:'Google Search',status:'live',   leads:892,  budgetUsed:9800,  budgetTotal:15000, roi:'285%', ctr:'4.8%', cvr:'7.8%' },
    { name:'GCC VIP Traders',      dates:'Apr 8 – Apr 28',  channel:'LinkedIn',     status:'live',   leads:318,  budgetUsed:6200,  budgetTotal:12000, roi:'415%', ctr:'3.1%', cvr:'11.4%'},
    { name:'SEA Crypto Crossover', dates:'Apr 5 – Apr 25',  channel:'TikTok',       status:'paused', leads:461,  budgetUsed:4200,  budgetTotal:8000,  roi:'198%', ctr:'6.7%', cvr:'5.4%' },
    { name:'LATAM Onboarding',     dates:'Starts Apr 14',   channel:'Email Drip',   status:'draft',  leads:null, budgetUsed:0,     budgetTotal:3500,  roi:'—',    ctr:'—',    cvr:'—'    },
    { name:'Q1 Brand Awareness',   dates:'Jan 1 – Mar 31',  channel:'Display',      status:'ended',  leads:3140, budgetUsed:22000, budgetTotal:22000, roi:'220%', ctr:'2.3%', cvr:'6.1%' },
    { name:'TR Forex Push',        dates:'Mar 20 – Apr 20', channel:'Google Search',status:'live',   leads:574,  budgetUsed:5800,  budgetTotal:9000,  roi:'298%', ctr:'5.5%', cvr:'8.9%' },
    { name:'AE Premium Clients',   dates:'Apr 10 – May 10', channel:'LinkedIn',     status:'live',   leads:209,  budgetUsed:3100,  budgetTotal:10000, roi:'380%', ctr:'2.9%', cvr:'12.1%'},
  ];

  const statusConfig = {
    live:   { label:'Live',   cls:'status-live' },
    paused: { label:'Paused', cls:'status-paused' },
    draft:  { label:'Draft',  cls:'status-draft' },
    ended:  { label:'Ended',  cls:'status-ended' },
  };
  const roiColor = r => r === '—' ? '' : parseInt(r) >= 300 ? 'color:var(--green-400);font-weight:700' : parseInt(r) >= 200 ? 'color:var(--yellow-400);font-weight:700' : '';
  const actionLabel = s => ({ live:'Edit', paused:'Resume', draft:'Launch', ended:'Report' }[s]);

  const totals = { live: campaigns.filter(c=>c.status==='live').length, budget: '$67.7K', roi: '312%', leads: campaigns.reduce((a,c)=>(c.leads||0)+a,0) };

  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Campaigns</h2><p>Manage and monitor all active marketing campaigns</p></div>
      <div style="display:flex;gap:10px;">
        <button class="btn-secondary" onclick="showToast('CSV exported successfully')">⬇ Export</button>
        <button class="btn-primary">＋ New Campaign</button>
      </div>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">📣</div><div class="stat-value">${campaigns.length}</div><div class="stat-label">Total campaigns</div><div class="stat-chip up">↑ 3 this month</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">✅</div><div class="stat-value">${totals.live}</div><div class="stat-label">Currently live</div><div class="stat-chip up">↑ 1 vs last week</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">💰</div><div class="stat-value">${totals.budget}</div><div class="stat-label">Total active budget</div><div class="stat-chip down">↓ $4.2K paused</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(139,92,246,.1);">📈</div><div class="stat-value">${totals.roi}</div><div class="stat-label">Avg. blended ROI</div><div class="stat-chip up">↑ 18.4%</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-header">
        <div class="table-title">All Campaigns</div>
        <select class="table-filter"><option>All Channels</option><option>Meta Ads</option><option>Google Search</option><option>TikTok</option><option>Email Drip</option><option>LinkedIn</option><option>Display</option></select>
        <select class="table-filter"><option>All Statuses</option><option>Live</option><option>Paused</option><option>Draft</option><option>Ended</option></select>
      </div>
      <table class="data-table">
        <thead><tr>
          <th>Campaign</th><th>Channel</th><th>Status</th>
          <th>Leads</th><th>Budget Used</th><th>ROI</th><th>CTR</th><th>CVR</th><th>Action</th>
        </tr></thead>
        <tbody>
          ${campaigns.map(c => {
            const sc = statusConfig[c.status];
            const pct = c.budgetTotal > 0 ? Math.round(c.budgetUsed / c.budgetTotal * 100) : 0;
            return `<tr>
              <td><strong>${c.name}</strong><br><span style="font-size:11px;color:var(--text-muted)">${c.dates}</span></td>
              <td style="color:var(--text-secondary)">${c.channel}</td>
              <td><span class="status-pill ${sc.cls}"><span class="status-dot"></span>${sc.label}</span></td>
              <td>${c.leads !== null ? c.leads.toLocaleString() : '—'}</td>
              <td>
                <div style="font-size:12px">$${c.budgetUsed.toLocaleString()} / $${c.budgetTotal.toLocaleString()}</div>
                <div class="budget-bar-track"><div class="budget-bar-fill" style="width:${pct}%"></div></div>
              </td>
              <td style="${roiColor(c.roi)}">${c.roi}</td>
              <td>${c.ctr}</td>
              <td>${c.cvr}</td>
              <td><button class="tbl-btn">${actionLabel(c.status)}</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

// ===========================
//  PAGE: LEAD FUNNEL
// ===========================
function renderFunnel() {
  const stages = [
    { icon:'👁',  name:'Impressions', count:'84,200', subPct:'100% — entry point',      color:'var(--cyan-400)',   rate:null,   rateLabel:null },
    { icon:'🖱',  name:'Clicks',      count:'4,210',  subPct:'5.0% click-through rate', color:'var(--blue-500)',  rate:'5.0%', rateLabel:'click-through rate' },
    { icon:'📋',  name:'Leads',       count:'2,847',  subPct:'67.6% of clicks',         color:'var(--purple-500)',rate:'67.6%',rateLabel:'click-to-lead rate' },
    { icon:'🎯',  name:'Qualified',   count:'1,764',  subPct:'62.0% qualify rate',      color:'var(--yellow-400)',rate:'62.0%',rateLabel:'qualify rate' },
    { icon:'💰',  name:'Conversions', count:'239',    subPct:'13.5% conversion rate',   color:'var(--green-400)', rate:'13.5%',rateLabel:'FTD conversion rate' },
  ];

  const dropOffs = [
    { label:'Impressions → Clicks', lost:'96.6%', color:'var(--red-400)', w:97 },
    { label:'Clicks → Leads',       lost:'32.4%', color:'var(--yellow-400)', w:32 },
    { label:'Leads → Qualified',    lost:'38.0%', color:'var(--orange-400)', w:38 },
    { label:'Qualified → FTD',      lost:'86.5%', color:'var(--purple-500)', w:87 },
  ];

  const byChannel = [
    ['Meta Ads',     '44', 88, 'var(--cyan-400)'],
    ['Google Search','31', 62, 'var(--blue-500)'],
    ['TikTok',       '15', 30, 'var(--purple-500)'],
    ['LinkedIn',     '10', 20, 'var(--green-400)'],
  ];

  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Lead Funnel</h2><p>Track lead progression from impression to first deposit</p></div>
      <button class="btn-primary" onclick="showToast('Funnel report exported')">⬇ Export Funnel</button>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">👁</div><div class="stat-value">84.2K</div><div class="stat-label">Impressions</div><div class="stat-chip up">↑ 12.4%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">🖱</div><div class="stat-value">4,210</div><div class="stat-label">Clicks</div><div class="stat-chip up">↑ 8.7%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(139,92,246,.1);">📋</div><div class="stat-value">2,847</div><div class="stat-label">Leads Captured</div><div class="stat-chip up">↑ 6.1%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">💰</div><div class="stat-value">239</div><div class="stat-label">Conversions (FTD)</div><div class="stat-chip up">↑ 9.2%</div></div>
    </div>
    <div class="funnel-wrap">
      <div class="funnel-col">
        ${stages.map((s, i) => `
          ${i > 0 ? `<div class="funnel-arrow"><span>↓</span><span class="funnel-arrow-rate">${s.rate} ${s.rateLabel}</span></div>` : ''}
          <div class="funnel-stage" style="border-color:${s.color}20">
            <div class="funnel-fill" style="background:${s.color};width:${100 - i*17}%"></div>
            <div class="funnel-icon">${s.icon}</div>
            <div class="funnel-info">
              <div class="funnel-name">${s.name}</div>
              <div class="funnel-count">${s.count}</div>
              <div class="funnel-pct">${s.subPct}</div>
            </div>
            <div style="font:800 20px/1 system-ui;color:${s.color};position:relative;z-index:1;">${Math.round(100 - i*17)}%</div>
          </div>`).join('')}
      </div>
      <div class="funnel-side">
        <div class="card">
          <div class="card-header"><span class="card-title">Top Drop-off Points</span></div>
          <div class="acq-list">
            ${dropOffs.map(d => `
              <div class="acq-item">
                <div class="acq-icon" style="background:${d.color}18;">⚠</div>
                <div style="flex:1;">
                  <div class="acq-name">${d.label}</div>
                  <div class="acq-bar-track"><div class="acq-bar-fill" style="width:${d.w}%;background:${d.color}"></div></div>
                </div>
                <div class="acq-pct" style="color:${d.color}">${d.lost}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Funnel by Channel</span></div>
          <div class="region-list">
            ${byChannel.map(([name, pct, w, color]) => `
              <div class="region-item">
                <div style="font:var(--t-label-lg);color:var(--text-primary)">${name}</div>
                <div><div class="region-bar-track"><div class="region-bar-fill" style="width:${w}%;background:${color}"></div></div></div>
                <div class="region-val">${pct}%</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Key Ratios</span></div>
          <div style="display:flex;flex-direction:column;gap:14px;">
            ${[['Click-Through Rate','5.0%','var(--cyan-400)'],['Click-to-Lead Rate','67.6%','var(--blue-500)'],['Lead Qualify Rate','62.0%','var(--purple-500)'],['FTD Conversion Rate','13.5%','var(--green-400)'],['Overall Impression→FTD','0.28%','var(--yellow-400)']].map(([lbl,val,color])=>`
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="font:var(--t-body-sm);color:var(--text-secondary)">${lbl}</span>
                <span style="font:700 15px/1 system-ui;color:${color}">${val}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ===========================
//  PAGE: REGIONAL PULSE
// ===========================
function renderRegional() {
  const regions = [
    { flag:'🇦🇪', name:'UAE',          leads:882,  roi:'415%', cvr:'11.4%', budget:'$14.2K', change:'↑ 8%',  dir:'up',   color:'var(--cyan-400)',   barW:88 },
    { flag:'🇸🇦', name:'Saudi Arabia', leads:644,  roi:'352%', cvr:'9.8%',  budget:'$10.8K', change:'↑ 5%',  dir:'up',   color:'var(--blue-500)',   barW:72 },
    { flag:'🇮🇷', name:'Iran',         leads:421,  roi:'278%', cvr:'7.2%',  budget:'$6.4K',  change:'↑ 14%', dir:'up',   color:'var(--green-400)', barW:56 },
    { flag:'🇹🇷', name:'Turkey',       leads:574,  roi:'298%', cvr:'8.9%',  budget:'$9.0K',  change:'↑ 11%', dir:'up',   color:'var(--purple-500)',barW:65 },
    { flag:'🇪🇬', name:'Egypt',        leads:312,  roi:'241%', cvr:'6.4%',  budget:'$5.2K',  change:'↓ 2%',  dir:'down', color:'var(--yellow-400)',barW:42 },
    { flag:'🇰🇼', name:'Kuwait',       leads:198,  roi:'332%', cvr:'10.1%', budget:'$3.8K',  change:'↑ 7%',  dir:'up',   color:'var(--orange-400)',barW:30 },
  ];

  const topByROI = [...regions].sort((a,b) => parseInt(b.roi) - parseInt(a.roi));

  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Regional Pulse</h2><p>MENA lead volume and performance by market</p></div>
      <button class="btn-primary" onclick="showToast('Regional report exported')">⬇ Export Regional</button>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">🌍</div><div class="stat-value">6</div><div class="stat-label">Active MENA markets</div><div class="stat-chip up">↑ 1 new this month</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">🏆</div><div class="stat-value">UAE</div><div class="stat-label">Top market by leads</div><div class="stat-chip up">↑ 8%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">📈</div><div class="stat-value">Iran</div><div class="stat-label">Fastest growing</div><div class="stat-chip up">↑ 14%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(248,113,113,.1);">⚠</div><div class="stat-value">Egypt</div><div class="stat-label">Needs attention</div><div class="stat-chip down">↓ 2%</div></div>
    </div>

    <div class="region-card-grid">
      ${regions.map(r => `
        <div class="region-card">
          <div class="region-card-accent" style="background:${r.color}"></div>
          <div class="region-card-top">
            <div>
              <div class="region-card-flag">${r.flag}</div>
              <div class="region-card-country">${r.name}</div>
            </div>
            <span class="region-card-badge ${r.dir}">${r.change}</span>
          </div>
          <div class="region-card-stats">
            <div><div class="rcs-val">${r.leads.toLocaleString()}</div><div class="rcs-lbl">Leads</div></div>
            <div><div class="rcs-val" style="color:var(--green-400)">${r.roi}</div><div class="rcs-lbl">ROI</div></div>
            <div><div class="rcs-val">${r.cvr}</div><div class="rcs-lbl">CVR</div></div>
            <div><div class="rcs-val">${r.budget}</div><div class="rcs-lbl">Budget</div></div>
          </div>
          <div class="region-card-bar-track">
            <div class="region-card-bar-fill" style="width:${r.barW}%;background:${r.color}"></div>
          </div>
        </div>`).join('')}
    </div>

    <div class="grid-row cols-2">
      <div class="card">
        <div class="card-header"><span class="card-title">ROI Ranking</span><div class="card-menu">⋯</div></div>
        <div class="region-list">
          ${topByROI.map(r => `
            <div class="region-item">
              <div style="display:flex;align-items:center;gap:7px">
                <span>${r.flag}</span>
                <span class="region-name">${r.name}</span>
              </div>
              <div><div class="region-bar-track"><div class="region-bar-fill" style="width:${Math.round(parseInt(r.roi)/4.5)}%;background:${r.color}"></div></div></div>
              <div class="region-val" style="color:var(--green-400);font-weight:700">${r.roi}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Lead Volume Share</span><div class="card-menu">⋯</div></div>
        <div class="region-list">
          ${regions.map(r => {
            const total = regions.reduce((s,x) => s + x.leads, 0);
            const pct = Math.round(r.leads / total * 100);
            return `
              <div class="region-item">
                <div style="display:flex;align-items:center;gap:7px">
                  <span>${r.flag}</span>
                  <span class="region-name">${r.name} <span class="region-change ${r.dir}">${r.change}</span></span>
                </div>
                <div><div class="region-bar-track"><div class="region-bar-fill" style="width:${pct * 2.5}%;background:${r.color}"></div></div></div>
                <div class="region-val">${r.leads.toLocaleString()}</div>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

// ===========================
//  PAGE: SOCIAL RADAR
// ===========================
function renderSocial() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Social Radar</h2><p>Channel performance across Instagram, Google Ads, Email, and Affiliate</p></div>
      <button class="btn-primary" onclick="showToast('Social report exported')">📊 Export Report</button>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(225,48,108,.1);">📸</div><div class="stat-value">198K</div><div class="stat-label">Instagram followers</div><div class="stat-chip up">↑ 5.7%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(66,133,244,.1);">🔍</div><div class="stat-value">84.2K</div><div class="stat-label">Google Ads impressions</div><div class="stat-chip up">↑ 12.4%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(251,191,36,.1);">📧</div><div class="stat-value">28.4%</div><div class="stat-label">Email open rate</div><div class="stat-chip up">↑ 2.1pp</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(139,92,246,.1);">🤝</div><div class="stat-value">124</div><div class="stat-label">Active affiliates</div><div class="stat-chip up">↑ 8 new</div></div>
    </div>

    <div class="channel-grid">

      <!-- Instagram -->
      <div class="channel-card">
        <div class="channel-hd">
          <div class="channel-logo" style="background:rgba(225,48,108,.12);color:#e1306c">📸</div>
          <div>
            <div class="channel-name">Instagram</div>
            <div class="channel-sub">@opofinance · Organic + Paid</div>
          </div>
          <span class="channel-chip up" style="margin-left:auto">↑ 5.7%</span>
        </div>
        <div class="channel-kpi-grid">
          <div><div class="ck-val">198K</div><div class="ck-lbl">Followers</div></div>
          <div><div class="ck-val">6.1%</div><div class="ck-lbl">Eng. Rate</div></div>
          <div><div class="ck-val">890K</div><div class="ck-lbl">Monthly Reach</div></div>
          <div><div class="ck-val">31</div><div class="ck-lbl">Posts This Month</div></div>
        </div>
        <div class="mini-bar-wrap" style="margin-top:14px">
          <div style="font:var(--t-label-sm);color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Content Performance</div>
          ${[['Reels','82%',82,'#e1306c'],['Carousels','64%',64,'#f56040'],['Stories','51%',51,'#fbad50'],['Static','34%',34,'#94a3b8']].map(([l,v,w,c])=>`
          <div class="mini-bar-row">
            <span class="mini-bar-label">${l}</span>
            <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${w}%;background:${c}"></div></div>
            <span class="mini-bar-val">${v}</span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Google Ads -->
      <div class="channel-card">
        <div class="channel-hd">
          <div class="channel-logo" style="background:rgba(66,133,244,.12);color:#4285f4">🔍</div>
          <div>
            <div class="channel-name">Google Ads</div>
            <div class="channel-sub">Search + Display campaigns</div>
          </div>
          <span class="channel-chip up" style="margin-left:auto">↑ 8.7%</span>
        </div>
        <div class="channel-kpi-grid">
          <div><div class="ck-val">84.2K</div><div class="ck-lbl">Impressions</div></div>
          <div><div class="ck-val">4,210</div><div class="ck-lbl">Clicks</div></div>
          <div><div class="ck-val">5.0%</div><div class="ck-lbl">CTR</div></div>
          <div><div class="ck-val">$2.40</div><div class="ck-lbl">Avg. CPC</div></div>
        </div>
        <div class="mini-bar-wrap" style="margin-top:14px">
          <div style="font:var(--t-label-sm);color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Campaign Breakdown</div>
          ${[['Search','72%',72,'#4285f4'],['Display','18%',18,'#34a853'],['YouTube','7%',7,'#ea4335'],['Shopping','3%',3,'#fbbc04']].map(([l,v,w,c])=>`
          <div class="mini-bar-row">
            <span class="mini-bar-label">${l}</span>
            <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${w}%;background:${c}"></div></div>
            <span class="mini-bar-val">${v}</span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Email -->
      <div class="channel-card">
        <div class="channel-hd">
          <div class="channel-logo" style="background:rgba(251,191,36,.12);color:#fbbf24">📧</div>
          <div>
            <div class="channel-name">Email Marketing</div>
            <div class="channel-sub">42,800 active subscribers</div>
          </div>
          <span class="channel-chip up" style="margin-left:auto">↑ 2.1pp</span>
        </div>
        <div class="channel-kpi-grid">
          <div><div class="ck-val">42.8K</div><div class="ck-lbl">Subscribers</div></div>
          <div><div class="ck-val">28.4%</div><div class="ck-lbl">Open Rate</div></div>
          <div><div class="ck-val">4.2%</div><div class="ck-lbl">Click Rate</div></div>
          <div><div class="ck-val">8</div><div class="ck-lbl">Campaigns Sent</div></div>
        </div>
        <div class="mini-bar-wrap" style="margin-top:14px">
          <div style="font:var(--t-label-sm);color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Sequence Performance</div>
          ${[['Welcome','58%',58,'#fbbf24'],['Nurture','42%',42,'#f59e0b'],['Re-engage','31%',31,'#d97706'],['Promo','24%',24,'#94a3b8']].map(([l,v,w,c])=>`
          <div class="mini-bar-row">
            <span class="mini-bar-label">${l}</span>
            <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${w}%;background:${c}"></div></div>
            <span class="mini-bar-val">${v}</span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Affiliate -->
      <div class="channel-card">
        <div class="channel-hd">
          <div class="channel-logo" style="background:rgba(139,92,246,.12);color:#8b5cf6">🤝</div>
          <div>
            <div class="channel-name">Affiliate Network</div>
            <div class="channel-sub">IB partners & referrals</div>
          </div>
          <span class="channel-chip up" style="margin-left:auto">↑ 9.3%</span>
        </div>
        <div class="channel-kpi-grid">
          <div><div class="ck-val">124</div><div class="ck-lbl">Active Partners</div></div>
          <div><div class="ck-val">1,240</div><div class="ck-lbl">Referred Leads</div></div>
          <div><div class="ck-val">$18.50</div><div class="ck-lbl">Avg. CPA</div></div>
          <div><div class="ck-val">$22.9K</div><div class="ck-lbl">Commission Paid</div></div>
        </div>
        <div class="mini-bar-wrap" style="margin-top:14px">
          <div style="font:var(--t-label-sm);color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Partner Tier Breakdown</div>
          ${[['Platinum','44%',44,'#8b5cf6'],['Gold','31%',31,'#fbbf24'],['Silver','18%',18,'#94a3b8'],['Bronze','7%',7,'#fb923c']].map(([l,v,w,c])=>`
          <div class="mini-bar-row">
            <span class="mini-bar-label">${l}</span>
            <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${w}%;background:${c}"></div></div>
            <span class="mini-bar-val">${v}</span>
          </div>`).join('')}
        </div>
      </div>

    </div>`;
}

// ===========================
//  PAGE: REPORTS
// ===========================
function renderReports() {
  const today     = new Date().toISOString().split('T')[0];
  const thirtyAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];

  const templates = [
    ['📈','Campaign Performance','Weekly/monthly ROI & lead summary'],
    ['🌍','Regional Breakdown','Leads & conversions by geography'],
    ['📡','Social Analytics','Cross-platform engagement report'],
    ['💰','Budget Utilisation','Spend vs. forecast analysis'],
    ['🎯','Funnel Analysis','Stage-by-stage drop-off report'],
    ['📋','Compliance Audit','Regulatory & data privacy report'],
    ['🤝','IB Partner Report','Introducing broker activity'],
    ['⚡','Custom Builder','Build your own report'],
  ];

  const recent = [
    ['📈','Weekly Campaign Summary — W14',  'Campaign Performance',  'Apr 10, 2026','PDF','2.4 MB'],
    ['🌍','MENA Regional Q1 2026 Review',   'Regional Breakdown',    'Apr 1, 2026', 'XLSX','1.8 MB'],
    ['📡','Social Radar — March 2026',       'Social Analytics',      'Apr 1, 2026', 'PDF','1.2 MB'],
    ['💰','Q1 Budget Utilisation Report',    'Budget Utilisation',    'Apr 1, 2026', 'XLSX','980 KB'],
    ['🎯','Lead Funnel Deep Dive — Mar',     'Funnel Analysis',       'Mar 31, 2026','PDF','3.1 MB'],
    ['📋','Compliance Audit Q1 2026',        'Compliance Audit',      'Mar 31, 2026','PDF','5.6 MB'],
  ];

  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Reports</h2><p>Download, schedule, and build custom performance reports</p></div>
      <button class="btn-primary" onclick="showToast('Custom report queued for generation')">＋ New Report</button>
    </div>

    <!-- Controls Bar with Date Range -->
    <div class="reports-controls">
      <div class="date-range-wrap">
        <span class="date-range-label">Date Range:</span>
        <input type="date" class="date-input" id="rpt-from" value="${thirtyAgo}">
        <span class="date-sep">→</span>
        <input type="date" class="date-input" id="rpt-to"   value="${today}">
      </div>
      <select class="table-filter"><option>All Report Types</option><option>Campaign</option><option>Regional</option><option>Social</option><option>Compliance</option></select>
      <select class="table-filter"><option>All Formats</option><option>PDF</option><option>XLSX</option><option>CSV</option></select>
      <button class="btn-primary" onclick="exportReports()">⬇ Export Selected</button>
      <button class="btn-secondary" onclick="scheduleReport()">🕐 Schedule</button>
    </div>

    <!-- Templates -->
    <div style="margin-bottom:8px;font:var(--t-label-md);color:var(--text-secondary);text-transform:uppercase;letter-spacing:.5px">Report Templates</div>
    <div class="template-grid">
      ${templates.map(([icon, name, desc]) => `
        <div class="template-card" onclick="showToast('Generating: ${name}…')">
          <div class="template-icon">${icon}</div>
          <div class="template-name">${name}</div>
          <div class="template-desc">${desc}</div>
        </div>`).join('')}
    </div>

    <!-- Recent Reports -->
    <div class="table-wrap">
      <div class="table-header">
        <div class="table-title">Recent Reports</div>
        <span style="font:var(--t-label-sm);color:var(--text-muted)">${recent.length} reports</span>
      </div>
      ${recent.map(([icon, name, type, date, fmt, size]) => `
        <div class="report-row">
          <div class="report-icon" style="background:rgba(0,212,232,.08)">${icon}</div>
          <div class="report-info">
            <div class="report-name">${name}</div>
            <div class="report-meta">${type} · Generated ${date} · ${fmt} · ${size}</div>
          </div>
          <span style="font:var(--t-label-sm);color:var(--text-muted);flex-shrink:0;margin-right:4px">${fmt}</span>
          <button class="report-dl" onclick="showToast('Downloading: ${name}')">⬇ Download</button>
        </div>`).join('')}
    </div>`;
}

function exportReports() {
  const from = document.getElementById('rpt-from').value;
  const to   = document.getElementById('rpt-to').value;
  showToast(`Exporting reports: ${from} → ${to}`);
}
function scheduleReport() {
  showToast('Report schedule saved — you\'ll receive it every Monday at 8:00 AM');
}

// ===========================
//  PAGE: SETTINGS
// ===========================
function renderSettings() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd"><div><h2>Settings</h2><p>Manage your account, notifications, and integrations</p></div></div>
    <div class="grid-row cols-3-1">
      <div>
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header"><span class="card-title">Profile</span></div>
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
            <div class="user-avatar" style="width:56px;height:56px;font-size:20px;">AY</div>
            <div>
              <div style="font:var(--t-title-lg);color:var(--text-primary);">Aytirik</div>
              <div style="font:var(--t-body-sm);color:var(--text-muted);">aytirik@opofinance.com</div>
              <div style="font:var(--t-label-sm);color:var(--cyan-400);margin-top:4px;">Marketing Lead</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
            <div><label style="font:var(--t-label-md);color:var(--text-secondary);display:block;margin-bottom:6px;">First name</label><input type="text" value="Aytirik" style="background:var(--input-bg);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:9px 12px;font:var(--t-body-md);color:var(--text-primary);width:100%;outline:none;"></div>
            <div><label style="font:var(--t-label-md);color:var(--text-secondary);display:block;margin-bottom:6px;">Last name</label><input type="text" placeholder="—" style="background:var(--input-bg);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:9px 12px;font:var(--t-body-md);color:var(--text-primary);width:100%;outline:none;"></div>
          </div>
          <div style="margin-bottom:16px;"><label style="font:var(--t-label-md);color:var(--text-secondary);display:block;margin-bottom:6px;">Email</label><input type="email" value="aytirik@opofinance.com" style="background:var(--input-bg);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:9px 12px;font:var(--t-body-md);color:var(--text-primary);width:100%;outline:none;"></div>
          <button class="btn-primary" style="font-size:13px;padding:9px 18px;" onclick="showToast('Profile saved successfully')">Save Changes</button>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Notifications</span></div>
          ${[['Lead threshold alerts','Get notified when daily leads exceed target',true],['Budget burn warnings','Alert at 80% and 95% budget utilisation',true],['Campaign status changes','Live, paused, ended notifications',true],['Weekly digest email','Summary every Monday 8:00 AM',false],['Regional anomaly alerts','Unusual spike or drop in any market',true]]
            .map(([title,desc,on]) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);">
                <div><div style="font:var(--t-label-lg);color:var(--text-primary);">${title}</div><div style="font:var(--t-label-sm);color:var(--text-muted);margin-top:2px;">${desc}</div></div>
                <div style="width:40px;height:22px;background:${on?'var(--cyan-400)':'var(--navy-600)'};border-radius:var(--r-full);cursor:pointer;position:relative;flex-shrink:0;transition:background .2s;" onclick="var t=this.firstChild;var isOn=this.style.background.includes('cyan');this.style.background=isOn?'var(--navy-600)':'var(--cyan-400)';t.style.transform=isOn?'translateX(0)':'translateX(18px)'">
                  <div style="width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;top:3px;left:3px;transition:transform .2s;transform:${on?'translateX(18px)':'translateX(0)'}"></div>
                </div>
              </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="card">
          <div class="card-header"><span class="card-title">Integrations</span></div>
          ${[['Google Analytics','Connected','var(--green-400)'],['Meta Ads Manager','Connected','var(--green-400)'],['HubSpot CRM','Connected','var(--green-400)'],['Slack','Not connected','var(--text-muted)'],['Zapier','Not connected','var(--text-muted)']]
            .map(([name,status,color]) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                <div style="font:var(--t-label-lg);color:var(--text-primary);">${name}</div>
                <div style="font:var(--t-label-sm);color:${color};font-weight:600;">${status}</div>
              </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Security</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <button class="btn-secondary" style="justify-content:flex-start;font-size:13px;" onclick="showToast('Password change email sent')">🔑 Change password</button>
            <button class="btn-secondary" style="justify-content:flex-start;font-size:13px;" onclick="showToast('2FA setup initiated')">📱 Enable 2FA</button>
            <button class="btn-secondary" style="justify-content:flex-start;font-size:13px;" onclick="showToast('API key management opened')">🔑 Manage API keys</button>
          </div>
        </div>
      </div>
    </div>`;
}

// ===========================
//  THEME TOGGLE
// ===========================
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
}

// ===========================
//  BAR CHART  (Overview)
// ===========================
function buildBarChart() {
  const data = [
    { day:'Mon', a:320, b:210, c:38 },
    { day:'Tue', a:480, b:310, c:52 },
    { day:'Wed', a:390, b:240, c:44 },
    { day:'Thu', a:560, b:380, c:68 },
    { day:'Fri', a:720, b:460, c:88 },
    { day:'Sat', a:410, b:270, c:46 },
    { day:'Sun', a:290, b:190, c:32 },
  ];
  const maxVal = Math.max(...data.map(d => d.a));
  const chartH = 120;
  const wrap = document.getElementById('bar-chart');
  if (!wrap) return;
  wrap.innerHTML = '';
  data.forEach(d => {
    const col = document.createElement('div');
    col.className = 'bar-col';
    const group = document.createElement('div');
    group.className = 'bar-group';
    const makeBar = (val, cls) => {
      const b = document.createElement('div');
      b.className = 'bar-seg ' + cls;
      b.style.height = Math.round((val / maxVal) * chartH) + 'px';
      b.addEventListener('mouseenter', e => showTip(e, `${d.day}: ${val.toLocaleString()}`));
      b.addEventListener('mouseleave', hideTip);
      return b;
    };
    group.appendChild(makeBar(d.a, 'seg-a'));
    group.appendChild(makeBar(d.b, 'seg-b'));
    group.appendChild(makeBar(d.c, 'seg-c'));
    const lbl = document.createElement('div');
    lbl.className = 'bar-x-label';
    lbl.textContent = d.day;
    col.appendChild(group);
    col.appendChild(lbl);
    wrap.appendChild(col);
  });
}

// ===========================
//  TOOLTIP
// ===========================
const tip = document.getElementById('tooltip');
function showTip(e, text) {
  if (!tip) return;
  tip.textContent = text;
  tip.classList.add('visible');
  moveTip(e);
}
function moveTip(e) {
  if (!tip) return;
  tip.style.left = (e.clientX + 12) + 'px';
  tip.style.top  = (e.clientY - 8) + 'px';
}
function hideTip() { if (tip) tip.classList.remove('visible'); }
document.addEventListener('mousemove', e => { if (tip && tip.classList.contains('visible')) moveTip(e); });

// ===========================
//  TOAST NOTIFICATION
// ===========================
let toastTimer;
function showToast(msg) {
  let t = document.getElementById('export-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'export-toast';
    t.className = 'export-toast';
    document.body.appendChild(t);
  }
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
