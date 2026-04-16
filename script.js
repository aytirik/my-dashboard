// ===== DATE =====
(function() {
  const dateChip = document.getElementById('date-chip');
  if (dateChip) {
    const d = new Date();
    const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    dateChip.textContent = d.toLocaleDateString('en-US', opts);
  }
})();

// ===== DASHBOARD INIT (runs only on dashboard.html) =====
document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('main-content');
  if (content) {
    buildBarChart();
    overviewHTML = content.innerHTML;
  }
});

// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('visible');
}
function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}

// ===== LOGIN =====
function doLogin() {
  const btn = event && event.currentTarget;
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true; }
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 350);
}

// ===== SIGN UP =====
function doSignup() {
  const btn = event && event.currentTarget;
  if (btn) { btn.textContent = 'Creating account…'; btn.disabled = true; }
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 350);
}

// ===== NAV / ROUTER =====
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
  const label = el.textContent.trim().replace(/\s*\d+$/, '').trim();
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

// ===== PAGE: OVERVIEW =====
function renderOverview() {
  document.getElementById('main-content').innerHTML = overviewHTML;
  buildBarChart();
}

// ===== PAGE: CAMPAIGNS =====
function renderCampaigns() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Campaigns</h2><p>Manage and monitor all active marketing campaigns</p></div>
      <div style="display:flex;gap:10px;">
        <button class="btn-secondary">⬇ Export</button>
        <button class="btn-primary">＋ New Campaign</button>
      </div>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">📣</div><div class="stat-value">12</div><div class="stat-label">Total campaigns</div><div class="stat-chip up">↑ 3 this month</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">✅</div><div class="stat-value">4</div><div class="stat-label">Currently live</div><div class="stat-chip up">↑ 1 vs last week</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">💰</div><div class="stat-value">$67.7K</div><div class="stat-label">Total active budget</div><div class="stat-chip down">↓ $4.2K paused</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(139,92,246,.1);">📈</div><div class="stat-value">312%</div><div class="stat-label">Avg. blended ROI</div><div class="stat-chip up">↑ 18.4%</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-header">
        <div class="table-title">All Campaigns</div>
        <select class="table-filter"><option>All Channels</option><option>Meta Ads</option><option>Google</option><option>TikTok</option><option>Email</option><option>LinkedIn</option></select>
        <select class="table-filter"><option>All Statuses</option><option>Live</option><option>Paused</option><option>Draft</option><option>Ended</option></select>
      </div>
      <table class="data-table">
        <thead><tr><th>Campaign</th><th>Channel</th><th>Status</th><th>Leads</th><th>Budget Used</th><th>ROI</th><th>CVR</th><th>Actions</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>MENA FX Awareness</strong><br><span style="font-size:11px;color:var(--text-muted)">Apr 1 – Apr 30</span></td>
            <td>Meta Ads</td><td><span class="status-pill status-live"><span class="status-dot"></span>Live</span></td><td>1,240</td>
            <td><div>$12,400 / $18,000</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:69%"></div></div></td>
            <td style="color:var(--green-400);font-weight:700;">340%</td><td>9.2%</td><td><button class="tbl-btn">Edit</button></td>
          </tr>
          <tr>
            <td><strong>EU Retail Trader</strong><br><span style="font-size:11px;color:var(--text-muted)">Mar 15 – Apr 15</span></td>
            <td>Google Search</td><td><span class="status-pill status-live"><span class="status-dot"></span>Live</span></td><td>892</td>
            <td><div>$9,800 / $15,000</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:65%"></div></div></td>
            <td style="color:var(--green-400);font-weight:700;">285%</td><td>7.8%</td><td><button class="tbl-btn">Edit</button></td>
          </tr>
          <tr>
            <td><strong>GCC VIP Traders</strong><br><span style="font-size:11px;color:var(--text-muted)">Apr 8 – Apr 28</span></td>
            <td>LinkedIn</td><td><span class="status-pill status-live"><span class="status-dot"></span>Live</span></td><td>318</td>
            <td><div>$6,200 / $12,000</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:52%"></div></div></td>
            <td style="color:var(--green-400);font-weight:700;">415%</td><td>11.4%</td><td><button class="tbl-btn">Edit</button></td>
          </tr>
          <tr>
            <td><strong>SEA Crypto Crossover</strong><br><span style="font-size:11px;color:var(--text-muted)">Apr 5 – Apr 25</span></td>
            <td>TikTok</td><td><span class="status-pill status-paused"><span class="status-dot"></span>Paused</span></td><td>461</td>
            <td><div>$4,200 / $8,000</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:52%"></div></div></td>
            <td style="color:var(--yellow-400);font-weight:700;">198%</td><td>5.4%</td><td><button class="tbl-btn">Resume</button></td>
          </tr>
          <tr>
            <td><strong>LATAM Onboarding</strong><br><span style="font-size:11px;color:var(--text-muted)">Starts Apr 14</span></td>
            <td>Email Drip</td><td><span class="status-pill status-draft"><span class="status-dot"></span>Draft</span></td><td>—</td>
            <td><div>$0 / $3,500</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:0%"></div></div></td>
            <td>—</td><td>—</td><td><button class="tbl-btn">Launch</button></td>
          </tr>
          <tr>
            <td><strong>Q1 Brand Awareness</strong><br><span style="font-size:11px;color:var(--text-muted)">Jan 1 – Mar 31</span></td>
            <td>Display</td><td><span class="status-pill status-ended"><span class="status-dot"></span>Ended</span></td><td>3,140</td>
            <td><div>$22,000 / $22,000</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:100%"></div></div></td>
            <td style="color:var(--green-400);font-weight:700;">220%</td><td>6.1%</td><td><button class="tbl-btn">Report</button></td>
          </tr>
        </tbody>
      </table>
    </div>`;
}

// ===== PAGE: LEAD FUNNEL =====
function renderFunnel() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Lead Funnel</h2><p>Track lead progression from impression to deposited client</p></div>
      <button class="btn-primary">⬇ Export Funnel</button>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">👁</div><div class="stat-value">84.2K</div><div class="stat-label">Impressions</div><div class="stat-chip up">↑ 12.4%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">📋</div><div class="stat-value">2,847</div><div class="stat-label">Leads captured</div><div class="stat-chip up">↑ 6.1%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(139,92,246,.1);">✅</div><div class="stat-value">1,764</div><div class="stat-label">Qualified leads</div><div class="stat-chip up">↑ 4.8%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">💰</div><div class="stat-value">239</div><div class="stat-label">Deposited (FTD)</div><div class="stat-chip up">↑ 9.2%</div></div>
    </div>
    <div class="funnel-wrap">
      <div class="funnel-col">
        <div class="funnel-stage">
          <div class="funnel-fill" style="background:var(--cyan-400);width:100%"></div>
          <div class="funnel-icon">👁</div>
          <div class="funnel-info"><div class="funnel-name">Impressions</div><div class="funnel-count">84,200</div><div class="funnel-pct">100% — entry point</div></div>
        </div>
        <div class="funnel-arrow"><span>↓</span><span class="funnel-arrow-rate">3.4% click-through rate</span></div>
        <div class="funnel-stage">
          <div class="funnel-fill" style="background:var(--blue-500);width:89%"></div>
          <div class="funnel-icon">📋</div>
          <div class="funnel-info"><div class="funnel-name">Form Submissions</div><div class="funnel-count">2,847</div><div class="funnel-pct">3.4% of impressions</div></div>
        </div>
        <div class="funnel-arrow"><span>↓</span><span class="funnel-arrow-rate">62% qualify rate</span></div>
        <div class="funnel-stage">
          <div class="funnel-fill" style="background:var(--purple-500);width:62%"></div>
          <div class="funnel-icon">🎯</div>
          <div class="funnel-info"><div class="funnel-name">Qualified Leads</div><div class="funnel-count">1,764</div><div class="funnel-pct">62% of submissions</div></div>
        </div>
        <div class="funnel-arrow"><span>↓</span><span class="funnel-arrow-rate">53% demo rate</span></div>
        <div class="funnel-stage">
          <div class="funnel-fill" style="background:var(--yellow-400);width:33%"></div>
          <div class="funnel-icon">🖥</div>
          <div class="funnel-info"><div class="funnel-name">Demo Account</div><div class="funnel-count">931</div><div class="funnel-pct">53% of qualified</div></div>
        </div>
        <div class="funnel-arrow"><span>↓</span><span class="funnel-arrow-rate">25.7% FTD rate</span></div>
        <div class="funnel-stage" style="border-color:var(--green-400);">
          <div class="funnel-fill" style="background:var(--green-400);width:14%"></div>
          <div class="funnel-icon">💰</div>
          <div class="funnel-info"><div class="funnel-name">First Deposit (FTD)</div><div class="funnel-count">239</div><div class="funnel-pct">25.7% of demo users</div></div>
        </div>
      </div>
      <div class="funnel-side">
        <div class="card">
          <div class="card-header"><span class="card-title">Top Drop-off Points</span></div>
          <div class="acq-list">
            <div class="acq-item">
              <div class="acq-icon" style="background:rgba(248,113,113,.1);">⚠</div>
              <div style="flex:1;"><div class="acq-name">Impressions → Leads</div><div class="acq-bar-track"><div class="acq-bar-fill" style="width:97%;background:var(--red-400)"></div></div></div>
              <div class="acq-pct" style="color:var(--red-400);">96.6%</div>
            </div>
            <div class="acq-item">
              <div class="acq-icon" style="background:rgba(251,191,36,.1);">📊</div>
              <div style="flex:1;"><div class="acq-name">Qualified → Demo</div><div class="acq-bar-track"><div class="acq-bar-fill" style="width:47%;background:var(--yellow-400)"></div></div></div>
              <div class="acq-pct" style="color:var(--yellow-400);">47%</div>
            </div>
            <div class="acq-item">
              <div class="acq-icon" style="background:rgba(0,212,232,.1);">💰</div>
              <div style="flex:1;"><div class="acq-name">Demo → Deposit</div><div class="acq-bar-track"><div class="acq-bar-fill" style="width:74%;background:var(--cyan-400)"></div></div></div>
              <div class="acq-pct">74% pass</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Funnel by Channel</span></div>
          <div class="region-list">
            ${[['Meta Ads','44',88,'var(--cyan-400)'],['Google Search','31',62,'var(--blue-500)'],['TikTok','15',30,'var(--purple-500)'],['LinkedIn','10',20,'var(--green-400)']]
              .map(([name,pct,w,color]) => `
                <div class="region-item">
                  <div style="font:var(--t-label-lg);color:var(--text-primary);">${name}</div>
                  <div><div class="region-bar-track"><div class="region-bar-fill" style="width:${w}%;background:${color}"></div></div></div>
                  <div class="region-val">${pct}%</div>
                </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ===== PAGE: REGIONAL PULSE =====
