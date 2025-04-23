import React from 'react';
import ProjectCard from '../components/ProjectCard';
import '../styles/Home.css';

function Home() {
  const projects = [
    {
      id: 1,
      title: 'Murakami Random Quotes',
      description: 'A simple application that displays a random quote from Haruki Murakami using React and Vite, scraped from Goodreads.',
      link: 'https://murakami.coutshoko.dev',
      github: 'https://github.com/coutshoko/haruki-murakami-random-quotes'
    },
    {
      id: 2,
      title: 'Tarkov Price Filter',
      description: 'Display and filter items from the Tarkov flea market based on price drop.',
      link: 'https://tarkov.coutshoko.dev',
      github: 'https://github.com/coutshoko/tarkov-flea-market-stock-exchange'
    },
    {
      id: 3,
      title: 'Dota 2 Current Rank',
      description: 'Display my current rank in Dota 2 using a simple API.',
      link: 'https://dota2.coutshoko.dev',
      github: 'https://github.com/coutshoko/dota2currank'
    },
    {
      id: 4,
      title: 'coutshoko.dev',
      description: 'My own website, using React. hosted on VPS. You are here!',
      github: 'https://github.com/coutshoko/midori'
    },
    {
      id: 5,
      title: 'Mini Automation Pipeline',
      description: 'Automated deployment pipeline for my personal website(this) using GitHub Actions and Docker. It builds and updates the site on a VPS, with HTTPS enabled via Let’s Encrypt and Nginx.',
      github: 'https://github.com/coutshoko/midori'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>shoko</h1>
        <p>wannabe devops engineer</p>
      </section>

      <section className="projects">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              github={project.github}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 