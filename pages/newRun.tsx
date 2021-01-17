import React from "react";
import REGIONS from "lib/regions";
import runId from "lib/random";
import { useRouter } from "next/router";
import { oVal } from "lib/utils";
import { UseState } from "models";
import { FirebaseContext } from "pages/_app";

import styles from "styles/Home.module.css";
import formStyles from "styles/Form.module.scss";
import { Form, Input, Select, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

function NewRunPage() {
  const db = React.useContext(FirebaseContext)?.db;
  const router = useRouter();

  const [region, setRegion]: UseState<string> = React.useState(null);
  const [game, setGame]: UseState<string> = React.useState(null);
  const [players, setPlayers]: UseState<{
    [key: number]: string;
  }> = React.useState({});

  const [form] = Form.useForm();

  const handleRegionChange = setRegion;
  const handleGameChange = (evt) => setGame(evt.target.value);
  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = { ...players, [index]: value };
    setPlayers(newPlayers);
  };

  const createNewRun = async () => {
    const id = runId();
    const playersObj = {};
    const playersArr = oVal(players);
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

    router.push(`/run/${id}`);
  };

  return (
    <div className={styles.container}>
      <main>
        <h2>New Run</h2>

        <Form form={form} onFinish={createNewRun}>
          <Form.Item label="Game" required={true}>
            <Input
              value={game}
              onChange={handleGameChange}
              placeholder="i.e. Emerald"
            />
          </Form.Item>

          <Form.Item label="Region" required={true}>
            <Select
              className={formStyles.select}
              onChange={handleRegionChange}
              value={region}
              placeholder="i.e. Hoenn"
              showSearch
            >
              {REGIONS.map((r) => (
                <Option key={r} value={r} className={formStyles.option}>
                  {r}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.List
            name="players"
            rules={[
              {
                validator: async (_, players) => {
                  if (!players || players.length < 1) {
                    return Promise.reject(new Error("Add at least 1 player"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Player ${index + 1}`}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input player's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        style={{ width: "70%" }}
                        value={players[index]}
                        onChange={(evt) =>
                          handlePlayerChange(index, evt.target.value)
                        }
                        placeholder="Name"
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add player
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item className={formStyles.itemButtons}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
}

export default NewRunPage;
