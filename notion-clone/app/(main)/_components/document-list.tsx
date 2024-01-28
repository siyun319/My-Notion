"use client";

import { Id, Doc } from "@/convex/_generated/dataModel";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";

import { Item } from "./item";
import { FileIcon } from "lucide-react";
interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  // It's used when you have defined route parameters
  //   in your route configuration, and you want to
  //   access their values in a component that matches that route.
  const params = useParams();
  //   useRouter is used to get the router object
  const router = useRouter();

  //   A record is analogous to an Object in JavaScript with the
  // exception that the Record is not an Object
  // but a deeply immutable primitive value.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      /**
       * n JavaScript, you can use square brackets [] to create
       * object properties with names that are not known at
       * compile time but are determined at runtime.
       * This is especially useful when you want to use
       * the value of a variable as the property name.
       */
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSideBar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // undefined -> loading
  // null -> no result
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => {
        return (
          <div key={document._id}>
            <Item
              id={document._id}
              onClick={() => onRedirect(document._id)}
              label={document.title}
              icon={FileIcon}
              documentIcon={document.icon}
              active={params.documentId === document._id}
              level={level}
              onExpand={() => onExpand(document._id)}
              expanded={expanded[document._id]}
            />
            {expanded[document._id] && (
              <DocumentList parentDocumentId={document._id} level={level + 1} />
            )}
          </div>
        );
      })}
    </>
  );
};
