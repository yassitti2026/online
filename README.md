# Jessie Santos - Executive Resume & Portfolio Website

A clean, responsive, executive personal resume and portfolio website for **Jessie Santos** (Service Desk Shift Lead | Application Support | IT Operations), created directly from the professional resume.

## Features Included

- **Modern Executive Design**: Dark & Light mode toggle with persistent local storage and system theme auto-detection.
- **Complete Resume Fidelity**:
  - Full professional summary & contact details.
  - Key operational metrics (12+ years experience, 18 engineers managed, P1/P2 major incident triage, retail & enterprise coverage).
  - 12 Core Competencies badges.
  - Complete professional experience timeline (Indra Philippines CCEAP & JFC projects, Curo Teknika, Searchers and Staffers).
  - Selected technical achievements showcase (VB.NET applications, AWS RDS cloud integrations, Power BI dashboards, Power Automate workflows).
  - Categorized Technical Skills Matrix with interactive category tabs and instant live search.
  - Education (Bulacan State University - B.S. Information Technology) and IT internship.
- **Quick Actions & Utilities**:
  - One-click **Copy to Clipboard** with visual toast notifications for email and phone numbers.
  - Direct `mailto:` and `tel:` links.
  - Mobile-friendly responsive navigation drawer.
- **Print & PDF Export**:
  - Custom `@media print` stylesheet that transforms the page into an executive, clean black-and-white multi-page resume ready for printing or saving to PDF via `Ctrl+P` or the **Print / PDF** button.
- **Zero Build Dependencies**:
  - Written in pure, semantic HTML5, modern CSS3, and vanilla JavaScript.
  - Works immediately by double-clicking `index.html` or hosting on GitHub Pages, Netlify, Vercel, or custom web servers.

## How to View and Run

### 1. Direct Browser Opening
Simply double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox**.

### 2. Local HTTP Server (Optional)
If you have any local HTTP server installed (e.g. Python, Live Server extension in VS Code):
```bash
# Python 3
python -m http.server 8080
```
Then visit `http://localhost:8080`.

## Files Structure

```
yassitti_domain/
├── index.html       # Semantic HTML5 markup containing all resume content and structure
├── styles.css       # Complete responsive CSS, custom properties, dark/light themes, and @media print
├── app.js           # Interactive theme switcher, skill filter & search, copy toast, active scroll spy
└── README.md        # Documentation and deployment guide
```

## Customization

- **Profile Picture**: If you would like to use an actual photo instead of the stylized initials avatar (`JS`), place your image in this directory (e.g., `avatar.jpg`) and replace the `.avatar-circle` element in `index.html` with:
  ```html
  <img src="avatar.jpg" alt="Jessie Santos" class="avatar-photo" />
  ```
- **Social Links**: You can add your LinkedIn or GitHub links in the navigation bar or contact section.
