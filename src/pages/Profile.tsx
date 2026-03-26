import React, { useRef, useState } from "react";

type Tab = "profile" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  
  // Settings States
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap');

        :root {
          --bg: #0d1117;
          --panel: #161b22;
          --border: rgba(255, 255, 255, 0.1);
          --gold: #f0b429;
          --text: #e6edf3;
          --text-muted: #848d97;
          --accent: #238636;
        }

        .dashboard-container {
          display: flex;
          gap: 32px;
          padding: 24px;
          background: var(--bg);
          font-family: 'Inter', sans-serif;
          color: var(--text);
          min-height: 100vh;
        }

        /* Sub-navigation inside content */
        .sub-nav {
          width: 220px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 10px 16px;
          text-align: left;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.2s;
        }

        .tab-btn:hover { background: rgba(255,255,255,0.05); }
        .tab-btn.active {
          background: rgba(240, 180, 41, 0.1);
          color: var(--gold);
          font-weight: 600;
        }

        /* Content Area */
        .main-content { flex: 1; max-width: 850px; }

        .header-group { margin-bottom: 24px; }
        .header-group h1 { font-size: 24px; margin: 0 0 4px 0; }
        .header-group p { color: var(--text-muted); font-size: 14px; }

        .glass-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 24px;
          display: block;
        }

        /* Avatar Section */
        .avatar-section { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; }
        .avatar-box {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 700; overflow: hidden;
          background: #0d1117;
        }
        .avatar-box img { width: 100%; height: 100%; object-fit: cover; }

        /* Form Grid */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .full-row { grid-column: span 2; }

        .field { display: flex; flex-direction: column; gap: 8px; }
        .field label { font-size: 12px; font-weight: 600; color: var(--text-muted); }
        
        input, select, textarea {
          background: #0d1117;
          border: 1px solid var(--border);
          padding: 10px 14px;
          border-radius: 6px;
          color: var(--text);
          font-size: 14px;
        }

        input:focus { outline: none; border-color: var(--gold); }

        /* Modern Toggle */
        .setting-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 0; border-bottom: 1px solid var(--border);
        }
        .toggle {
          width: 40px; height: 20px; background: #30363d;
          border-radius: 20px; position: relative; cursor: pointer;
        }
        .toggle.active { background: var(--accent); }
        .toggle::after {
          content: ''; position: absolute; width: 16px; height: 16px;
          background: white; border-radius: 50%; top: 2px; left: 2px; transition: 0.2s;
        }
        .toggle.active::after { transform: translateX(20px); }

        .btn-save {
          background: var(--gold);
          color: #0d1117;
          border: none;
          padding: 10px 24px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 24px;
        }
        .btn-save:hover { opacity: 0.9; }
      `}</style>

      <div className="dashboard-container">
        {/* Sub Navigation (Middle Column) */}
        <nav className="sub-nav">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            ◈ Admin Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            ⬢ System Settings
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="header-group">
            <h1>{activeTab === 'profile' ? 'Profile' : 'Settings'}</h1>
            <p>Manage your account preferences and identity.</p>
          </div>

          <div className="glass-card">
            {activeTab === 'profile' ? (
              <>
                <span className="section-label">Identity Details</span>
                <div className="avatar-section">
                  <div className="avatar-box">
                    {profileImage ? <img src={profileImage} /> : "AD"}
                  </div>
                  <button className="tab-btn" style={{border: '1px solid var(--border)'}} onClick={() => fileInputRef.current?.click()}>
                    Update Photo
                  </button>
                  <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                    const f = e.target.files?.[0];
                    if(f) setProfileImage(URL.createObjectURL(f));
                  }} />
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Admin User" />
                  </div>
                  <div className="field">
                    <label>Display Handle</label>
                    {/* FIXED THE ERROR HERE: color is wrapped in quotes */}
                    <input type="text" defaultValue="admin.root" style={{fontFamily: 'JetBrains Mono', color: 'var(--gold)'}} />
                  </div>
                  <div className="field full-row">
                    <label>Internal Email</label>
                    <input type="email" defaultValue="admin@system.internal" />
                  </div>
                  <div className="field full-row">
                    <label>Short Bio</label>
                    <textarea rows={3} placeholder="System administrator for SmartGuide..." />
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="section-label">System Preferences</span>
                <div className="setting-row">
                  <div>
                    <div style={{fontWeight: 600}}>Push Notifications</div>
                    <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>Alerts for new device connections.</div>
                  </div>
                  <div className={`toggle ${notifications ? 'active' : ''}`} onClick={() => setNotifications(!notifications)} />
                </div>
                <div className="setting-row">
                  <div>
                    <div style={{fontWeight: 600}}>Two-Factor Auth</div>
                    <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>Extra security for admin login.</div>
                  </div>
                  <div className={`toggle ${twoFactor ? 'active' : ''}`} onClick={() => setTwoFactor(!twoFactor)} />
                </div>
                <div className="form-grid" style={{marginTop: '20px'}}>
                  <div className="field">
                    <label>Language</label>
                    <select><option>English</option><option>Tagalog</option></select>
                  </div>
                  <div className="field">
                    <label>Default View</label>
                    <select><option>Dashboard</option><option>Map View</option></select>
                  </div>
                </div>
              </>
            )}

            <button className="btn-save" onClick={handleSave}>
              {saved ? "Success ✓" : "Save Changes"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}