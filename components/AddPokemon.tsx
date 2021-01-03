import React from "react";
import type { UseState, PokemonListApiData as ListPokemon } from "models";

import { Select, Button, Tooltip } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
const { Option } = Select;

function AddPokemon({ allPokemon }: { allPokemon: ListPokemon[] }) {
  const [showForm, setShowForm]: UseState<boolean> = React.useState(null);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div>
      {!showForm && (
        <Tooltip title="Add Pokemon">
          <Button shape="circle" icon={<PlusOutlined />} onClick={toggleForm} />
        </Tooltip>
      )}

      {showForm && (
        <div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Pokémon"
          >
            {allPokemon?.map((p) => (
              <Option key={p.name} value={p.name}>
                {p.name}
              </Option>
            ))}
          </Select>

          <Tooltip title="Submit">
            <Button
              shape="circle"
              icon={<CheckOutlined />}
              onClick={toggleForm}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default AddPokemon;
