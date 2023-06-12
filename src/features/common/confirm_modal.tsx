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
    dispatch(setConfirmModal({ display: false, onConfirm: () => {} }));
    onConfirm();
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
      <div className="bg-white">
        <h1>Confirm Action</h1>
        <div className="flex">
          <button className="btn-primary" onClick={handleYes}>
            Yes
          </button>
          <button className="btn-primary" onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
