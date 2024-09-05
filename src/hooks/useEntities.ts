import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ENTITIES, GET_WORKSPACES, SAVE_ENTITY, DELETE_ENTITY } from '../apolloConfig';
import { RootState, AppDispatch } from '../store';
import { setEntities, addEntity, updateEntity, deleteEntity, setLoading as setEntitiesLoading, setError as setEntitiesError } from '../store/entitiesSlice';
import { setWorkspaces, setLoading as setWorkspacesLoading, setError as setWorkspacesError } from '../store/workspacesSlice';
import { Entity, Workspace, EntityAddFunction, EntityEditFunction, EntityDeleteFunction } from '../types';

export const useEntities = (userId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const entities = useSelector((state: RootState) => state.entities.entities);
  const workspaces = useSelector((state: RootState) => state.workspaces.workspaces);
  const entitiesLoading = useSelector((state: RootState) => state.entities.loading);
  const workspacesLoading = useSelector((state: RootState) => state.workspaces.loading);
  const entitiesError = useSelector((state: RootState) => state.entities.error);
  const workspacesError = useSelector((state: RootState) => state.workspaces.error);

  const { refetch: refetchEntities } = useQuery(GET_ENTITIES, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      dispatch(setEntities(data.entities));
      dispatch(setEntitiesLoading(false));
    },
    onError: (error) => {
      dispatch(setEntitiesError(error.message));
      dispatch(setEntitiesLoading(false));
    },
  });

  const { refetch: refetchWorkspaces } = useQuery(GET_WORKSPACES, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      dispatch(setWorkspaces(data.workspaces));
      dispatch(setWorkspacesLoading(false));
    },
    onError: (error) => {
      dispatch(setWorkspacesError(error.message));
      dispatch(setWorkspacesLoading(false));
    },
  });

  const [saveEntityMutation] = useMutation(SAVE_ENTITY);
  const [deleteEntityMutation] = useMutation(DELETE_ENTITY);

  const handleAddEntity: EntityAddFunction = async (newEntity) => {
    try {
      const { data } = await saveEntityMutation({
        variables: {
          uid: "",
          userId,
          ...newEntity,
          deadline: newEntity.deadline || '',
        },
      });
      dispatch(addEntity(data.saveEntity));
    } catch (err) {
      console.error(`Error adding ${newEntity.type}:`, err);
      dispatch(setEntitiesError(`Failed to add ${newEntity.type}. Please try again.`));
    }
  };

  const handleEditEntity: EntityEditFunction = async (entityId, newTitle, newDescription, newDeadline, newStatus, type, workspaceUid) => {
    try {
      const { data } = await saveEntityMutation({
        variables: {
          uid: entityId,
          userId,
          title: newTitle,
          description: newDescription,
          deadline: newDeadline || '',
          status: newStatus,
          type,
          workspaceUid,
        },
      });
      dispatch(updateEntity(data.saveEntity));
    } catch (err) {
      console.error(`Error editing ${type}:`, err);
      dispatch(setEntitiesError(`Failed to edit ${type}. Please try again.`));
    }
  };

  const handleDeleteEntity: EntityDeleteFunction = async (entityId) => {
    try {
      await deleteEntityMutation({
        variables: { userId, uid: entityId },
      });
      dispatch(deleteEntity(entityId));
    } catch (err) {
      console.error("Error deleting entity:", err);
      dispatch(setEntitiesError("Failed to delete. Please try again."));
    }
  };

  return {
    entities,
    workspaces,
    loading: entitiesLoading || workspacesLoading,
    error: entitiesError || workspacesError,
    refetchEntities,
    refetchWorkspaces,
    handleAddEntity,
    handleEditEntity,
    handleDeleteEntity,
  };
};