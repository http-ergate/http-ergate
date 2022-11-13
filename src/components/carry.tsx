import { Button, Dropdown, Grid, Input } from "@nextui-org/react";
import React, { Key, useState } from "react";
import { carry, Reward } from "../commands";
import { Method, Methods, Protocol } from "../models";

interface CarryProps {
  delivered: (reward: Reward) => void,
  uncarriable: (message: string) => void,
}

export function Carry(props: CarryProps) {
  const [selectedMethod, setSelected] = React.useState(new Set<Key>([Methods[0].name]) || "all");
  const method = React.useMemo(
    () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
    [selectedMethod]
  );
  const [protocol, _] = useState(Protocol.http);
  const [url, setUrl] = useState("");

  async function send() {
    try {
      const reward = await carry(method, `${protocol}${url}`);
      props.delivered(reward);
    } catch (error) {
      props.uncarriable((error as Error).message);
    }
  }

  return (
    <Grid.Container gap={0.5} justify="flex-start">
      {/* method dropdown */}
      <Grid>
        <Dropdown>
          <Dropdown.Button
            color="secondary"
            shadow
            css={{ tt: "capitalize" }}
          >
            {method}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="method selection"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedMethod}
            onSelectionChange={setSelected}
            items={Methods}
          >
            {(item: Method) => (
              <Dropdown.Item
                key={item.name}
              >
                {item.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      {/* url input */}
      <Grid xs>
        <Input
          bordered
          shadow
          fullWidth
          color="primary"
          animated={false}
          labelLeft={protocol}
          onChange={(ev) => setUrl(ev.currentTarget.value)}
        />
      </Grid>
      {/* button */}
      <Grid>
        <Button
          shadow
          auto
          onPress={() => send()}
        >
          Carry
        </Button>
      </Grid>
    </Grid.Container>
  );
};