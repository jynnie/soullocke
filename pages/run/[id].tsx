import { Tooltip } from "antd";
import RunHome from "components/RunHome";
import { useMetrics } from "hooks/useMetrics";
import BADGES from "lib/badges";
import RUN from "lib/run";
import mixpanel from "mixpanel-browser";
import { PokemonListApiData as ListPokemon, Region, Run } from "models";
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
}> = React.createContext({ allPokemon: [] as ListPokemon[] });

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
  const [regionData, setRegionData] = React.useState<Region | null>(null);
  const [allPokemon, setAllPokemon] = React.useState<ListPokemon[]>([]);

  // Booleans
  const isLoadingRun = !runData || !id;
  const runExists = !!runData && !runData["notFound"];

  // Variables
  const { region, game, players, timeline } = runData || {};
  const allBadges: string[] = (region && (BADGES as any)[region]) || [];
  const allLocations = (regionData && regionData.locations) || [];

  useEffect(() => {
    runDb?.attachData([...allLocations.map((l) => l.name), ...allBadges]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBadges, allLocations]);

  //* Subscribe to run data-------------#07cf7f
  useEffect(() => {
    if (runRef && id) {
      runRef.on("value", (snapshot) => {
        const rawValue = snapshot.val() || NO_RUN;
        runDb?.updateRunData(rawValue);
        ("");
        setRunData(rawValue);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!db, id]);

  //- Get region data
  useEffect(() => {
    if (runExists && region) {
      fetch(`https://pokeapi.co/api/v2/region/${region}/`)
        .then((res) => res.json())
        .then((data) => setRegionData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, region]);

  //- Get list of all pokemon
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
      .then((res) => res.json())
      .then((data) => {
        const basePokemon = data.results.filter(
          (p: { name: string }) => !/(mega|gmax)/gi.test(p.name),
        );
        setAllPokemon(basePokemon);
      });
  }, []);

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
    <RunContext.Provider value={{ RUN: runDb, allPokemon }}>
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
