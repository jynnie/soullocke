import cn from "classnames";
import React from "react";
import { Loader } from "react-feather";
import Box, { BoxProps } from "ui-box";

interface ButtonProps extends BoxProps<"button"> {
  className?: string;
  type?: "button" | "reset" | "submit";
  onClick?: (
    evt?: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) => void | Promise<any>;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactElement | string;
}

export function Button({
  className,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  active = false,
  icon: rawIcon,
  children,
  ...props
}: ButtonProps) {
  const {
    props: buttonProps,
    icon,
    isLoading,
  } = useButton({
    className,
    type,
    onClick,
    disabled,
    loading,
    active,
    icon: rawIcon,
  });

  return (
    <Box is="button" {...buttonProps} {...props}>
      {isLoading && <Loader className="button-icon loading-spinner" />}
      {!isLoading && icon}
      {children}
    </Box>
  );
}

function useButton({
  className,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  active = false,
  icon: rawIcon,
}: {
  className?: string;
  type?: "button" | "reset" | "submit";
  onClick?: (
    evt?: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) => void | Promise<any>;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactElement | string;
}) {
  const [isLoading, setIsLoading] = React.useState(loading);
  const [isActive, setIsActive] = React.useState(active);
  const isBusy = disabled || isLoading;

  const icon =
    rawIcon &&
    React.cloneElement(rawIcon, {
      className: cn(rawIcon.props?.className, "jnpr-button-icon"),
    });

  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  function handleClick(
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) {
    if (isBusy || !onClick) return;

    let onClickResult = null;
    if (onClick instanceof Function) onClickResult = onClick(evt);

    const isPromise = onClickResult instanceof Promise;
    if (isPromise) {
      setIsLoading(true);
      onClickResult?.then(() => {
        setIsLoading(false);
      });
    }
  }

  function handleKeyDown(evt: React.KeyboardEvent) {
    if (evt.code === "Space" || evt.code === "Enter") {
      evt.preventDefault();
      handleClick(evt);
      setIsActive(true);
    }
  }

  function handleKeyUp(evt: React.KeyboardEvent) {
    if (evt.code === "Space" || evt.code === "Enter") {
      setIsActive(false);
    }
  }

  const props = {
    role: "button",
    tabIndex: isBusy ? -1 : 0,
    className: cn(className, {
      disabled: disabled || isLoading,
      active: isActive,
    }),
    type: type,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    "aria-disabled": disabled,
  };

  return {
    props,
    icon,
    isLoading,
    isDisabled: disabled || isLoading,
  };
}
