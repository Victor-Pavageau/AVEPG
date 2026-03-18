export type Path = '/' | '/about' | '/events' | '/photos' | '/photos/:albumId' | '/contact' | '*';

export const PathsLabels: Record<Path, string> = {
  '/': 'Home',
  '/about': 'About',
  '/events': 'Events',
  '/photos': 'Photos',
  '/photos/:albumId': 'Photos',
  '/contact': 'Contact',
  '*': 'Not Found',
};
