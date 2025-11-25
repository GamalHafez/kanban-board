/**
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.label
 * @returns {JSX.Element}
 */
export function Label({ id, label }) {
  return (
    <label
      className="text-heading-s text-medium-grey mb-1.5 block cursor-pointer font-bold"
      htmlFor={id}
    >
      {label}
    </label>
  );
}
