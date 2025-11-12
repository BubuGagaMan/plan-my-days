"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type IsEditing = {
  notes: boolean;
  dayMark: boolean;
};

type DefaultState = {
  isEditing: IsEditing;
  setIsEditing: Dispatch<SetStateAction<IsEditing>>;
  isModal?: boolean;

  stateNotes: string | null;
  setStateNotes: Dispatch<SetStateAction<string | null>>;
  notes?: string | null;
};

const DetailsEditContext = createContext<DefaultState>({
  isEditing: { notes: false, dayMark: false },
  setIsEditing: () => {
    throw new Error("setIsEditing called outside DetailsEditProvider");
  },
  stateNotes: "",
  setStateNotes: () => {
    throw new Error("setStateNotes called outside DetailsEditProvider");
  },
  notes: "",
  isModal: false,
});

export const DetailsEditProvider = ({
  children,
  isModal = false,
  notes = null,
}: {
  children: React.ReactNode;
  isModal?: boolean;
  notes?: string | null;
}) => {
  const [isEditing, setIsEditing] = useState({ notes: false, dayMark: false });
  const [stateNotes, setStateNotes] = useState<string | null>(notes);

  return (
    <DetailsEditContext.Provider
      value={{
        isEditing,
        setIsEditing,
        isModal,
        stateNotes,
        setStateNotes,
        notes,
      }}
    >
      {children}
    </DetailsEditContext.Provider>
  );
};

export const useDetailsEdit = () => useContext(DetailsEditContext);
