'use client';

import { portfolioData } from '@/data/portfolio';
import { useTranslation } from '@/locales/i18n';

export default function Portfolio() {
  const { t, lang } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">BD Toolbox</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.home')}
            </a>
            <a href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
              {t('nav.portfolio')}
            </a>
            <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.blog')}
            </a>
            <a href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.faq')}
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.about')}
            </a>
            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.contact')}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => { /* toggleLang is not available here, we need to use the context */ }} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {lang === 'en' ? 'বাং' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {portfolioData.hero.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {portfolioData.hero.title}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
              {portfolioData.hero.valueStatement}
            </p>
            <div className="flex justify-center space-x-4 flex-wrap">
              <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                {t('portfolio.cta.viewResume') || 'View Resume'}
              </a>
              <a href="#contact" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                {t('portfolio.cta.contactMe') || 'Contact Me'}
              </a>
            </div>
          </section>

          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t('portfolio.about') || 'About'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              {portfolioData.about.description}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
              {portfolioData.about.location}
            </p>
          </section>

          {/* Technical Skills Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t('portfolio.technicalSkills') || 'Technical Skills'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioData.technicalSkills.categories.map((category, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-900 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t('portfolio.experience') || 'Experience'}
            </h2>
            <div className="space-y-8">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {exp.company} · {exp.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t('portfolio.projects') || 'Projects'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-900 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      {t('portfolio.viewProject') || 'View Project'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t('portfolio.educationCertifications') || 'Education & Certifications'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {/* Certifications */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t('portfolio.certifications') || 'Certifications'}
                </h3>
                <div className="space-y-3">
                  {portfolioData.educationAndCertifications.certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{cert.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Education */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t('portfolio.education') || 'Education'}
                </h3>
                <div className="space-y-3">
                  {portfolioData.educationAndCertifications.education.map((edu, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-semibold">{edu.degree}</span>
                        <span className="text-gray-500 dark:text-gray-400">{edu.institution}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{edu.year}</span>
                        <span>
                          {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.gpa ? `GPA: ${edu.gpa}` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">{t('footer.quick_links') || 'Quick Links'}</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white">{t('nav.home') || 'Home'}</a></li>
                <li><a href="/portfolio" className="hover:text-white">{t('nav.portfolio') || 'Portfolio'}</a></li>
                <li><a href="/blog" className="hover:text-white">{t('nav.blog') || 'Blog'}</a></li>
                <li><a href="/faq" className="hover:text-white">{t('nav.faq') || 'FAQ'}</a></li>
                <li><a href="/about" className="hover:text-white">{t('nav.about') || 'About'}</a></li>
                <li><a href="/contact" className="hover:text-white">{t('nav.contact') || 'Contact'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('footer.tools') || 'Tools'}</h4>
              <ul className="space-y-2">
                <li><a href="/tools/pdf-converter" className="hover:text-white">PDF Converter</a></li>
                <li><a href="/tools/word-counter" className="hover:text-white">Word Counter</a></li>
                <li><a href="/tools/unit-converter" className="hover:text-white">Unit Converter</a></li>
                {/* More tools will be added later */}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('footer.follow') || 'Follow Us'}</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">GitHub</a>
                <a href="#" className="hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-xs">
            &copy; {new Date().getFullYear()} BD Toolbox. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}