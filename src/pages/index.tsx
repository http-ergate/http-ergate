import { Key, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, Card, Col, Container, Dropdown, Grid, Input, Row, Spacer, Switch, Text } from "@nextui-org/react";
import React from "react";

function App() {
  const [selectedMethod, setSelected] = React.useState(new Set<Key>(["GET"]) || "all");
  const method = React.useMemo(
    () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
    [selectedMethod]
  );
  const [protocol, _] = useState("http://");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");

  async function send() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    try {
      const resp = await invoke("send", { method: method, url: `${protocol}${url}` });
      setResponse(JSON.stringify(resp));
    } catch (e) {
      setResponse(JSON.stringify(e));
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
                <Dropdown.Button shadow css={{ tt: "capitalize" }}>
                  {method}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="method selection"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedMethod}
                  onSelectionChange={setSelected}
                >
                  <Dropdown.Item key="GET">GET</Dropdown.Item>
                  <Dropdown.Item key="POST">POST</Dropdown.Item>
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
          <Card css={{ $$cardColor: '$colors$secondary' }}>
            <Card.Body>
              <Row justify="center" align="center">
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                  {response}
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
