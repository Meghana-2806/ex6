# Personal Portfolio Website

A responsive, professional personal portfolio built with **HTML5, CSS3, JavaScript, and Bootstrap 5** for the assignment.

## Sections included
- Responsive navigation: Home, About Me, Education, Skills, Projects, Contact
- Home hero section with name, profile-style visual, and professional introduction
- About Me section with personal introduction and career objective
- Education timeline using Bootstrap's responsive grid
- Skills section with progress bars and skill badges
- Three project-specific project previews (e-commerce storefront, order/admin dashboard, food ordering UI)
- Contact form with Name, Email, Subject, and Message fields plus JavaScript validation
- Responsive layouts for mobile, tablet, and desktop
- Light/dark theme toggle with saved preference
- Custom KM favicon

## How to run the website

### Option 1 — simplest
1. Extract `Personal_Portfolio_Website.zip`.
2. Open the extracted `Personal_Portfolio_Website` folder.
3. Double-click `index.html`.
4. The website opens in your browser.

### Option 2 — recommended in VS Code
1. Install/open Visual Studio Code.
2. Choose **File → Open Folder** and select `Personal_Portfolio_Website`.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html` and choose **Open with Live Server**.

No npm install, build step, or backend is required. Bootstrap, Bootstrap Icons, and Google Fonts are loaded from CDNs, so an internet connection improves the appearance. The core page and local CSS/JavaScript are included in this folder.

## Personalise before submission
Search `index.html` for the sample text and replace:
- `Kataru Meghana` with your name
- `meghana.24mic7069@vitapstudent.ac.in` with your email
- `Vellore Institute of Technology - AP`, `Your College Name`, and `Your School Name`
- The education dates, city, introduction, skills and skill levels
- Sample projects with your own projects, descriptions, screenshots, and links
- LinkedIn/GitHub/social profile URLs

The project cards use CSS-made illustrations so no extra image downloads are required. You can replace these with screenshots of your real projects if desired.

## Contact form note
The form validates all four fields in the browser (live, on blur and on submit). When valid, it opens the visitor's email app with the message pre-filled and addressed to you (`mailto:`), since no backend is used. To receive messages directly, connect a form service such as Formspree.

## Profile photo
Add your photo as `assets/profile.jpg` (square, at least 300×300 px). Until then a neutral placeholder is shown automatically.

## Extras
Dark/light theme (follows system preference), scroll progress bar, animated skill bars and counters, typed role text, back-to-top button, skip link, SEO/Open Graph tags and print styles.

## Folder structure
```text
Personal_Portfolio_Website/
├── index.html
├── README.md
├── assets/
│   └── favicon.svg
├── css/
│   └── style.css
└── js/
    └── script.js
```
