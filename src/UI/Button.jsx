export default function Button({ children, textOnly, calssName, ...props }) {
  const cssClasses = textOnly
    ? `text-button ${calssName}`
    : `button ${calssName}`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
