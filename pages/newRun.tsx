import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import runId from "lib/random";
import REGIONS from "lib/regions";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/router";
import { FirebaseContext } from "pages/_app";
import React from "react";
import { MinusCircle, Plus } from "react-feather";
import formStyles from "styles/Form.module.scss";
import styles from "styles/Home.module.css";

function NewRunPage() {
  const db = React.useContext(FirebaseContext)?.db;
  const router = useRouter();

  const [region, setRegion] = React.useState<string>("");
  const [game, setGame] = React.useState<string>("");
  const [players, setPlayers] = React.useState<string[]>([""]);

  const isDisabled = !region || !game || players.filter((p) => !!p).length <= 0;

  const handleGameChange: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
    setGame(evt.target.value);

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const removePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  };

  const createNewRun = async () => {
    if (!!isDisabled) return;

    const id = runId();
    const playersObj: Record<string, { id: string; name: string }> = {};
    const playersArr = Object.values(players);
    playersArr.forEach((p, i) => {
      playersObj[p + i] = {
        id: p + i,
        name: p,
      };
    });

    await db?.ref(id).set({
      id,
      game,
      region,
      password: id,
      players: playersObj,
    });
    mixpanel.track("New Run");

    router.push(`/run/${id}`);
  };

  return (
    <div className={styles.container}>
      <main style={{ marginTop: -120 }}>
        <h2>New Run</h2>

        <form className="flex flex-col gap-8" method="dialog">
          <div className="flex flex-col gap-2">
            <label className={formStyles.width76}>
              Game <span className="color-purple">*</span>
            </label>
            <input
              name="game"
              type="text"
              className="grow-1"
              value={game}
              onChange={handleGameChange}
              placeholder="i.e. Emerald"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={formStyles.width76}>
              Region <span className="color-purple">*</span>
            </label>
            <SearchableSelect
              placeholder="i.e. Hoenn"
              onChange={(value?: string) => setRegion(value || "")}
              options={REGIONS.map((r) => ({
                value: r,
                label: r[0].toUpperCase() + r.slice(1),
              }))}
              value={region}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label>Players</label>
              <Button
                className="text icon"
                onClick={() => setPlayers([...players, ""])}
                icon={<Plus />}
              />
            </div>
            {players.map((player, index) => (
              <div className="flex items-center gap-4" key={index}>
                <label className={cn(formStyles.width76, "shrink-0")}>
                  Player {index + 1}{" "}
                  {index === 0 && <span className="color-purple">*</span>}
                </label>
                <input
                  name={`player ${index + 1}`}
                  type="text"
                  className="grow-1"
                  value={player}
                  onChange={(evt) =>
                    handlePlayerChange(index, evt.target.value)
                  }
                  placeholder="Name"
                />
                <Button
                  className="text icon"
                  disabled={players.length <= 1}
                  onClick={() => removePlayer(index)}
                  icon={<MinusCircle />}
                />
              </div>
            ))}
          </div>

          <Button disabled={isDisabled} onClick={createNewRun}>
            Create
          </Button>
        </form>
      </main>
    </div>
  );
}

export default NewRunPage;
