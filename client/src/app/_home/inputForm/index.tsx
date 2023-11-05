'use client'

import ja from "@/shared/ja";
import { Button, Input } from "@nextui-org/react";

const InputForm = () => {
    return (
        <div>
            <div
                style={{
                    width:"270px",
                    margin:"auto",
                }}
            >
                <Input variant="underlined"/>
            </div>
            <div
                style={{
                    marginTop:"10px"
                }}
            >
                <Button color="primary">
                    {ja.home.inputForm.buttonTitle}
                </Button>
            </div>
        </div>
    );
}

export default InputForm;