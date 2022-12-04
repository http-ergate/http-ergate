import { Navbar } from "@nextui-org/react";
import { useState } from "react";

/**
 * addition item
 */
interface Addition {
    /**
     * addition name
     */
    name: string,

    /**
     * is active
     */
    isActive: boolean,
}

interface FoodAdditionProps {

}

export function FoodAddition(props: FoodAdditionProps) {
    const [additions, setAdditions] = useState([
        {
            name: "Senses",
            isActive: true,
        } as Addition,
        {
            name: "Inside",
            isActive: false,
        } as Addition,
    ]);

    /**
     * addition pressed
     * @param name addition name
     */
    function additionPressed(name: string) {
        var temp = [];
        additions.forEach((addition) => temp.push({
            name: addition.name,
            isActive: addition.name === name,
        } as Addition));
        setAdditions(temp);
    }

    return (
        <>
            <Navbar isBordered variant="floating">
                <Navbar.Content activeColor="secondary" hideIn="xs" variant="highlight">
                    {
                        additions.map((addition, index) =>
                            <Navbar.Link
                                key={index}
                                isActive={addition.isActive}
                                onPress={() => additionPressed(addition.name)}
                            >
                                {addition.name}
                            </Navbar.Link>
                        )
                    }
                </Navbar.Content>
            </Navbar>
        </>
    )
}
