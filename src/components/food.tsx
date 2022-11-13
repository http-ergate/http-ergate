import { Button, Dropdown, Grid, Input } from "@nextui-org/react";
import React, { Key, useState } from "react";
import { carry, FoodInfo, Reward } from "../commands";
import { Method, Methods } from "../models";

/**
 * path type
 */
enum PathType {
  normal = "http://",
  secured = "https://",
}

/**
 * food props
 */
interface FoodProps {
  /**
   * food delivered
   */
  delivered: (reward: Reward) => void,

  /**
   * food is uncarriable
   */
  uncarriable: (message: string) => void,
}

/**
 * food to carry
 * @param props props
 * @returns element
 */
export function Food(props: FoodProps) {
  const [selectedMethod, setSelectedMethod] = React.useState(new Set<Key>([Methods[0].name]) || "all");
  const method = React.useMemo(
    () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
    [selectedMethod]
  );
  const [pathType, _] = useState(PathType.normal);
  const [path, setPath] = useState("");

  async function send() {
    try {
      const fi = {
        method,
        path: `${pathType}${path}`,
      } as FoodInfo;
      const reward = await carry(fi);
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
            onSelectionChange={setSelectedMethod}
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
      {/* path input */}
      <Grid xs>
        <Input
          bordered
          shadow
          fullWidth
          color="primary"
          animated={false}
          labelLeft={pathType}
          onChange={(ev) => setPath(ev.currentTarget.value)}
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
}