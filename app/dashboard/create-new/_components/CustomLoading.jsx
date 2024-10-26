import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <VisuallyHidden>
          <AlertDialogTitle>Loading</AlertDialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col items-center my-10 justify-center">
          <Image src="/loading.gif" alt="loading" width={100} height={100} />
          <h2>Generating your video...</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
