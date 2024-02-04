"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { useCoverImage } from "@/hooks/use-cover-image";

import { useState } from "react";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const [file, setFile] = useState<File>();
  const update = useMutation(api.documents.update);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const params = useParams();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          // old url
          replaceTargetUrl: coverImage.url,
        },
      });

      // let res;
      // if (coverImage.url) {
      //   res = await edgestore.publicFiles.upload(
      //     {file,
      //       options: {
      //         replaceTargetUrl: coverImage.url,
      //       }
      //     }
      //   )
      // } else {
      //    res = await edgestore.publicFiles.upload({
      //     file,
      //   });
      // }

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
