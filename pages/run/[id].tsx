import React from "react";
import Head from "next/head";
import Error from "pages/_error";
import { useRouter } from "next/router";
import { FirebaseContext } from "pages/_app";
import {
  UseState,
  Region,
  Run,
  PokemonListApiData as ListPokemon,
} from "models";

import RunHome from "components/RunHome";
import styles from "styles/Home.module.css";

import RUN from "lib/run";
import BADGES from "lib/badges";
const NO_RUN = { notFound: true };

//----------------------------------#01F2DF
//- Run Context
export const RunContext: React.Context<{
  RUN: RUN;
  allPokemon: ListPokemon[];
}> = React.createContext(null);

/**
 * Functional Run Page
 */
function RunPage() {
  const router = useRouter();
  const { id: rawId, view } = router.query;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const db = React.useContext(FirebaseContext)?.db;
  const runRef = db?.ref(id);
  // const runRef = React.useMemo(() => db?.ref(id), [!!db, id]);
  const runDb = React.useMemo(() => new RUN(runRef), []);

  // Update runDb
  React.useEffect(() => {
    if (db && id && runRef) runDb.attachRef(runRef);
  }, [!!db, id]);

  //----------------------------------#01F2DF
  //- States & Variables
  const [runData, setRunData]: UseState<Run> = React.useState(null);
  const [regionData, setRegionData]: UseState<Region> = React.useState(null);
  const [allPokemon, setAllPokemon]: UseState<ListPokemon[]> = React.useState(
    null,
  );

  // Booleans
  const isLoadingRun = !runData;
  const runExists = !!runData && !runData["notFound"];

  // Variables
  const { region, game, players, timeline } = runData || {};
  const allBadges: string[] = (region && BADGES[region]) || [];
  const allLocations = (regionData && regionData.locations) || [];

  //----------------------------------#01F2DF
  //- Subscribe to run data
  React.useEffect(() => {
    if (runRef && id) {
      runRef.on("value", (snapshot) => {
        const rawValue = snapshot.val() || NO_RUN;
        setRunData(rawValue);
        runDb.updateRunData(rawValue);
      });
    }
  }, [!!db, id]);

  //- Get region data
  React.useEffect(() => {
    if (runExists && region) {
      fetch(`https://pokeapi.co/api/v2/region/${region}/`)
        .then((res) => res.json())
        .then((data) => setRegionData(data));
    }
  }, [id, region]);

  //- Get list of all pokemon
  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
      .then((res) => res.json())
      .then((data) => {
        const basePokemon = data.results.filter(
          (p) => !/(mega|gmax)/gi.test(p.name),
        );
        setAllPokemon(basePokemon);
      });
  }, []);

  //----------------------------------#01F2DF
  //- Props
  const runProps = {
    id,
    game,
    region,
    timeline,
    players,
    allBadges,
    allLocations,
  };

  //----------------------------------#01F2DF
  //- Return Components
  if (isLoadingRun) return null;
  if (!runExists)
    return <Error statusCode={404} title={`Hmm, we can't find run '${id}'`} />;

  return (
    <RunContext.Provider value={{ RUN: runDb, allPokemon }}>
      <div className={styles.container}>
        <Head>
          <title>Soullocke | {id}</title>
        </Head>

        <main className={styles.main}>
          <RunHome {...runProps} />
        </main>
      </div>
    </RunContext.Provider>
  );
}

export default RunPage;
