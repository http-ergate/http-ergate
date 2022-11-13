import { useState } from "react";
import { Card, Container, Row, Spacer, Text } from "@nextui-org/react";
import React from "react";
import { Food } from "../components";

function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <Container>
        <Spacer />
        <Food 
          delivered={(reward) => setText(reward.body)} 
          uncarriable={(message) => setText(message)} 
        />
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
