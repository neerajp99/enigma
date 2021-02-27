import React from "react";
import Spinner from "../spin.gif";

function Spin() {
    return (
        <div className="w-screen h-screen bg-black">
            <div className="flex flex-wrap h-full justify-center items-center">
                <img src={Spinner} className="h-16 w-16"/>
                <br />
            </div>
        </div>

    );
}
export default Spin;

