import groceriesImage from "../assets/groceries.png";

export default function Home() {
  return (
    <div className="centered">
      <h1>Welcome to React Groceries!</h1>
      <img
        src="https://www.clipartmax.com/png/full/101-1011011_grocery-goods-clip-art-shopping-cart-with-food-clipart.png"
        alt="A clipart depicting a trolley filled with groceries."
      />
      <p>
        Please log in or sign up for a new account in order to start keeping a
        records of your groceries lists!
      </p>
    </div>
  );
}
