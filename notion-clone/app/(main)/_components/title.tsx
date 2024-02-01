"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TitlePros {
  initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitlePros) => {
  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitile] = useState(initialData.title || "Untitied");

  const enableInput = () => {
    setTitile(initialData.title);
    setIsEditing(true);

    // a little hack here ot focus on the input
    /**
     * It is commonly used in React applications
     * to schedule a task to run after the current
     * rendering cycle
     *
     * n summary, the setTimeout(0) hack is used to
     * ensure that the DOM updates triggered by setTitile
     *  and setIsEditing have taken effect before interacting
     *  with the DOM by focusing on an input element and
     * selecting its text. This helps avoid synchronization
     *  issues and layout thrashing that can occur when working
     *  with the DOM in React.
     */
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitile(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  // check press enter
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

/**
 *
 *  Title.Skeleton is defining a new component named TitleSkeleton.
 *  It seems to be part of a larger component or UI framework
 *  since it is accessed through Title.
 */
Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
