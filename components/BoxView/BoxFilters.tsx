import { Button } from "components/ui-library/Button";
import { Modal } from "components/ui-library/Modal";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { useAddPokemonAndLocation } from "hooks/useAddPokemons";
import { usePlayersArray } from "hooks/usePlayersArray";
import { useRegion, useRegionData } from "hooks/useRegionData";
import { useRouter } from "next/router";
import { RunContext } from "pages/run/[id]";
import React, { useState } from "react";
import { Plus, Search } from "react-feather";
import styles from "styles/Box.module.scss";
import fstyles from "styles/Filters.module.scss";
import Box from "ui-box";
import { capitalize, cleanName } from "utils/utils";

export function BoxFilters({
  onChange,
  latestLocation,
}: {
  onChange: (val: any) => void;
  latestLocation?: { name: string; key: string };
}) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [inputVal, setInputVal] = React.useState<string>("");
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    handleChange({ searchTerm: e.target.value });
  };

  const handleChange = (override?: any) => {
    if (onChange)
      onChange({
        searchTerm: inputVal,
        ...(override || {}),
      });
  };

  return (
    <>
      <Box className={styles.filters} width="100%">
        <div className={fstyles.search}>
          <Search size="1rem" />
          <input
            type="text"
            placeholder="Search"
            value={inputVal}
            onChange={handleSearch}
          />
        </div>

        <div className={styles.location}>
          {capitalize(cleanName(latestLocation?.name || ""))}
        </div>

        <div className="flex items-center justify-end">
          <Button
            className="outline icon"
            icon={<Plus />}
            onClick={handleOpenModal}
          />
        </div>
      </Box>

      <AddPokemonModal
        {...{
          visible: !!showModal,
          onCancel: handleCloseModal,
        }}
      />
    </>
  );
}

function AddPokemonModal({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: () => void;
}) {
  const router = useRouter();
  const { id: rawId } = router.query;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const region = useRegion(id);
  const regionData = useRegionData(region);
  const allLocations = regionData?.locations || [];

  const { allPokemon } = React.useContext(RunContext);
  const players = usePlayersArray();

  const [newLocation, setLocation] = useState<string>("");
  const [pokemonNames, setPokemonNames] = useState<string[]>(
    Array(players.length).fill(""),
  );
  const [nicknames, setNicknames] = useState<string[]>(
    Array(players.length).fill(""),
  );

  const addPokemon = useAddPokemonAndLocation();

  async function addNew() {
    await addPokemon(
      newLocation,
      players.map((p) => p.id),
      pokemonNames,
      nicknames,
    );
    onCancel();
  }

  function updatePokemonName(index: number, name: string) {
    const newPokemonNames = [...pokemonNames];
    newPokemonNames[index] = name;
    setPokemonNames(newPokemonNames);
  }

  function updateNickname(index: number, name: string) {
    const newNicknames = [...nicknames];
    newNicknames[index] = name;
    setNicknames(newNicknames);
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <>
        <h3 className="mt-1 mb-4">Add Pokémon</h3>

        <div className="flex flex-col gap-2">
          <label>
            <span className="color-purple">*</span> Caught at:
          </label>
          <SearchableSelect
            options={[
              ...allLocations?.map((l) => ({
                value: l.name,
                label: capitalize(cleanName(l.name)),
              })),
            ]}
            value={newLocation}
            onChange={(value?: string) => setLocation(value || "")}
            placeholder="Add New Location"
            allowCustom
          />
        </div>

        <div className="my-4 flex flex-wrap gap-2">
          {players?.map((player, index) => (
            <div key={player.id} className="flex grow-1 flex-col gap-2">
              <h4 className="m-0 capitalize">{player.name}</h4>

              <SearchableSelect
                onChange={(value?: string) =>
                  updatePokemonName(index, value || "")
                }
                value={pokemonNames[index]}
                placeholder="Select a Pokémon"
                options={allPokemon.map((p) => ({
                  value: p.name,
                  label: p.name,
                }))}
              />
              <input
                type="text"
                placeholder="Nickname"
                value={nicknames[index]}
                onChange={(e) => updateNickname(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={addNew}>Add</button>
        </div>
      </>
    </Modal>
  );
}
