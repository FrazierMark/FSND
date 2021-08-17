
const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  export default function MoneyFormat({ value }) {
    return (
      <span>
        {numberFormat.format(value / 100)}
      </span>
    );
  }