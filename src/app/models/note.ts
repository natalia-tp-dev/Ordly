export interface Note {
  id: string;
  title: string;
  content: string;
  listId?: string;
  date: Date;
  attachment?: File;
}

export interface NoteFormValue {
  title: string;
  category: string;
  content: string;
  attachment: File | null;
}
