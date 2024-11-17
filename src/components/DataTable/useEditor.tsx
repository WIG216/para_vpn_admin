import { useState } from "react";

type UseEditorType  = [number[], {addEditIndex: (index: number ) => void, removeEditIndex: (index: number) => void}]

export default function useEditor(editIndex?: number): UseEditorType {
    const [editIndexs, setEditIndex] = useState<number[]>(
      editIndex ? [editIndex] : []
    );
  
    const addEditIndex = (index: number) => {
      setEditIndex((prevState) => [...prevState, index]);
    };
  
    const removeEditIndex = (index: number) => {
      setEditIndex((prevState) => prevState.filter((i) => i !== index));
    };
  
    return [editIndexs, { addEditIndex, removeEditIndex }];
  }