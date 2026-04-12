export type Path =
  | '/'
  | '/about'
  | '/events'
  | '/gexretromobiles'
  | '/photos'
  | '/photos/:albumId'
  | '/contact'
  | '*';

export const PathsLabels: Record<Path, string> = {
  '/': 'Home',
  '/about': 'About',
  '/events': 'Events',
  '/gexretromobiles': 'GEXretromobiles',
  '/photos': 'Photos',
  '/photos/:albumId': 'Photos',
  '/contact': 'Contact',
  '*': 'Not Found',
};
