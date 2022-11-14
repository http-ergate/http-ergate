import { Button, Grid, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { carry, FoodInfo, Reward } from "../commands";
import { CarryMethod, CarryMethodType } from ".";

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
  const [method, setMethod] = useState("");
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
        <CarryMethod
          methodChanged={(type) => setMethod(CarryMethodType[type])}
        />
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