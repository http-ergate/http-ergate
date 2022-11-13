import { Button, Container, Dropdown, Grid, Input, Row } from "@nextui-org/react";
import { invoke } from "@tauri-apps/api/tauri";
import React, { Key, useState } from "react";
import {
  Error,
  Method,
  Methods,
  Protocol,
  Response,
} from "../models";

interface GoProps {
  done: (resp: Response) => void,
  error: (error: Error) => void,
}

export function Go(props: GoProps) {
  const [selectedMethod, setSelected] = React.useState(new Set<Key>([Methods[0].name]) || "all");
  const method = React.useMemo(
    () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
    [selectedMethod]
  );
  const [protocol, _] = useState(Protocol.http);
  const [url, setUrl] = useState("");

  async function send() {
    try {
      const response = await invoke<Response>("send", { method: method, url: `${protocol}${url}` });
      props.done(response);
    } catch (error) {
      props.error(error as Error);
    }
  }

  return (
    <Container>
      <Row fluid>
        <Grid.Container gap={1} justify="flex-start">
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
          <Grid xs>
            <Input
              bordered
              shadow
              fullWidth
              labelLeft={protocol}
              onChange={(ev) => setUrl(ev.currentTarget.value)}
            />
          </Grid>
          <Grid>
            <Button
              shadow
              auto
              onPress={() => send()}
            >
              Go!
            </Button>
          </Grid>
        </Grid.Container>
      </Row>
    </Container>
  );
};