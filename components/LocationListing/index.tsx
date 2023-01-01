import { PlaceName } from "models";
import React from "react";
import styles from "styles/Location.module.scss";
import { cleanName } from "utils/utils";

export function LocationListing({ location }: { location: PlaceName }) {
  const isBadge = /badge/gi.test(location);

  return (
    <td className={styles.listing}>
      <div className="flex items-center">
        {isBadge && <SingleBadge badge={location} />}
        {cleanName(location)}
      </div>
    </td>
  );
}

export default LocationListing;

function SingleBadge({ badge }: { badge: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.badgeImg}
      src={`https://nuzlocke-generator.herokuapp.com/img/checkpoints/${badge
        .replaceAll("_", "-")
        .toLowerCase()}.png`}
      alt={badge}
    />
  );
}
