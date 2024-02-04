"use client";

import { useMutation, useQueries, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

import { Toolbar } from "@/components/toolbar";

import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentIdPageProps {
  // comes from the folder name [doucmentId] -> a variable
  // it is one way to access it
  // or we can use useParams();
  // two ways to access it
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  // recommended way,
  // not use ssr rendering
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => [
    update({
      id: params.documentId,
      content,
    }),
  ];

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}
