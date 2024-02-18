import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const Home_teachar = () => {
    const [sign, setSign] = useState("");
    const [url, setUrl] = useState("");

    const handleClear = () => {
        sign.clear();
    };
    const handleSave = () => {
        setUrl(sign.getTrimmedCanvas().toDataURL("sign.png"));
    };
    return (
        <div className="box">
            <div style={{ border: "2px solid black", width: 500, height: 200 }}>
                <SignatureCanvas
                    canvasProps={{
                        width: 500,
                        height: 200,
                        className: "sigCanvas",
                    }}
                    ref={(data) => setSign(data)}
                />
            </div>
            <button onClick={handleClear}> Clear</button>
            <button onClick={handleSave}>Save</button>
            <br></br>
            <br></br>
            <img src={url} />
        </div>
    );
};

export default Home_teachar;
