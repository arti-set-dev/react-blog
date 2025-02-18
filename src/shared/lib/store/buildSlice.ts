import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(
        slice.actions as Record<string, (...args: any[]) => any>,
        dispatch,
    ), [dispatch]);
  };

  return {
    ...slice,
    useActions,
  };
}