function renderRegional() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Regional Pulse</h2><p>Lead volume and performance by geography</p></div>
      <button class="btn-primary">⬇ Export Regional</button>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">🌍</div><div class="stat-value">24</div><div class="stat-label">Active markets</div><div class="stat-chip up">↑ 2 new this month</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">🏆</div><div class="stat-value">UAE</div><div class="stat-label">Top market by leads</div><div class="stat-chip up">↑ 8%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">📈</div><div class="stat-value">SG</div><div class="stat-label">Fastest growing</div><div class="stat-chip up">↑ 12%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(248,113,113,.1);">⚠</div><div class="stat-value">DE</div><div class="stat-label">Needs attention</div><div class="stat-chip down">↓ 2%</div></div>
    </div>
    <div class="grid-row cols-2">
      <div class="card">
        <div class="card-header"><span class="card-title">Top Regions — Lead Volume</span><div class="card-menu">⋯</div></div>
        <div class="region-list">
          ${[['🇦🇪','UAE',882,'↑8%','up',88,'var(--cyan-400)'],['🇸🇦','KSA',644,'↑5%','up',72,'var(--blue-500)'],['🇩🇪','Germany',487,'↓2%','down',55,'var(--purple-500)'],['🇸🇬','Singapore',374,'↑12%','up',42,'var(--green-400)'],['🇧🇷','Brazil',248,'↑3%','up',28,'var(--yellow-400)'],['🇬🇧','UK',212,'↓1%','down',22,'var(--orange-400)'],['🇮🇩','Indonesia',198,'↑7%','up',18,'var(--cyan-400)'],['🇵🇰','Pakistan',154,'↑4%','up',14,'var(--blue-400)']]
            .map(([flag,name,val,chg,dir,w,color]) => `
              <div class="region-item">
                <div style="display:flex;align-items:center;gap:7px;"><span>${flag}</span><span class="region-name">${name} <span class="region-change ${dir}">${chg}</span></span></div>
                <div><div class="region-bar-track"><div class="region-bar-fill" style="width:${w}%;background:${color}"></div></div></div>
                <div class="region-val">${val}</div>
              </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Regional ROI Comparison</span><div class="card-menu">⋯</div></div>
        <div class="region-list">
          ${[['🇦🇪','UAE','415%',100],['🇸🇬','Singapore','398%',96],['🇸🇦','KSA','352%',85],['🇬🇧','UK','310%',75],['🇧🇷','Brazil','278%',67],['🇩🇪','Germany','241%',58],['🇮🇩','Indonesia','224%',54],['🇵🇰','Pakistan','189%',46]]
            .map(([flag,name,roi,w]) => `
              <div class="region-item">
                <div style="display:flex;align-items:center;gap:7px;"><span>${flag}</span><span class="region-name">${name}</span></div>
                <div><div class="region-bar-track"><div class="region-bar-fill" style="width:${w}%;background:var(--cyan-400)"></div></div></div>
                <div class="region-val" style="color:var(--green-400);font-weight:700;">${roi}</div>
              </div>`).join('')}
        </div>
      </div>
    </div>`;
}

// ===== PAGE: SOCIAL RADAR =====
function renderSocial() {
  const platforms = [
    {icon:'📘',name:'Facebook',handle:'@OpoFinance',bg:'rgba(24,119,242,.12)',color:'#1877f2',followers:'284K',growth:'↑ 3.2%',dir:'up',eng:'4.8%',reach:'1.2M',posts:24},
    {icon:'📸',name:'Instagram',handle:'@opofinance',bg:'rgba(225,48,108,.12)',color:'#e1306c',followers:'198K',growth:'↑ 5.7%',dir:'up',eng:'6.1%',reach:'890K',posts:31},
    {icon:'🐦',name:'X / Twitter',handle:'@OpoFinance',bg:'rgba(29,161,242,.12)',color:'#1da1f2',followers:'142K',growth:'↑ 1.4%',dir:'up',eng:'2.9%',reach:'640K',posts:48},
    {icon:'💼',name:'LinkedIn',handle:'OpoFinance',bg:'rgba(10,102,194,.12)',color:'#0a66c2',followers:'88K',growth:'↑ 8.3%',dir:'up',eng:'5.4%',reach:'420K',posts:12},
    {icon:'🎵',name:'TikTok',handle:'@opofinance',bg:'rgba(105,201,208,.12)',color:'#69c9d0',followers:'312K',growth:'↑ 14.2%',dir:'up',eng:'8.7%',reach:'2.1M',posts:18},
    {icon:'▶',name:'YouTube',handle:'OpoFinance',bg:'rgba(255,0,0,.1)',color:'#ff0000',followers:'54K',growth:'↓ 0.3%',dir:'down',eng:'3.2%',reach:'280K',posts:6},
  ];
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Social Radar</h2><p>Cross-platform social performance overview</p></div>
      <button class="btn-primary">📅 Schedule Post</button>
    </div>
    <div class="grid-row cols-4">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,232,.1);">📱</div><div class="stat-value">1.08M</div><div class="stat-label">Total followers</div><div class="stat-chip up">↑ 5.8%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(59,130,246,.1);">👁</div><div class="stat-value">5.6M</div><div class="stat-label">Monthly reach</div><div class="stat-chip up">↑ 11.2%</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(52,211,153,.1);">💬</div><div class="stat-value">4.7%</div><div class="stat-label">Avg. engagement</div><div class="stat-chip up">↑ 0.4pp</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(139,92,246,.1);">📤</div><div class="stat-value">139</div><div class="stat-label">Posts this month</div><div class="stat-chip up">↑ 14</div></div>
    </div>
    <div class="platform-grid">
      ${platforms.map(p => `
        <div class="platform-card">
          <div class="platform-hd">
            <div class="platform-logo" style="background:${p.bg};color:${p.color};">${p.icon}</div>
            <div><div class="platform-name">${p.name}</div><div class="platform-handle">${p.handle}</div></div>
          </div>
          <div class="platform-metric"><div class="platform-val">${p.followers}</div><div class="platform-lbl">Followers</div></div>
          <div class="platform-chip ${p.dir}">${p.growth}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:14px;">
            <div><div style="font:700 14px/1 system-ui;color:var(--text-primary)">${p.eng}</div><div style="font:var(--t-label-sm);color:var(--text-muted);margin-top:2px">Eng. Rate</div></div>
            <div><div style="font:700 14px/1 system-ui;color:var(--text-primary)">${p.reach}</div><div style="font:var(--t-label-sm);color:var(--text-muted);margin-top:2px">Reach</div></div>
            <div><div style="font:700 14px/1 system-ui;color:var(--text-primary)">${p.posts}</div><div style="font:var(--t-label-sm);color:var(--text-muted);margin-top:2px">Posts</div></div>
          </div>
        </div>`).join('')}
    </div>`;
}

// ===== PAGE: REPORTS =====
function renderReports() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-hd">
      <div><h2>Reports</h2><p>Download, schedule, and build custom performance reports</p></div>
      <button class="btn-primary">＋ New Report</button>
    </div>
    <div style="margin-bottom:8px;font:var(--t-label-md);color:var(--text-secondary);text-transform:uppercase;letter-spacing:.5px;">Report Templates</div>
    <div class="template-grid">
      ${[['📈','Campaign Performance','Weekly/monthly ROI & lead summary'],['🌍','Regional Breakdown','Leads & conversions by geography'],['📡','Social Analytics','Cross-platform engagement report'],['💰','Budget Utilisation','Spend vs. forecast analysis'],['🎯','Funnel Analysis','Stage-by-stage drop-off report'],['📋','Compliance Audit','Regulatory & data privacy report'],['🤝','IB Partner Report','Introducing broker activity'],['⚡','Custom Builder','Build your own report']]
        .map(([icon,name,desc]) => `
          <div class="template-card">
            <div class="template-icon">${icon}</div>
            <div class="template-name">${name}</div>
            <div class="template-desc">${desc}</div>
          </div>`).join('')}
    </div>
    <div class="table-wrap">
      <div class="table-header">
        <div class="table-title">Recent Reports</div>
        <select class="table-filter"><option>All Types</option><option>Campaign</option><option>Regional</option><option>Social</option><option>Compliance</option></select>
      </div>
      ${[['📈','Weekly Campaign Summary — W14','Campaign Performance · Generated Apr 10, 2026','PDF, 2.4 MB'],['🌍','Regional Q1 2026 Review','Regional Breakdown · Generated Apr 1, 2026','XLSX, 1.8 MB'],['📡','Social Radar — March 2026','Social Analytics · Generated Apr 1, 2026','PDF, 1.2 MB'],['💰','Q1 Budget Utilisation Report','Budget Utilisation · Generated Apr 1, 2026','XLSX, 980 KB'],['🎯','Lead Funnel Deep Dive — Mar','Funnel Analysis · Generated Mar 31, 2026','PDF, 3.1 MB'],['📋','Compliance Audit Q1 2026','Compliance Audit · Generated Mar 31, 2026','PDF, 5.6 MB']]
        .map(([icon,name,meta,size]) => `
          <div class="report-row">
            <div class="report-icon" style="background:rgba(0,212,232,.08);">${icon}</div>
            <div class="report-info"><div class="report-name">${name}</div><div class="report-meta">${meta}</div></div>
            <div style="font:var(--t-label-sm);color:var(--text-muted);margin-right:8px;">${size}</div>
            <button class="report-dl">⬇ Download</button>
          </div>`).join('')}
    </div>`;
}

