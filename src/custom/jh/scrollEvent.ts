export const scrollTop = () => {
  const top = document.getElementById('page-container');
  if(top) {top.scrollTop = 0;}
}

export const scrollToId = (id: string) => {
  const container = document.getElementById('page-container');
  if(container) {
    const el = document.getElementById(id)?.offsetTop;
    container.scrollTo({top: el, behavior: 'smooth'});
  }
};