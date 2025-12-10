import * as Dialog from "@radix-ui/react-dialog";
import { DIALOG_DATA } from "@utils";
import clsx from "clsx";

/**
 * DialogPrimitive component
 * @param {Object} props
 * @param {string} props.title - The title of the dialog
 * @param {string} [props.description] - The description of the dialog
 * @param {JSX.Element} props.triggerComponent - The component that triggers the dialog
 * @param {JSX.Element} props.children - The children components
 * @param {boolean} props.isOpen - A boolean to determine if the dialog is open
 * @param {Function} props.setOpen - A function to set the dialog state
 * @returns {JSX.Element}
 */

export const DialogPrimitive = ({
  title,
  triggerComponent,
  dialogType,
  children,
  isOpen,
  setOpen,
  description,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <Dialog.Content
          className={clsx(
            "font-jakarta data-[state=open]:animate-contentShow border-main-blue fixed top-20 left-1/2 max-h-[85vh] w-[280px] -translate-x-1/2 overflow-auto rounded-md border-t-4 bg-white p-8 focus:outline-none lg:w-[480px]",
            {
              "border-red": dialogType === DIALOG_DATA.DELETE.key,
              "top-16 p-0!": dialogType === DIALOG_DATA.MOBILE_MENU.key,
            },
          )}
        >
          <Dialog.Title
            className={clsx("text-heading-l text-main-blue font-bold", {
              "text-red": dialogType === DIALOG_DATA.DELETE.key,
            })}
          >
            {title}
          </Dialog.Title>
          <Dialog.Description className="opacity-0">
            {description}
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
