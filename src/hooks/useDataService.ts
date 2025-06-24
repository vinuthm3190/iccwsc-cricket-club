// React hook for using the data service with automatic state management
import { useState, useEffect, useCallback } from 'react';
import { dataService, DataStore } from '../services/dataService';

export function useDataService<T extends { id: string }>(entityType: keyof DataStore) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    try {
      const entities = dataService.getAll<T>(entityType);
      setData(entities);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  // Add entity
  const add = useCallback((entity: T) => {
    try {
      const newEntity = dataService.add(entityType, entity);
      setData(prev => [...prev, newEntity]);
      setError(null);
      return newEntity;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add entity';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [entityType]);

  // Update entity
  const update = useCallback((id: string, updates: Partial<T>) => {
    try {
      const updatedEntity = dataService.update(entityType, id, updates);
      if (updatedEntity) {
        setData(prev => prev.map(item => item.id === id ? updatedEntity : item));
        setError(null);
        return updatedEntity;
      }
      throw new Error('Entity not found');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update entity';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [entityType]);

  // Delete entity
  const remove = useCallback((id: string) => {
    try {
      const success = dataService.delete(entityType, id);
      if (success) {
        setData(prev => prev.filter(item => item.id !== id));
        setError(null);
        return true;
      }
      throw new Error('Entity not found');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete entity';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [entityType]);

  // Get by ID
  const getById = useCallback((id: string) => {
    return data.find(item => item.id === id);
  }, [data]);

  // Search
  const search = useCallback((searchFn: (entity: T) => boolean) => {
    return data.filter(searchFn);
  }, [data]);

  // Filter
  const filter = useCallback((filters: Record<string, any>) => {
    return data.filter(entity => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '' || value === null || value === undefined) return true;
        return (entity as any)[key] === value;
      });
    });
  }, [data]);

  // Refresh data
  const refresh = useCallback(() => {
    setLoading(true);
    try {
      const entities = dataService.getAll<T>(entityType);
      setData(entities);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
    getById,
    search,
    filter,
    refresh
  };
}

// Hook for data management operations
export function useDataManagement() {
  const [info, setInfo] = useState(dataService.getDataInfo());

  const exportData = useCallback(() => {
    return dataService.exportData();
  }, []);

  const importData = useCallback((jsonData: string) => {
    const success = dataService.importData(jsonData);
    if (success) {
      setInfo(dataService.getDataInfo());
    }
    return success;
  }, []);

  const resetData = useCallback(() => {
    dataService.resetData();
    setInfo(dataService.getDataInfo());
  }, []);

  const createBackup = useCallback(() => {
    return dataService.createBackup();
  }, []);

  const restoreFromBackup = useCallback((backupData: string) => {
    const success = dataService.restoreFromBackup(backupData);
    if (success) {
      setInfo(dataService.getDataInfo());
    }
    return success;
  }, []);

  const validateData = useCallback(() => {
    return dataService.validateData();
  }, []);

  const refreshInfo = useCallback(() => {
    setInfo(dataService.getDataInfo());
  }, []);

  return {
    info,
    exportData,
    importData,
    resetData,
    createBackup,
    restoreFromBackup,
    validateData,
    refreshInfo
  };
}