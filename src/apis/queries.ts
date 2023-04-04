interface IQueryKey {
  [key:string] : readonly [string];
}

export const queryKeys : IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
};