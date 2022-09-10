import { Tooltip } from "antd";
import RunHome from "components/RunHome";
import { useAllBadges } from "hooks/useAllBadges";
import { useAllPokemon } from "hooks/useAllPokemon";
import { useMetrics } from "hooks/useMetrics";
import { useRegionData } from "hooks/useRegionData";
import RUN from "lib/run";
import mixpanel from "mixpanel-browser";
import { PokemonListApiData as ListPokemon, Run } from "models";
import Head from "next/head";
import { useRouter } from "next/router";
import { FirebaseContext } from "pages/_app";
import Error from "pages/_error";
import React, { useEffect } from "react";
import styles from "styles/Run.module.scss";
import Box from "ui-box";

import { SmileOutlined } from "@ant-design/icons";

const NO_RUN = { notFound: true };

//----------------------------------#01F2DF
//- Run Context
export const RunContext: React.Context<{
  RUN?: RUN;
  allPokemon: ListPokemon[];
  id: string;
}> = React.createContext({ allPokemon: [] as ListPokemon[], id: "" });

// TODO: Refactor into hooks
/**
 * Functional Run Page
 */
function RunPage() {
  const router = useRouter();
  const { id: rawId } = router.query;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const db = React.useContext(FirebaseContext)?.db;
  const runRef = db?.ref(id);
  // const runRef = React.useMemo(() => db?.ref(id), [!!db, id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runDb = React.useMemo(() => runRef && new RUN(runRef), [runRef]);

  // Update runDb
  useEffect(() => {
    if (runDb && db && id && runRef) runDb.attachRef(runRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!db, id, !!runDb]);

  //* States & Variables----------------#07cf7f
  const [runData, setRunData] = React.useState<Run | null>(null);

  // Booleans
  const isLoadingRun = !runData || !id;
  const runExists = !!runData && !runData["notFound"];

  // Variables
  const { region, game, players, timeline } = runData || {};
  const allBadges = useAllBadges();
  const regionData = useRegionData(region);
  const allLocations = regionData?.locations || [];
  const allPokemon = useAllPokemon();

  //* Subscribe to run data-------------#07cf7f
  useEffect(() => {
    if (runRef && id) {
      runRef.on("value", (snapshot) => {
        const rawValue = snapshot.val() || NO_RUN;
        runDb?.updateRunData(rawValue);
        setRunData(rawValue);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!db, id]);

  const runProps = {
    id,
    game,
    region,
    timeline,
    players,
  } as Run;

  useMetrics("Run Page", id, { pageId: id });

  //* Components------------------------#07cf7f
  if (isLoadingRun)
    return (
      <Box className="flex center" marginTop="45vh">
        Loading...
      </Box>
    );
  if (!runExists)
    return <Error statusCode={404} title={`Hmm, we can't find run '${id}'`} />;

  return (
    <RunContext.Provider value={{ RUN: runDb, allPokemon, id }}>
      <div className={styles.outerContainer}>
        <Head>
          <title>Soullocke | {id}</title>
        </Head>

        <main className={styles.main}>
          <RunHome {...runProps} {...{ allBadges, allLocations }} />

          <Tooltip
            title="Hi there! Thanks for checking out Soullocke. If you have feedback or requests, click me."
            placement="topRight"
          >
            <div className={styles.affix}>
              <a
                href="https://github.com/jynnie/soullocke/discussions"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => mixpanel.track("Feedback button")}
              >
                <SmileOutlined />
              </a>
            </div>
          </Tooltip>
        </main>
      </div>
    </RunContext.Provider>
  );
}

export default RunPage;
