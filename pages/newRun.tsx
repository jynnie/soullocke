import { Form, Input, Select } from "antd";
import { Button } from "components/ui-library/Button";
import runId from "lib/random";
import REGIONS from "lib/regions";
import { useRouter } from "next/router";
import { FirebaseContext } from "pages/_app";
import React from "react";
import { MinusCircle, Plus } from "react-feather";
import formStyles from "styles/Form.module.scss";
import styles from "styles/Home.module.css";

const { Option } = Select;

function NewRunPage() {
  const db = React.useContext(FirebaseContext)?.db;
  const router = useRouter();

  const [region, setRegion] = React.useState<string>("");
  const [game, setGame] = React.useState<string>("");
  const [players, setPlayers] = React.useState<{
    [key: number]: string;
  }>({});

  const [form] = Form.useForm();

  const handleGameChange: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
    setGame(evt.target.value);
  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = { ...players, [index]: value };
    setPlayers(newPlayers);
  };

  const createNewRun = async () => {
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
              onChange={(value) => setRegion(value)}
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
                    <div className="flex alignCenter gap-8">
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
                      <Button
                        className="text icon"
                        disabled={fields.length <= 1}
                        onClick={() => remove(field.name)}
                        icon={<MinusCircle />}
                      />
                    </div>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    className="outline"
                    onClick={() => add()}
                    icon={<Plus />}
                  >
                    Add player
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item className={formStyles.itemButtons}>
            <Button type="submit">Create</Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
}

export default NewRunPage;
