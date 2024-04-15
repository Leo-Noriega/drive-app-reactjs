export const authManager = (state = {}, action) => {
  //... operador spread - le mete atributos a un objeto
  switch (action.type) {
    case "SIGNIN":
      return {
        token: action.payload,
        signed: true,
      };
    case "SIGNOUT":
      return {
        token: null,
        signed: false,
      };
    default:
      return state;
  }
};
