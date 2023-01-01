import classNames from "classnames";
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
import { Coffee, GitHub, Instagram, Smile } from "react-feather";
import { ToastContainer } from "react-toastify";
import styles from "styles/Run.module.scss";

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

        <main>
          <RunHome {...{ id, region, allBadges, allLocations }} />

          <Tippy
            content={
              <TooltipContent className={classNames(styles.tippy, "text-lg")}>
                Hi there! Thanks for checking out Soullocke. If you have
                feedback or issues,{" "}
                <a
                  href="https://github.com/jynnie/soullocke/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => mixpanel.track("Feedback button")}
                >
                  let me know
                </a>
                .
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
              </TooltipContent>
            }
            placement="top-end"
            interactive
          >
            <div className={styles.affix}>
              <a
                href="https://ko-fi.com/jynnie"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => mixpanel.track("Smile button")}
              >
                <Smile />
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
