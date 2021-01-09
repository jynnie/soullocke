import React from "react";
import Box from "ui-box";
import cn from "classnames";
import styles from "styles/Pokemon.module.scss";

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
