"use client"
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 px-12 py-6">
            <div className="rounded-lg bg-white w-full max-h-[90vh] relative overflow-hidden flex justify-center items-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4  p-2 px-4 text-xl bg-neutral-100 text-gray-800 rounded-full hover:bg-neutral-200 focus:outline-none"
                    aria-label="Close"
                >
                    &times; {/* The "X" character */}
                </button>

                {/* Modal Content Wrapper */}
                <div className="overflow-y-auto flex-1 max-h-[90vh] pr-2 p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
