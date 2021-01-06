import styles from "styles/Error.module.scss";

const statusCodes = {
  400: "Bad Request",
  404: "This page could not be found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
};

const Error = ({ statusCode, title }) => {
  const errorDetails =
    title || statusCodes[statusCode] || "An error has occurred";

  return (
    <div className={styles.errorBox}>
      <div>
        <h1 className={styles.statusCode}>{statusCode}</h1>
        <p className={styles.title}>{errorDetails}</p>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
