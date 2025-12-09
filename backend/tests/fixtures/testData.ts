import { StoryRequest } from '../../src/schemas/storyRequest.schema';

export const validRequests: StoryRequest[] = [
  {
    tone: 'INSPIRACIONAL',
    format: 'REDES_SOCIALES',
    text: 'María completó nuestro programa de emprendimiento y ahora tiene su propia panadería que genera empleo.',
  },
  {
    tone: 'EDUCATIVO',
    format: 'POST',
    text: 'El programa enseña metodología ágil a equipos de organizaciones sociales para mejorar su gestión.',
  },
  {
    tone: 'TÉCNICO',
    format: 'HISTORIA',
    text: 'Implementación de un sistema de gestión de proyectos utilizando metodología Scrum en una ONG.',
  },
];

export const invalidRequests = [
  {
    tone: 'EMOTIVO',
    format: 'POST',
    text: 'Valid text with more than 20 characters',
    error: 'Invalid tone',
  },
  {
    tone: 'INSPIRACIONAL',
    format: 'BLOG',
    text: 'Valid text with more than 20 characters',
    error: 'Invalid format',
  },
  {
    tone: 'EDUCATIVO',
    format: 'HISTORIA',
    text: 'Short',
    error: 'Text too short',
  },
];

export const mockStories = {
  inspiracional: `🌟 De la adversidad al éxito: La historia de María

Madre soltera, determinada, emprendedora. María no se rindió ante los desafíos. Completó nuestro programa de emprendimiento y hoy su panadería no solo sostiene a su familia, sino que también genera empleo en su comunidad.

¿Conoces a alguien con un sueño como el de María? 💪

#Emprendimiento #MujeresEmprendedoras #ImpactoSocial #Superación`,

  educativo: `Metodología Ágil en Organizaciones Sociales

La metodología ágil se ha convertido en una herramienta esencial para organizaciones sociales que buscan optimizar su gestión. Este enfoque permite adaptarse rápidamente a los cambios, priorizar tareas de alto impacto y fomentar la colaboración entre equipos. A través de ciclos cortos de trabajo llamados sprints, las organizaciones pueden entregar valor de manera continua, aprender de cada iteración y ajustar sus estrategias para maximizar su impacto social en las comunidades que sirven.`,

  tecnico: `Sistema de Gestión de Proyectos con Scrum

El proyecto consistió en la implementación de un sistema de gestión basado en Scrum para una organización sin fines de lucro. Se definieron roles (Product Owner, Scrum Master, Equipo de Desarrollo), eventos (Sprint Planning, Daily Standup, Sprint Review, Retrospectiva) y artefactos (Product Backlog, Sprint Backlog). La adopción del framework permitió aumentar la transparencia en 40%, reducir tiempos de entrega en 30% y mejorar la satisfacción del equipo significativamente.`,
};
