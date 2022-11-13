import { Key, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  Card,
  Container,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React from "react";
import {
  Error,
  Methods,
  Protocol,
  Response,
} from "../models";
import { Go } from "../components";

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
        <Go done={(resp) => setText(resp.body)} error={(error) => setText(error.message)} />
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
