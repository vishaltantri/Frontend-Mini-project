# Frontend Lab — Frontend Design Mini Project

**Vishal C Tantri** · **24MIC0068**  
M.Tech (Integrated) Computer Science & Engineering · Third year · VIT Vellore  
Mini Project — Frontend Lab

**Frontend Lab** is a single, deployable static website that contains all **36 frontend-design lab exercises**, presented as a campus portal that ties them together. Instead of thirty disconnected files, each technique is presented as a working campus feature — a portfolio, travel club, hospital desk, library dashboard, store checkout, exam interface and so on. The shared design system keeps the pages consistent, while the exercises that ask for “inline CSS only”, “no CSS” or a table layout are deliberately kept in that form.

> HTML5 · CSS3 · vanilla JavaScript · Bootstrap 5.3 · **no backend, no build step**

---

## Run it

Open **`index.html`** in any modern browser. That is the whole setup.

For the best experience (and so the audio/video elements have a proper origin), serve the folder:

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works — Live Server in VS Code, `npx serve`, Nginx, GitHub Pages, Netlify, Cloudflare Pages or Vercel. There is nothing to install and nothing to compile.

### Deploy on Vercel

Import this repository, choose **Other** as the framework preset, leave the build command empty and set the output directory to `.` (the repository root). No other configuration is needed.

---

## What is inside

```
Frontend-Mini-project/
├─ index.html                  Portfolio home + Exercise 01
├─ exercises.html              Catalogue: all 36 exercises, grouped in 6 modules
├─ *.html                      One page per exercise (some pages share anchored demos)
├─ assets/
│  ├─ css/style.css            Shared design system
│  ├─ js/                      Shared navigation + per-page interaction scripts
│  ├─ img/                     Photos, logos, profile photograph, favicon
│  ├─ media/                   Spoken instructions + generated promo video
│  └─ vendor/                  Bootstrap 5.3 and Bootstrap Icons (self-hosted)
├─ LICENSE
└─ README.md
```

Everything is local: Bootstrap, fonts, icons, images, audio and video all live in `assets/`, so the site works offline and on any host.

---

## Exercise map

