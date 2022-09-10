import { cleanName } from "lib/utils";
import { PlaceName } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

export function LocationListing({ location }: { location: PlaceName }) {
  return <td className={styles.listing}>{cleanName(location)}</td>;
}

export default LocationListing;
