export interface IPanelProps {
  id: string;
}

export const recTypeOptions = [
  { label: 'Note', value: 'note' },
  { label: 'News', value: 'news' },
  { label: 'Poll', value: 'poll' },
  { label: 'Task', value: 'task' },
];

export const MODAL_PAGE_OPEN_DB = 'page_open_db';
export const MODAL_PAGE_EDIT_REC = 'page_rec_edit';
