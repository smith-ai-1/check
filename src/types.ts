export interface Entity {
  uid: string;
  userId: string;
  title: string;
  description: string;
  deadline: string | null;
  status: 'opened' | 'done';
  type: 'task' | 'meet';
  doneAt: string | null;
  workspaceUid: string | null;
}

export type EntityAddFunction = (newEntity: Omit<Entity, 'uid' | 'userId' | 'doneAt'>) => Promise<void>;
export type EntityEditFunction = (
  entityId: string,
  newTitle: string,
  newDescription: string,
  newDeadline: string | null,
  newStatus: 'opened' | 'done',
  type: 'task' | 'meet',
  workspaceUid: string | null
) => Promise<void>;

export interface Workspace {
  uid: string;
  name: string;
  color: string;
  icon: string;
}

export type EntityDeleteFunction = (uid: string) => void;