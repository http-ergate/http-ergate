import { Button, Grid, Input } from "@nextui-org/react";
import { useState } from "react";
import { DeleteIcon } from "../icons";

/**
 * sense item props
 */
interface SenseItemProps {
    /**
     * sense changed
     */
    senseChanged: (key: string, value: string) => void,

    /**
     * sense deleted
     */
    senseDeleted: () => void,
}

/**
 * sense item of food
 * @param props props
 * @returns 
 */
export function SenseItem(props: SenseItemProps) {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    props.senseChanged(key, value);

    return (
        <>
            <Grid.Container
                gap={0.5}
                justify="flex-start"
                alignItems="center"
            >
                {/* sense key */}
                <Grid xs>
                    <Input
                        bordered
                        fullWidth
                        color="secondary"
                        animated={false}
                        onChange={(ev) => setKey(ev.currentTarget.value)}
                    />
                </Grid>
                {/* sense value */}
                <Grid xs>
                    <Input
                        bordered
                        fullWidth
                        color="secondary"
                        animated={false}
                        onChange={(ev) => setValue(ev.currentTarget.value)}
                    />
                </Grid>
                {/* delete sense */}
                <Grid>
                    <Button
                        auto
                        color="error"
                        icon={<DeleteIcon size={24} fill="#FFFFFF" />}
                        onPress={() => {props.senseDeleted()}}
                    />
                </Grid>
            </Grid.Container>
        </>
    );
}
