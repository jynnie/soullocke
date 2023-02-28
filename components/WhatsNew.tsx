import classNames from "classnames";
import mixpanel from "mixpanel-browser";
import { Coffee, GitHub, Instagram, X } from "react-feather";
import styles from "styles/WhatsNew.module.scss";

import { Button } from "./ui-library/Button";

export function WhatsNew({
  visible,
  cancel,
}: {
  visible: boolean;
  cancel: () => void;
}) {
  return (
    <div
      className={classNames(styles.container, { [styles.visible]: visible })}
    >
      <Button
        className={classNames(styles.x, "icon text")}
        icon={<X />}
        onClick={cancel}
      />

      <div>
        <h3>Hi there!</h3>
        <p>
          Thanks for checking out Soullocke. If you have feedback or issues,{" "}
          <a
            href="https://github.com/jynnie/soullocke/discussions"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("Feedback button")}
          >
            let me know
          </a>
          .
        </p>
        <div className="flex gap-4 center mt-4">
          <a
            className="border-0"
            href="https://github.com/jynnie/soullocke/discussions"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("Github button")}
          >
            <GitHub />
          </a>
          <a
            className="border-0"
            href="https://ko-fi.com/jynnie"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("Coffee button")}
          >
            <Coffee />
          </a>
          <a
            className="border-0"
            href="https://www.instagram.com/jynniit/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("IG button")}
          >
            <Instagram />
          </a>
        </div>
      </div>

      <div className="mt-16" />

      <h3>What&apos;s new?</h3>
      <div className="flex flex-col gap-5">
        <div>
          <h5>February 2023</h5>
          <h4>Someone&apos;s PC</h4>
          <ul>
            <li>
              🎁 Introducing Box. Don&apos;t care about when things happen? Try
              out simplified management in Box tab.
            </li>
            <li>❔ Edit Pokémon originally added with no information.</li>
            <li>📍 Input custom location names.</li>
          </ul>
        </div>
        <div>
          <h5>January 2023</h5>
          <h4>Sootopolis Style</h4>
          <ul>
            <li>🎨 Redesign Timeline and Summary views.</li>
            <li>📝 Double click Pokémon information to edit in modals.</li>
            <li>🔍 Smarter search.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
