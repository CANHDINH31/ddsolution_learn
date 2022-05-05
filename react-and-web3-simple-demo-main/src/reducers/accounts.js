const initState = JSON.parse(localStorage.getItem("accounts")) || [];
export default (accounts = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      let flag = false;
      let newAccounts = accounts.map((item) => {
        if (item?.account === action.payload) {
          flag = true;
          return {
            ...item,
            numberLogin: Number(item.numberLogin) + 1,
            status: true,
          };
        } else {
          return { ...item, status: false };
        }
      });

      if (flag === false) {
        newAccounts.push({
          account: action.payload,
          numberLogin: "1",
          status: true,
        });
      }
      localStorage.setItem("accounts", JSON.stringify(newAccounts));
      return newAccounts;
    case "LOGOUT":
      let newAccounts1 = accounts.map((item) => {
        return { ...item, status: false };
      });
      localStorage.setItem("accounts", JSON.stringify(newAccounts1));
      return newAccounts1;
    case "DELETE":
      let newAccounts2 = accounts.filter(
        (item) => item.account != action.payload.account
      );
      localStorage.setItem("accounts", JSON.stringify(newAccounts2));
      return newAccounts2;
    case "ADD":
      let newAccount3 = [
        ...accounts,
        { account: action.payload, numberLogin: 0 },
      ];
      localStorage.setItem("accounts", JSON.stringify(newAccount3));
      return newAccount3;

    default:
      return accounts;
  }
};
