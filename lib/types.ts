export const ISSUE_STATUS = {
  todo: { label: 'Todo', value: 'todo', className: 'bg-neutral-500' },
  in_progress: {
    label: 'In Progress',
    value: 'in_progress',
    className: 'bg-purple-500',
  },
  done: { label: 'Done', value: 'done', className: 'bg-green-500' },
};

export const ISSUE_PRIORITY = {
  low: { label: 'Low', value: 'low', className: 'bg-slate-500' },
  medium: { label: 'Medium', value: 'medium', className: 'bg-amber-500' },
  high: { label: 'High', value: 'high', className: 'bg-red-500' },
};

export type Status = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';
