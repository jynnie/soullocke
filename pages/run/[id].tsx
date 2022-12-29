import RunHome from "components/RunHome";
import { TooltipContent } from "components/ui-library/TooltipContent";
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
import { ToastContainer } from "react-toastify";
import styles from "styles/Run.module.scss";

import { SmileOutlined } from "@ant-design/icons";
import Tippy from "@tippyjs/react";

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

          <Tippy
            content={
              <TooltipContent className={styles.tippy}>
                Hi there! Thanks for checking out Soullocke. If you have
                feedback or issues, click me.
              </TooltipContent>
            }
            placement="top-end"
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
          </Tippy>
        </main>
      </div>
      <ToastContainer pauseOnFocusLoss={false} />
    </RunContext.Provider>
  );
}

export default RunPage;
