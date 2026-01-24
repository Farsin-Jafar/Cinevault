import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function DialogBox({ isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm sm:max-w-md rounded-xl bg-black p-6 text-white">
          <DialogTitle className="text-base sm:text-lg font-semibold">
            Added to Favorites
          </DialogTitle>

          <p className="mt-2 text-sm text-gray-300">
            This movie has been added to your favorites list.
          </p>

          <Button
            className="mt-4 rounded bg-yellow-400 px-4 py-2 text-black"
            onClick={() => setIsOpen(false)}
          >
            Got it
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default DialogBox;
