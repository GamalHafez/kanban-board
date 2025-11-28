/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @returns {JSX.Element}
 */

export function Task({ title, description }) {
  return (
    <div className="group/card relative flex min-h-16 transform justify-between overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
      <div>
        <h3 className="group-hover/card:text-main-blue font-bold text-gray-800 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-heading-s text-gray-600 transition-colors duration-300 group-hover/card:text-gray-800">
          {description}
        </p>
      </div>
      <button className="text-red text-heading-s invisible cursor-pointer font-semibold group-hover/card:visible hover:font-bold">
        Delete
      </button>
    </div>
  );
}
