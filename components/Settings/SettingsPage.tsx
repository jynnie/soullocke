import styles from "styles/Settings.module.scss";

export function SettingsPage() {
  return (
    <div className={styles.container}>
      <h4>Work in Progress!</h4>

      <div className={styles.setting}>
        <input type="checkbox" checked />
        <div className={styles.description}>
          <label>Primary Type Rule</label>
          <p>
            If you are playing where soul-linked teams can&apos;t share primary
            types; this rule helper displays primary types in Pokémon details
            and when doing switches.
          </p>
        </div>
      </div>
    </div>
  );
}
