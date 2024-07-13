import {LoadingOverlay} from "@mantine/core";

export function UiLoader() {
    return <LoadingOverlay visible zIndex={1000} overlayProps={{
        radius: "sm",
        blur: 1,
        backgroundOpacity: 0.1
    }}/>

}