import {IDKitWidget, ISuccessResult, VerificationLevel} from "@worldcoin/idkit";
import {Button} from "@mantine/core";
import {post} from "../services/auth_api";

export function WorldIdConnect({onSuccess}: { onSuccess: (c: any) => void }) {
    const handleVerify = async (proof: ISuccessResult) => {
        const res = await post('verify', {}, proof)
        if (!res.ok) {
            throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
        }
    };

    return (
        <IDKitWidget
            app_id="app_f32b2c3858088f2b38457067d1761622" // obtained from the Developer Portal
            action="demeter" // obtained from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            verification_level={VerificationLevel.Orb}
        >
            {({open}) =>
                <Button onClick={open}>Verify with World ID</Button>
            }
        </IDKitWidget>
    )
}