import React from "react";
import { HashLoader } from "react-spinners";

const LoadingScreen = ({ isLoading }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <HashLoader
                color={"#BD2C43"}
                loading={isLoading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default LoadingScreen;