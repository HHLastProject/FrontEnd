export const controlHidden = (id?: string) => {
  if(!id) id = 'select-box';
  const el = document.getElementById(id);
  if(el) {el.style.visibility = 'hidden';}
}

export const controlVisible = (id?: string) => {
  if(!id) id = 'select-box';
  const el = document.getElementById(id);
  if(el) {el.style.visibility = 'visible';}
}