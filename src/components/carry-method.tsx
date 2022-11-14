import { Dropdown } from "@nextui-org/react";
import React, { Key } from "react";

/**
 * carry method type
 */
export enum CarryMethodType {
    GET,
    POST,
}

/**
 * carry method props
 */
interface CarryMethodProps {
    methodChanged: (type: CarryMethodType) => void;
}

/**
 * carry method
 * @param props props
 */
export function CarryMethod(props: CarryMethodProps) {
    /**
     * temporary type for dropdown list
     */
    interface CollectionItem {
        type: CarryMethodType,
    }
    const items = [
        {
            type: CarryMethodType.GET
        } as CollectionItem,
        {
            type: CarryMethodType.POST
        } as CollectionItem,
    ];

    const [selectedMethod, setSelectedMethod] =
        React.useState(new Set<Key>([CarryMethodType[items[0].type]]) || "all");
    const methodType = React.useMemo(
        () => Array.from(selectedMethod).join(", ").replaceAll("_", " "),
        [selectedMethod]
    );

    props.methodChanged(CarryMethodType[methodType]);

    return (
        <Dropdown>
            <Dropdown.Button
                color="secondary"
                shadow
                css={{ tt: "capitalize" }}
            >
                {methodType}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label="carry method selection"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedMethod}
                onSelectionChange={setSelectedMethod}
                items={items}
            >
                {(item: CollectionItem) => (
                    <Dropdown.Item
                        key={CarryMethodType[item.type]}
                    >
                        {CarryMethodType[item.type]}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}
