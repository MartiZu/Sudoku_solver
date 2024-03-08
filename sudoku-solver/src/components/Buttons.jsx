export default function Buttons() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      {numbers.map((number) => (
        <button key={number} className="numberButton">
          {number}
        </button>
      ))}
    </div>
  );
}
