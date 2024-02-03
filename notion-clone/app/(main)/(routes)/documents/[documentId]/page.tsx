"use client";

import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Toolbar } from "@/components/toolbar";

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

  if (document === undefined) {
    return <div>Loading...</div>;
  }
  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:mg-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
