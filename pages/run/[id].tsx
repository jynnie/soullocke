import { Tooltip } from "antd";
import RunHome from "components/RunHome";
import { useAllBadges } from "hooks/useAllBadges";
import { useAllPokemon } from "hooks/useAllPokemon";
import { useMetrics } from "hooks/useMetrics";
import { useRegion, useRegionData } from "hooks/useRegionData";
import mixpanel from "mixpanel-browser";
import { PokemonListApiData as ListPokemon } from "models";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "pages/_error";
import React from "react";
import styles from "styles/Run.module.scss";

import { SmileOutlined } from "@ant-design/icons";

export const RunContext: React.Context<{
  allPokemon: ListPokemon[];
  id: string;
}> = React.createContext({ allPokemon: [] as ListPokemon[], id: "" });

function RunPage() {
  const router = useRouter();
  const { id: rawId } = router.query;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  //* States & Variables----------------#07cf7f
  const region = useRegion(id);
  const allBadges = useAllBadges(region);
  const regionData = useRegionData(region);
  const allLocations = regionData?.locations || [];
  const allPokemon = useAllPokemon();

  const isRunNonexistent = region === false || !id;

  useMetrics("Run Page", id, { pageId: id });

  //* Components------------------------#07cf7f
  if (isRunNonexistent)
    return <Error statusCode={404} title={`Hmm, we can't find run '${id}'`} />;

  return (
    <RunContext.Provider value={{ allPokemon, id }}>
      <div className={styles.outerContainer}>
        <Head>
          <title>Soullocke | {id}</title>
        </Head>

        <main className={styles.main}>
          <RunHome {...{ id, allBadges, allLocations }} />

          <Tooltip
            title="Hi there! Thanks for checking out Soullocke. If you have feedback or issues, click me."
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
