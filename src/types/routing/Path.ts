export type Path = '/' | '/about' | '/events' | '/photos' | '/contact' | '*';

export const PathsLabels: Record<Path, string> = {
  '/': 'Home',
  '/about': 'About',
  '/events': 'Events',
  '/photos': 'Photos',
  '/contact': 'Contact',
  '*': 'Not Found',
};
