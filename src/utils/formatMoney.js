const formatMoney = (money) =>
  money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export default formatMoney;
