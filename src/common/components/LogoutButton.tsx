import { Button } from "@mui/material";
import React from "react";

const LogoutButton = ({ handleLogout }: { handleLogout: () => void }) => {
    return (
        <Button
            variant="outlined"
            size="small"
            sx={{
                position: "absolute",
                top: "100%",
                right: 0,
                whiteSpace: "nowrap",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                    backgroundColor: "#333",
                    borderColor: "#333",
                },
            }}
            onClick={handleLogout}
        >
            로그아웃
        </Button>
    );
};

export default LogoutButton;
