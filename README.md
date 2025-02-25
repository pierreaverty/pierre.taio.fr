# Pierre Averty Portfolio Website

A personal portfolio website showcasing my research interests, projects, education, and GitHub activity. This minimalist, scholarly-themed site is designed to highlight my work in AI research and computer science.

## Features

- Responsive design with a scholarly aesthetic theme
- GitHub integration showing repositories, languages, contributions, and activity
- Project showcase with automatic importing from GitHub
- Research interests and educational background
- Publication listing

## Technologies Used

- HTML5, CSS3, JavaScript (vanilla)
- GitHub API for repository data
- Custom SVG-based GitHub contribution graph
- Responsive design for mobile and desktop viewing
- Font Awesome for icons

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/pierreaverty/portfolio.git
   ```

2. No build steps required - this is a static website
   - Simply serve the files using your preferred web server

3. Customize the website by modifying:
   - `index.html` - Main content and structure
   - `projects.html` - Projects page with GitHub stats
   - `assets/css/` - Styling files
   - `assets/js/` - JavaScript functionality

4. Update the GitHub username in the JavaScript files:
   - Open `assets/js/github-projects.js`
   - Open `assets/js/github-stats.js`
   - Change the `username` variable to your GitHub username

## Structure

- `index.html` - Main portfolio page
- `projects.html` - Detailed projects page with GitHub stats
- `assets/css/` - CSS files
  - `style.css` - Main styles
  - `projects.css` - Project page specific styles
- `assets/js/` - JavaScript files
  - `github-projects.js` - GitHub projects integration
  - `github-stats.js` - GitHub statistics integration
  - `projects-page.js` - Projects page functionality

## TODO

- [ ] Implement GitHub GraphQL API integration for real contribution data
  - Currently using simulated contribution data with fixed random seed
  - When migrating to VPS, add server-side token storage and API communication

- [ ] Add project filtering capabilities on the projects page

- [ ] Implement dark/light theme toggle

- [ ] Add a blog section for research articles and notes

- [ ] Create a contact form with server-side processing

## Browser Support

The website is optimized for modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

© 2025 Pierre Averty. All rights reserved.
