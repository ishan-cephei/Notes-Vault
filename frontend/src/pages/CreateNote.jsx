import React from "react";
import { Button } from "@/components/ui/button";

export const CreateNote = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button>Create new note</Button>
    </div>
  );
};
