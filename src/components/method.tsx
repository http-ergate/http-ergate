import { Dropdown } from "@nextui-org/react";
import React, { Key } from "react";

/**
 * method
 */
interface Method {
    name: string,
}

/**
 * method props
 */
interface MethodProps {
    methodChanged: (method: Method) => void;
}

/**
 * method to carry
 * @param props props
 */
export function Method(props: MethodProps) {
    const methods = [
        {
            name: "GET"
        } as Method,
        {
            name: "POST"
        } as Method,
    ];

    const [selectedMethod, setSelectedMethod] = React.useState(new Set<Key>([methods[0].name]) || "all");
    const method = React.useMemo(
        () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
        [selectedMethod]
    );

    props.methodChanged({
        name: method,
    } as Method);

    return (
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
                items={methods}
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
    );
}