| # | Exercise | Page |
|---|----------|------|
| 1 | Personal portfolio | [index.html](index.html) |
| 2 | Travel bucket list (nested lists) | [travel-bucket-list.html](travel-bucket-list.html) |
| 3 | Science & technology text formatting | [science-technology.html](science-technology.html) |
| 4 | Employee profile with text tags | [employee-profile.html](employee-profile.html) |
| 5 | Travel destinations (div cards) | [travel-destinations.html](travel-destinations.html) |
| 6 | Employee ID card | [employee-id-card.html](employee-id-card.html) |
| 7 | CSE department div navigation | [cse-department.html](cse-department.html) |
| 8 | Table-based website layout | [table-layout.html](table-layout.html) |
| 9 | Employee Management sidebar | [employee-management.html](employee-management.html) |
| 10 | `layout1.html` — four blocks, no CSS | [layout1.html](layout1.html) |
| 11 | Hospital search header (inline CSS) | [hospital-header.html](hospital-header.html) |
| 12 | Hospital navigation header (inline CSS) | [hospital-header-nav.html](hospital-header-nav.html) |
| 13 | Smart Search Engine header | [smart-search.html](smart-search.html) |
| 14 | GameZone fixed header + banner | [gamezone.html](gamezone.html) |
| 15 | Company profile (inline CSS) | [company-profile.html](company-profile.html) |
| 16 | Library management 2 × 2 blocks | [library-management.html](library-management.html) |
| 17 | Hospital footer (internal CSS) | [hospital-footer.html](hospital-footer.html) |
| 18 | Student login + audio | [student-login.html](student-login.html) |
| 19 | Symposium registration + video/audio | [symposium-registration.html](symposium-registration.html) |
| 20 | Patient registration form | [patient-registration.html](patient-registration.html) |
| 21 | Checkout & payment | [checkout.html](checkout.html) |
| 22 | Employee registration + tabular output | [employee-registration.html](employee-registration.html) |
| 23 | Login validation (red errors + output div) | [student-login.html#validation](student-login.html#validation) |
| 24 | Student registration (regex) | [student-registration.html](student-registration.html) |
| 25 | Course registration | [course-registration.html](course-registration.html) |
| 26 | Colour-changing box | [mouse-events.html#color-box](mouse-events.html#color-box) |
| 27 | Interactive product card | [mouse-events.html#product-card](mouse-events.html#product-card) |
| 28 | Traffic signal | [mouse-events.html#traffic](mouse-events.html#traffic) |
| 29 | Weather panels | [mouse-events.html#weather](mouse-events.html#weather) |
| 30 | “Welcome to VIT!” button | [mouse-events.html#welcome](mouse-events.html#welcome) |
| 31 | Student search | [keyboard-events.html#student-search](keyboard-events.html#student-search) |
| 32 | ATM PIN entry | [keyboard-events.html#atm](keyboard-events.html#atm) |
| 33 | Product search | [keyboard-events.html#product-search](keyboard-events.html#product-search) |
| 34 | Online exam interface | [keyboard-events.html#exam](keyboard-events.html#exam) |
| 35 | Campus image viewer | [keyboard-events.html#campus](keyboard-events.html#campus) |
| 36 | Travel photo gallery | [keyboard-events.html#travel-gallery](keyboard-events.html#travel-gallery) |

The [exercise index](exercises.html) is the easiest way to demonstrate the project: it lists every exercise with a short description and a direct link.

---

## Things worth trying

- **Login** (`student-login.html`): submit empty, then wrong email, then a valid email with a short password to see each red inline error; a valid submission writes a session preview into the output div.
- **Symposium** (`symposium-registration.html`): native HTML5 validation with pattern rules; the promo video and welcome audio are generated locally.
- **Checkout** (`checkout.html`): change quantities and watch the total update; switch between card, UPI, net banking and cash on delivery.
- **Exam** (`keyboard-events.html#exam`): click the quiz card, choose an option, press <kbd>Enter</kbd>.
- **Galleries** (`keyboard-events.html#campus`): <kbd>←</kbd> / <kbd>→</kbd> browse and <kbd>Enter</kbd> selects; the travel gallery uses <kbd>N</kbd>, <kbd>P</kbd> and <kbd>Space</kbd>.

---

## Notes for submission

- The portfolio uses `assets/img/profile.jpg` — the photograph supplied for this submission.
- The academic table records M.Tech (Integrated) CSE at VIT Vellore, 8.82 CGPA and 92% in Class XII. **The phone number and school names are placeholders** — replace them in `index.html` if you want them shown.
- Portfolio links point to [github.com/vishaltantri](https://github.com/vishaltantri) and [linkedin.com/in/vishaltantri](https://www.linkedin.com/in/vishaltantri/); email is `vishal.ctantri2024@vitstudent.ac.in`.
- Demo content (employees, doctors, company, course seats) is illustrative, not real institutional data.
- Exercise pages that require a particular technique are labelled **“As specified”** in the catalogue: `layout1.html` has no CSS, the CSE page uses div-only markup, and the hospital/company/library pages use inline CSS only.

## Credits

- [Bootstrap 5.3](https://getbootstrap.com/) and [Bootstrap Icons](https://icons.getbootstrap.com/) — MIT, self-hosted.
- Photographs from [Unsplash](https://unsplash.com/) (free-to-use licence), stored locally.
- The employee, hospital, university and company logos are custom SVG illustrations; the portfolio photograph is the student’s own.
- Audio clips were generated with a text-to-speech service; the TechNova promo video was assembled from local images and text.

---

© 2026 Vishal C Tantri · 24MIC0068. Built for the Frontend Lab mini project.
