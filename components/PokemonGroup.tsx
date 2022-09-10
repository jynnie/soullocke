import cn from "classnames";
import React from "react";
import styles from "styles/Pokemon.module.scss";
import Box from "ui-box";

export function PokemonGroup({
  className,
  actionable = false,
  selected = false,
  children,
  ...props
}: any) {
  return (
    <Box
      className={cn(styles.group, {
        [styles.groupActionable]: actionable,
        [styles.groupSelected]: selected,
      })}
      {...props}
    >
      {children}
    </Box>
  );
}

export default PokemonGroup;
