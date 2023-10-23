export function Button({ onClick, children }) {
  return (
    <button
      className="bg-blue-600 px-6 py-2 rounded-md my-2 disabled:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
