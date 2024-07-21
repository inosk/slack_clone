import { create } from 'zustand';

type CreateWorkSpaceValues = {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<CreateWorkSpaceValues>) => void;
  currStep: number;
  setCurrStep: (step: number) => void;
};

/**
 * workspace の作成フォームの状態を扱う custom hooks
 * ステート管理にはzustandを採用。
 * create関数でstateを定義する。
 * 第一引数はset関数で、いわゆる setState関数のようなもの。
 * ステートそのものと、ステートを更新する関数を1まとめで扱う。
 * なので？zustandを採用する場合は自然とcustom hooksを定義するほうがスッキリする。
 */
export const useCreateWorkspaceValues = create<CreateWorkSpaceValues>(
  (set) => ({
    name: '',
    imageUrl: '',
    updateImageUrl: (url) => set({ imageUrl: url }),
    updateValues: (values) => set(values),
    currStep: 1,
    setCurrStep: (step) => set({ currStep: step }),
  }),
);