// ===== PAGE: SETTINGS =====
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
          <button class="btn-primary" style="font-size:13px;padding:9px 18px;">Save Changes</button>
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
            <button class="btn-secondary" style="justify-content:flex-start;font-size:13px;">🔑 Change password</button>
            <button class="btn-secondary" style="justify-content:flex-start;font-size:13px;">📱 Enable 2FA</button>
            <button class="btn-secondary" style="justify-content:flex-start;font-size:13px;">🔑 Manage API keys</button>
          </div>
        </div>
      </div>
    </div>`;
}

// ===== THEME =====
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
}

// ===== BAR CHART =====
function buildBarChart() {
  const data = [
    { day: 'Mon', a: 320, b: 210, c: 38 },
    { day: 'Tue', a: 480, b: 310, c: 52 },
    { day: 'Wed', a: 390, b: 240, c: 44 },
    { day: 'Thu', a: 560, b: 380, c: 68 },
    { day: 'Fri', a: 720, b: 460, c: 88 },
    { day: 'Sat', a: 410, b: 270, c: 46 },
    { day: 'Sun', a: 290, b: 190, c: 32 },
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
      b.addEventListener('mouseenter', (e) => showTip(e, `${d.day}: ${val}`));
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

// ===== TOOLTIP =====
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
  tip.style.top = (e.clientY - 8) + 'px';
}
function hideTip() { if (tip) tip.classList.remove('visible'); }
document.addEventListener('mousemove', (e) => { if (tip && tip.classList.contains('visible')) moveTip(e); });
