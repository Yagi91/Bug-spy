import {
  setConfirmModal,
  selectOnConfirm,
  selectDisplayModal,
} from "./confirmSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const ConfirmModal = () => {
  const dispatch = useAppDispatch();
  const onConfirm = useAppSelector(selectOnConfirm);
  const displayModal = useAppSelector(selectDisplayModal);

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
    dispatch(setConfirmModal({ display: false, onConfirm: () => {} }));
  };

  const handleNo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setConfirmModal({ display: false, onConfirm: () => {} }));
  };

  return (
    <div
      className={`fixed inset-0 z-40 items-center justify-center border bg-neutral-600 bg-opacity-30 p-2 shadow-xl transition-all ${
        displayModal ? "flex" : "hidden"
      }`}
    >
      <div className="flex  h-[200px] w-[350px] flex-col justify-between rounded-[12px] bg-white p-4">
        <div>
          <h1 className="text-left text-lg font-black">Confirm Action</h1>
          <p className="text-left">
            Are you sure you want to do this? There is no way to reverse the
            action
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="btn-primary bg-accent-500 px-8 px-8 py-2 py-2 hover:bg-accent-600"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            className="btn-primary bg-secondary-500 px-8 py-2 hover:bg-secondary-600"
            onClick={handleNo}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
