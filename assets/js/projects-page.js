/**
 * Projects Page Script
 * This script handles the display of all GitHub repositories on the projects page
 */

document.addEventListener('DOMContentLoaded', function() {
    const username = 'pierreaverty'; // Your GitHub username
    const projectsContainer = document.getElementById('all-projects-container');
    
    // Define the specific projects to show on the main page in order of priority
    const priorityProjects = [
        'OWLv2-Tunning',
        'DSIFT_descriptor_for_obj', // Using partial name due to truncation
        'TER_project'
    ];
    
    // Try to get projects from localStorage (set by the main page)
    let allProjects = [];
    try {
        const storedProjects = localStorage.getItem('allProjects');
        if (storedProjects) {
            allProjects = JSON.parse(storedProjects);
            displayProjects(allProjects);
        } else {
            // If no projects in localStorage, fetch them
            fetchAllProjects();
        }
    } catch (e) {
        console.error('Error retrieving projects from localStorage:', e);
        fetchAllProjects();
    }
    
    // Function to fetch all projects
    async function fetchAllProjects() {
        try {
            // Show loading state
            if (projectsContainer) {
                projectsContainer.innerHTML = '<div class="loading-projects">Loading projects from GitHub...</div>';
            }
            
            // Get all repositories
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
            let allRepos = await response.json();
            
            // Filter out archived and forked repos
            allRepos = allRepos.filter(repo => !(repo.archived || repo.fork));
            
            // Mark priority projects
            allRepos.forEach(repo => {
                const isPinned = priorityProjects.some(priorityName => 
                    repo.name === priorityName || repo.name.startsWith(priorityName)
                );
                repo.isPinned = isPinned;
            });
            
            // Display all repositories
            displayProjects(allRepos);
            
        } catch (error) {
            console.error('Error fetching repositories:', error);
            if (projectsContainer) {
                projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
            }
        }
    }
    
    // Function to display projects
    function displayProjects(projects) {
        if (!projectsContainer) return;
        
        // Sort projects: priority first, then by update date
        const sortedProjects = [...projects].sort((a, b) => {
            // Priority projects come first
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            
            // For priority projects, maintain the specified order
            if (a.isPinned && b.isPinned) {
                const aIndex = priorityProjects.findIndex(name => 
                    a.name === name || a.name.startsWith(name)
                );
                const bIndex = priorityProjects.findIndex(name => 
                    b.name === name || b.name.startsWith(name)
                );
                return aIndex - bIndex;
            }
            
            // Non-priority projects sorted by update date
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
        
        // Clear the container
        projectsContainer.innerHTML = '';
        
        if (sortedProjects.length === 0) {
            projectsContainer.innerHTML = '<p>No public repositories found.</p>';
            return;
        }
        
        // Add projects to the container
        sortedProjects.forEach(repo => {
            const language = repo.language || 'N/A';
            let languageColor = '#8b7765';
            
            // Set color based on language
            switch(language) {
                case 'Python':
                    languageColor = '#3572A5';
                    break;
                case 'JavaScript':
                    languageColor = '#f1e05a';
                    break;
                case 'HTML':
                    languageColor = '#e34c26';
                    break;
                case 'CSS':
                    languageColor = '#563d7c';
                    break;
                case 'Julia':
                    languageColor = '#a270ba';
                    break;
                case 'Jupyter Notebook':
                    languageColor = '#DA5B0B';
                    break;
            }
            
            projectsContainer.innerHTML += `
                <div class="project-card">
                    ${repo.isPinned ? '<span class="pinned-badge">Pinned</span>' : ''}
                    <div class="project-header">
                        <h3 class="project-title" title="${repo.name}">${repo.name}</h3>
                    </div>
                    <div class="project-language">
                        <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${languageColor}; margin-right:5px;"></span>
                        ${language}
                    </div>
                    <div class="project-description">
                        <p>${repo.description || 'No description available.'}</p>
                    </div>
                    <div class="project-stats">
                        <span class="project-stat">
                            <i class="far fa-star"></i> ${repo.stargazers_count || 0}
                        </span>
                        <span class="project-stat">
                            <i class="fas fa-code-branch"></i> ${repo.forks_count || 0}
                        </span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank">GitHub <i class="fas fa-external-link-alt"></i></a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Demo <i class="fas fa-external-link-alt"></i></a>` : '<span class="no-demo"></span>'}
                    </div>
                </div>
            `;
        });
    }
});