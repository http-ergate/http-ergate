import { Key, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React from "react";
import {
  Error,
  Method,
  Methods,
  Protocol,
  Response,
} from "../models";

function App() {
  const [selectedMethod, setSelected] = React.useState(new Set<Key>([Methods[0].name]) || "all");
  const method = React.useMemo(
    () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
    [selectedMethod]
  );
  const [protocol, _] = useState(Protocol.http);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  async function send() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    try {
      const resp = await invoke<Response>("send", { method: method, url: `${protocol}${url}` });
      setText(resp.body);
    } catch (error) {
      setText((error as Error).message);
    }
  }

  return (
    <div>
      <Container>
        <Spacer />
        <Row fluid>
          <Grid.Container gap={1} justify="flex-start">
            <Grid>
              <Dropdown>
                <Dropdown.Button
                  color="secondary"
                  shadow
                  css={{ tt: "capitalize" }}>
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
                Send
              </Button>
            </Grid>
          </Grid.Container>
        </Row>
        <Spacer />
        <Row>
          <Card>
            <Card.Body>
              <Row justify="center" align="center">
                <Text size={15} css={{ m: 0 }}>
                  {text}
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
