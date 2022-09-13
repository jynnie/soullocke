import styles from "styles/Error.module.scss";

function Error() {
  return (
    <div className={styles.errorBox}>
      <div>
        <h1 className={styles.statusCode}>{404}</h1>
        <p className={styles.title}>This page could not be found</p>
      </div>
    </div>
  );
}

export default Error;
