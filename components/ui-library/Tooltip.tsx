import classNames from "classnames";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";

export function Tooltip({
  children,
  content,
}: {
  children: JSX.Element;
  content: JSX.Element;
}) {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      ref={setReferenceElement}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {children}

      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className={classNames("jnpr-tooltip", { visible: isHover })}
          >
            {content}
            <div ref={setArrowElement} style={styles.arrow} />
          </div>,
          document.body,
        )}
    </div>
  );
}
