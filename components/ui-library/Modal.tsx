import classNames from "classnames";
import ReactDOM from "react-dom";
import { X } from "react-feather";

import { Button } from "./Button";

export function Modal({
  onCancel,
  visible,
  children,
}: {
  onCancel?: () => void;
  visible?: boolean;
  children: JSX.Element | (JSX.Element | false)[];
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={classNames("jnpr-modalContainer", { visible })}
          tabIndex={-1}
        >
          <div className="jnpr-modalBgd" onClick={onCancel} />
          <div className="jnpr-modalContent">
            <Button
              className="jnpr-modal-cancel icon text"
              icon={<X />}
              onClick={onCancel}
            />

            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
