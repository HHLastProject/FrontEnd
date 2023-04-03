interface IPath {
  [ path : string ] : string;
};

export const path : IPath = {
  home: '/',
  login: '/login',
  filter: '/filter',
}