import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

/**
 *  @param {Object} props
 * @param {function} props.triggerComponent
 * @param {object} props.items
 * @param {string} props.items.label - The text to display in the dropdown
 * @param {function} props.items.onClick - The function to run when the item is clicked
 * @returns {JSX.Element}
 */

export const DropdownPrimitive = ({ triggerComponent, items }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {triggerComponent && triggerComponent()}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="font-jakarta data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mr-7 min-w-48 rounded-lg bg-blue-50 shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out will-change-[opacity,transform]"
          sideOffset={32}
        >
          {items &&
            Object.keys(items).map((item) => (
              <DropdownMenu.Item
                className={clsx(
                  "group text-body-l cursor-pointer p-4 leading-none text-gray-500 transition ease-in-out outline-none hover:bg-blue-100/40 hover:text-black",
                  {
                    "text-red hover:text-red transition duration-500 ease-in-out hover:font-semibold":
                      items[item].label.includes("Delete"),
                  },
                )}
                key={items[item].label}
                onClick={items[item].onClick}
              >
                {items[item].label}
              </DropdownMenu.Item>
            ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
